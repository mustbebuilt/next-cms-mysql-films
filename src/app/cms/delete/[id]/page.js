import { fetchFilm } from "@/app/lib/filmQueries";
import { deleteFilm } from "@/app/lib/filmCrud";
export default async function Page({ params }) {
  console.info(params.id);

  const film = await fetchFilm(params.id);

  return (
    <>
      <div>
        <h1>Delete Film</h1>
        <h1>
          {film.film_title} ({film.film_certificate})
        </h1>
        <form action={deleteFilm}>
          <input type='hidden' name='film_id' defaultValue={params.id} />

          <button type='submit'>Delete Film</button>
        </form>
      </div>
    </>
  );
}
