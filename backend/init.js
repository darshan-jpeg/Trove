// Create tables initially

import { sql } from "@vercel/postgres";
import dotenv from "dotenv";

dotenv.config();

async function main() {
	// Create casual table
	await sql`
		CREATE TABLE IF NOT EXISTS casual (
			id SERIAL PRIMARY KEY,
			word TEXT NOT NULL,
			meaning TEXT NOT NULL,
			example TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT NOW()
		);
	`;
	// Create rare table
	await sql`
		CREATE TABLE IF NOT EXISTS rare (
			id SERIAL PRIMARY KEY,
			word TEXT NOT NULL,
			meaning TEXT NOT NULL,
			example TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT NOW()
		);
	`;
	// Create formal table
	await sql`
		CREATE TABLE IF NOT EXISTS formal (
			id SERIAL PRIMARY KEY,
			word TEXT NOT NULL,
			meaning TEXT NOT NULL,
			example TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT NOW()
		);
	`;

	console.log("Tables created successfully");
	process.exit(0);
}

main();
