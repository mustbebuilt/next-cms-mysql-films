import { fetchFilm } from "@/app/lib/db";

// generate dynamic metadata
export async function generateMetadata({ params }) {
  const id = params.id;
  const film = await fetchFilm(id);
  return {
    title: film.film_title || "Film Catalogue",
  };
}

const CatalogueItem = async ({ params }) => {
  const id = params.id;
  const film = await fetchFilm(id);
  return (
    <main>
      <h2 className='banner'>{film.film_title}</h2>
      <section className='twoColumn'>
        <div className='filmDetails'>
          <div>
            <img src={`/images/${film.film_image}`} alt={film.film_title} />
          </div>
          <div>
            <p>{film.film_description}</p>
            <p>{film.film_certificate}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CatalogueItem;
