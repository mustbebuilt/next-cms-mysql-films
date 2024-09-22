import { fetchFilm } from "@/app/lib/filmQueries";
import { editFilm } from "@/app/lib/filmCrud";

export default async function Page({ params }) {
  const film = await fetchFilm(params.id);
  const releaseDate = new Date(film.film_release_date);
  const formattedDate = releaseDate.toISOString().split("T")[0]; // Get YYYY-MM-DD

  return (
    <>
      <h1>Edit Film</h1>
      <h1>
        {film.film_title} ({film.film_certificate})
      </h1>
      <form action={editFilm}>
        <input type='hidden' name='id' defaultValue={params.id} />
        <div>
          <label htmlFor='filmTitle'>Title:</label>
          <input
            type='text'
            id='filmTitle'
            name='filmTitle'
            defaultValue={film.film_title}
            required
          />
        </div>

        <div>
          <label htmlFor='filmCertificate'>Certificate:</label>
          <input
            type='text'
            id='filmCertificate'
            name='filmCertificate'
            defaultValue={film.film_certificate}
            required
          />
        </div>
        <div>
          <label htmlFor='filmDescription'>Description:</label>
          <textarea
            id='filmDescription'
            name='filmDescription'
            defaultValue={film.film_description}
            required
          />
        </div>
        <div>
          <label htmlFor='filmImage'>Image:</label>
          <input
            type='text'
            id='filmImage'
            name='filmImage'
            defaultValue={film.film_image}
            required
          />
        </div>
        <div>
          <label htmlFor='filmPrice'>Price:</label>
          <input
            type='number'
            id='filmPrice'
            name='filmPrice'
            defaultValue={film.film_price}
            required
          />
        </div>
        <div>
          <label htmlFor='filmStars'>Stars:</label>
          <input
            type='number'
            id='filmStars'
            name='filmStars'
            defaultValue={film.film_stars}
            required
          />
        </div>
        <div>
          <label htmlFor='releaseDate'>Release Date:</label>
          <input
            type='date'
            id='releaseDate'
            name='releaseDate'
            defaultValue={formattedDate}
          />
        </div>
        <button>Update Film</button>
      </form>
    </>
  );
}
