import Link from "next/link";
import { fetchLatestFilms } from "@/app/lib/db";
export default async function Home() {
  const films = await fetchLatestFilms();
  return (
    <main>
      <div className='banner'>
        <h2>Banner</h2>
      </div>
      <section className='homePage'>
        {films.map((film, index) => (
          <div key={index}>
            <Link href={`/catalogue/${film.film_id}`}>
              <div>
                <img src={`/images/${film.film_image}`} alt={film.film_title} />
              </div>
              <h3>{film.film_title}</h3>
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
