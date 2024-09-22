"use server";
import pool from "./dbConnection";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { hashPassword, verifyPassword, encrypt } from "./auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const registerUser = async (currentState, formData) => {
  let username = formData.get("username");
  let password = formData.get("password");
  console.info(username);
  console.info(password);

  noStore(); // Prevent caching
  let db;
  try {
    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);
    db = await pool.getConnection();
    // console.dir(db);
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    console.log("Executing query with:", username, hashedPassword);
    await db.execute(query, [username, hashedPassword]);
    db.release();
    return { message: true };
  } catch (error) {
    console.error("Database Error (registerUser):", error.message, error.stack);
    if (error.code === "ER_DUP_ENTRY") {
      return { message: "Email is already taken" };
    }
    return { message: "Failed to register user." };
  } finally {
    if (db) db.release();
  }
  // if not using useFormState redirect server side.
  //redirect("/login");
};

// Authenticate user during login
const loginUser = async (currentState, formData) => {
  noStore(); // Prevent caching
  let username = formData.get("username");
  let password = formData.get("password");
  let db;
  console.error(username, password);
  try {
    db = await pool.getConnection();
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows] = await db.execute(query, [username]);
    // console.dir(rows);
    if (rows.length === 0) {
      throw new Error("User not found.");
    }

    const user = rows[0];

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }
    const session = await encrypt({ user });
    // remove on log out
    cookies().set("session", session, { httpOnly: true, secure: true });
    // cookies().set("session", session, { expires, httpOnly: true });
    // no return value on success handled by redirect after the try/catch
    //return { success: true };
  } catch (error) {
    console.info("Database Error (loginUser):", error);
    //throw new Error("Failed to login user.");
    return { error: "Failed to login user" };
  } finally {
    if (db) db.release();
  }
  revalidatePath("/cms"); // Update cached posts
  redirect(`/cms`); // Navigate to the new post page
};

export { registerUser, loginUser };
