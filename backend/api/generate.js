import { sql } from "@vercel/postgres";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

async function handler(req, res) {
	// Allow CORS for all origins
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

	const style = req.query?.style;
	const validStyles = ["casual", "rare", "formal"];
	if (!validStyles.includes(style)) {
		res.status(400).json({
			error: "Invalid or missing style parameter. Use 'casual', 'rare', or 'formal'.",
		});
		return;
	}
	const tableName = style;

	// 1. Get the last generated word from the correct table
	let lastRows;
	try {
		lastRows = (
			await sql.query(
				`SELECT word, meaning, example, created_at FROM ${tableName} ORDER BY created_at DESC LIMIT 1;`
			)
		).rows;
	} catch (dbErr) {
		console.error(
			`Database error (select last word from ${tableName}):`,
			dbErr
		);
		res.status(500).json({
			error: `Database error: ${dbErr.message || dbErr}`,
		});
		return;
	}
	const lastWord = lastRows[0];

	// 2. Check if last word is less than 24 hours old
	if (lastWord) {
		const lastCreatedAt = new Date(lastWord.created_at);
		const now = new Date();
		const diffMs = now - lastCreatedAt;
		const diffHours = diffMs / (1000 * 60 * 60);

		if (diffHours < 24) {
			// Return the last generated word
			res.status(200).json({
				word: lastWord.word,
				meaning: lastWord.meaning,
				example: lastWord.example,
			});
			return;
		}
	}

	// 3. Get the list of last 50 words from the correct table
	let wordRows;
	try {
		wordRows = (
			await sql.query(
				`SELECT word FROM ${tableName} ORDER BY created_at DESC LIMIT 50;`
			)
		).rows;
	} catch (dbErr) {
		console.error(
			`Database error (select words from ${tableName}):`,
			dbErr
		);
		res.status(500).json({
			error: `Database error: ${dbErr.message || dbErr}`,
		});
		return;
	}
	const words = wordRows.map((row) => row.word);

	// 4. Prepare the prompt
	let styleInstruction = `\nMake sure the word, meaning, and example are in a ${style} style.
        ENSURE THAT THEY ALWAYS MATCH THIS STYLE.
        Formal words mean words used in professional environments like at work, during an interview, and so on.
        Rare means obscure and uncommon words that people rarely use in their life, such as “defenestrate” or “petrichor”.
        Casual means everyday words in normal conversations, the kind someone who is new to English would like to learn.
        According to the style given and what you should give for each style, give me what I require.`;
	const prompt = `
Here is a list of the last 50 words: ${words.join(", ")}
Generate a "word of the day" that is not in the above list.
The word should NEVER be in the above list of words.
ALWAYS ENSURE THAT IT'S A NEW WORD.

Return ONLY valid JSON in this exact format:
{
    "word": "string",
    "meaning": "string",
    "example": "string"
}

Do not include markdown, backticks, comments, labels, or any text outside the JSON.
ONLY RETURN JSON IN THE ABOVE MENTIONED VALID FORMAT.
EVERY TIME.
REGARDLESS OF WHAT HAPPENS, ALWAYS RETURN IN THE ABOVE FORMAT!!!${styleInstruction}
`;

	// 5. Call Gemini
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({
		model: "gemini-flash-lite-latest",
	});

	const result = await model.generateContent(prompt);
	const responseText = result.response.text();

	let data;
	try {
		data = JSON.parse(responseText);
	} catch (err) {
		res.status(500).json({ error: "Gemini returned invalid JSON" });
		return;
	}

	// 6. Insert the new word into the correct table
	try {
		await sql.query(
			`INSERT INTO ${tableName} (word, meaning, example) VALUES ($1, $2, $3);`,
			[data.word, data.meaning, data.example]
		);
	} catch (dbErr) {
		console.error(`Database error (insert into ${tableName}):`, dbErr);
		res.status(500).json({
			error: `Database error: ${dbErr.message || dbErr}`,
		});
		return;
	}

	res.status(200).json(data);
}

export default handler;
