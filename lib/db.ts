import { neon } from "@neondatabase/serverless"

export const sql = neon(process.env.DATABASE_URL!)

export async function postUrl(long_url: string, short_url: string)
{
    await sql`INSERT INTO links (long_url, short_url) VALUES (${long_url}, ${short_url})`;
}

export async function getUrl(short_url: string)
{
    const response = await sql`SELECT long_url FROM links WHERE short_url = ${short_url}`
    const url = response
    console.log(response)
}