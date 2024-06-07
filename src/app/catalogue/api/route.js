import { fetchFilms, searchFilms } from "@/app/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  console.dir(q);
  const films = await searchFilms(q);
  console.dir(films);
  return Response.json({ films: films });
}
