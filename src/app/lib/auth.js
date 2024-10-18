"use server";
import { SignJWT, jwtVerify } from "jose";
const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
};

const verifyJwtToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token.value, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
};
const encrypt = async (payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour from now")
    //.setExpirationTime("10 sec from now")
    .sign(key);
};

const decrypt = async (input) => {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
};

const logout = async () => {
  // Destroy the session
  console.info("cookie kill");
  cookies().set("session", "", { expires: new Date(0) });
  const headers = new Headers();
  headers.delete("x-session-valid"); // Remove the custom header when logging out
  redirect("/");
};

const updateSession = async (request) => {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  // ten seconds from now
  // parsed.expires = new Date(Date.now() + 10 * 10000);
  // one hour from now
  parsed.expires = new Date(Date.now() + 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
};

export {
  hashPassword,
  verifyPassword,
  verifyJwtToken,
  encrypt,
  decrypt,
  logout,
  updateSession,
};
