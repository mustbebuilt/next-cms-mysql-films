"use server";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

const fetchFilms = async () => {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    const data = await sql`SELECT * FROM films`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
};

const fetchLatestFilms = async () => {
  try {
    const data =
      await sql`SELECT * FROM films ORDER BY film_releasedate DESC LIMIT 6`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch latest data.");
  }
};

const fetchFilm = async (film_id) => {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Fetch the film data by film_id
    const data = await sql`SELECT * FROM films WHERE film_id = ${film_id}`;

    if (data.rows.length === 0) {
      throw new Error("Film not found");
    }

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch film data.");
  }
};

const searchFilms = async (searchTerm) => {
  try {
    const searchPattern = `%${searchTerm}%`;
    const data = await sql`
      SELECT * FROM films
      WHERE film_title ILIKE ${searchPattern}
         OR film_certificate ILIKE ${searchPattern}
         OR film_description ILIKE ${searchPattern}
      ORDER BY film_releasedate DESC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch search results.");
  }
};

const insertContactRequest = async (formData) => {
  try {
    // destructuring not supported for formData
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const tel = formData.get("tel");
    const marketing = formData.get("marketing");
    await sql`
      INSERT INTO contact_requests
        (first_name, last_name, email, tel, marketing)
      VALUES
        (${firstname}, ${lastname}, ${email}, ${tel}, ${marketing})
    `;

    // return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to insert contact request.");
  } finally {
    redirect("/thankyou");
  }
};

export {
  fetchFilms,
  fetchFilm,
  fetchLatestFilms,
  searchFilms,
  insertContactRequest,
};
