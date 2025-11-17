import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

async function handler(req, res) {
    try {
        // 1. Get the list of words from the database
        const { rows } = await sql`
            SELECT word
            FROM words
            ORDER BY created_at DESC
            LIMIT 50;
        `;

        // Extract the words into an array
        const words = rows.map(row => row.word);

        // 2. Prepare the prompt with the list of words
        const prompt = `
Here is a list of the last 50 words: ${words.join(', ')}
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
REGARDLESS OF WHAT HAPPENS, ALWAYS RETURN IN THE ABOVE FORMAT!!!
`;

        // 3. Call Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (err) {
            res.status(500).json({ error: "Gemini returned invalid JSON" });
            return;
        }

        // 4. Insert the new word into the database
        await sql`
            INSERT INTO words (word, meaning, example)
            VALUES (${data.word}, ${data.meaning}, ${data.example});
        `;

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default handler;