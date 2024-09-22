import { randomFilm } from "@/app/lib/filmQueries";
import Link from "next/link";
import Image from "next/image";

const Sidebar = async () => {
  const film = await randomFilm();
  const maxDescriptionLength = 60;
  let truncatedDescription = film.film_description;

  if (film.film_description.length > maxDescriptionLength) {
    const lastSpaceIndex = film.film_description
      .substring(0, maxDescriptionLength)
      .lastIndexOf(" ");

    truncatedDescription =
      film.film_description.substring(0, lastSpaceIndex) + " ... ";
  }

  return (
    <div className='sideBar'>
      <h3>{film.film_title}</h3>
      <div>
        {/* <img src={`/images/${film.film_image}`} alt={film.film_title} /> */}
        <Image
          src={`/images/${film.film_image}`}
          alt={film.film_title}
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: "50%", height: "auto" }}
        />
      </div>
      <p>
        {truncatedDescription}{" "}
        <Link href={`/catalogue/${film.film_id}`}>read more</Link>
      </p>
    </div>
  );
};
export default Sidebar;
