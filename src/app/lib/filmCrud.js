"use server";
import pool from "./dbConnection";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Create a new film
const addFilm = async (currentState, formData) => {
  noStore(); // Prevent caching

  const filmTitle = formData.get("filmTitle");
  const filmCertificate = formData.get("filmCertificate");
  const filmDescription = formData.get("filmDescription");
  const filmImage = formData.get("filmImage");
  const filmPrice = formData.get("filmPrice");
  const filmStars = formData.get("filmStars");
  const releaseDate = formData.get("releaseDate");

  let db;
  try {
    db = await pool.getConnection();
    const query = `
      INSERT INTO films 
      (film_title, film_certificate, film_description, film_image, film_price, film_stars, film_release_date) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    await db.execute(query, [
      filmTitle,
      filmCertificate,
      filmDescription,
      filmImage,
      filmPrice,
      filmStars,
      releaseDate,
    ]);

    db.release();
  } catch (error) {
    console.error("Database Error (createFilm):", error);
    return { success: false, error: error.message }; // Return the error message for better debugging
  } finally {
    if (db) db.release(); // Ensure the connection is always released
  }
  revalidatePath("/cms");
  redirect("/cms");
};
// Edit a film
const editFilm = async (formData) => {
  const film_id = formData.get("id");
  const filmTitle = formData.get("filmTitle");
  const filmCertificate = formData.get("filmCertificate");
  const filmDescription = formData.get("filmDescription");
  const filmImage = formData.get("filmImage");
  const filmPrice = formData.get("filmPrice");
  const filmStars = formData.get("filmStars");
  const releaseDate = formData.get("releaseDate");
  let db;
  try {
    db = await pool.getConnection();
    const query = `
      UPDATE films 
      SET film_title = ?, film_certificate = ?, film_description = ?, film_image = ?, film_price = ?, film_stars = ?, film_release_date = ? 
      WHERE film_id = ?`;
    await db.execute(query, [
      filmTitle,
      filmCertificate,
      filmDescription,
      filmImage,
      filmPrice,
      filmStars,
      releaseDate,
      film_id,
    ]);
    db.release();
  } catch (error) {
    console.error("Database Error (editFilm):", error);
  } finally {
    if (db) db.release(); // Ensure the connection is always released
  }
  revalidatePath("/cms");
  redirect("/cms");
};

// Delete a film
const deleteFilm = async (formData) => {
  const film_id = formData.get("film_id");
  let db;
  try {
    db = await pool.getConnection();
    const query = "DELETE FROM films WHERE film_id = ?";
    await db.execute(query, [film_id]);
    db.release();
  } catch (error) {
    console.error("Database Error (deleteFilm):", error);
  } finally {
    if (db) db.release(); // Ensure the connection is always released
  }
  revalidatePath("/cms");
  redirect("/cms");
};

export { addFilm, editFilm, deleteFilm };
