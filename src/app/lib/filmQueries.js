import pool from "./dbConnection";
import { unstable_noStore as noStore } from "next/cache";

// Fetch all films
const fetchFilms = async () => {
  noStore(); // Prevent caching
  let db;
  try {
    db = await pool.getConnection();
    const query = "SELECT * FROM films";
    const [rows] = await db.execute(query);
    return rows;
  } catch (error) {
    console.error("Database Error (fetchFilms):", error);
    throw new Error("Failed to fetch films.");
  } finally {
    if (db) db.release(); // Ensure connection is released
  }
};

// Fetch the latest 6 films
const fetchLatestFilms = async () => {
  let db;
  try {
    db = await pool.getConnection();
    const query = "SELECT * FROM films ORDER BY film_release_date DESC LIMIT 6";
    const [rows] = await db.execute(query);
    return rows;
  } catch (error) {
    console.error("Database Error (fetchLatestFilms):", error);
    throw new Error("Failed to fetch latest films.");
  } finally {
    if (db) db.release(); // Ensure connection is released
  }
};

// Fetch a specific film by ID
const fetchFilm = async (film_id) => {
  noStore(); // Prevent caching
  let db;
  try {
    db = await pool.getConnection();
    const query = "SELECT * FROM films WHERE film_id = ?";
    const [rows] = await db.execute(query, [film_id]);
    if (rows.length === 0) {
      throw new Error("Film not found.");
    }
    return rows[0];
  } catch (error) {
    console.error(`Database Error (fetchFilm, id: ${film_id}):`, error);
    throw new Error("Failed to fetch film.");
  } finally {
    if (db) db.release(); // Ensure connection is released
  }
};

// Search films by title, certificate, or description
const searchFilms = async (searchTerm) => {
  noStore(); // Prevent caching
  let db;
  try {
    const searchPattern = `%${searchTerm}%`;
    db = await pool.getConnection();
    const query = `
      SELECT * FROM films
      WHERE film_title LIKE ?
      ORDER BY film_release_date DESC
    `;
    const [rows] = await db.execute(query, [searchPattern]);
    if (rows.length === 0) {
      return []; // Return an empty array instead of throwing an error
    }
    return rows;
  } catch (error) {
    console.error(
      `Database Error (searchFilms, searchTerm: ${searchTerm}):`,
      error
    );
    throw new Error("Failed to search films.");
  } finally {
    if (db) db.release(); // Ensure connection is released
  }
};

// Fetch a random film
const randomFilm = async () => {
  let db;
  try {
    db = await pool.getConnection();
    const query = "SELECT * FROM films ORDER BY RAND() LIMIT 1";
    const [rows] = await db.execute(query);
    if (rows.length === 0) {
      throw new Error("No films available.");
    }
    return rows[0];
  } catch (error) {
    console.error("Database Error (randomFilm):", error);
    throw new Error("Failed to fetch a random film.");
  } finally {
    if (db) db.release(); // Ensure connection is released
  }
};

export { fetchFilms, fetchLatestFilms, fetchFilm, searchFilms, randomFilm };
