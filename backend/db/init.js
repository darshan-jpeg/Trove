import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
	await sql`
		CREATE TABLE IF NOT EXISTS words (
			id SERIAL PRIMARY KEY,
			word TEXT NOT NULL,
			meaning TEXT NOT NULL,
			example TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT NOW()
		);
	`;

	console.log("Table created successfully");
	process.exit(0);
}

main();
