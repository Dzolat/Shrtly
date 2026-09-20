import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

export async function getAnalytics(short_url: string) {
    const response = await sql`SELECT clicks, timestamp, last_visited FROM links WHERE short_url = ${short_url}`;

    if (response.length === 0)
        return null;

    return response[0];
}

export async function addClickToUrl(short_url: string) {
    const response = await sql`
        UPDATE links
        SET
            clicks = clicks + 1,
            last_visited = CURRENT_TIMESTAMP
        WHERE short_url = ${short_url}
        RETURNING long_url, clicks, last_visited
    `;

    if (response.length === 0)
        return null;

    return response[0];
}

export async function postUrl(long_url: string, short_url: string) {
    await sql`
        INSERT INTO links (long_url, short_url)
        VALUES (${long_url}, ${short_url})
    `;
}

export async function getUrl(short_url: string) {
    const response = await sql`
        SELECT long_url
        FROM links
        WHERE short_url = ${short_url}
    `;

    if (response.length === 0)
        return null;

    return response[0].long_url as string;
}