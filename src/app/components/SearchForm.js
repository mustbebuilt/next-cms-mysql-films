"use client";
import { useState } from "react";
import Link from "next/link";
const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    try {
      const response = await fetch(
        `/catalogue/api?q=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) throw new Error("Failed to fetch search results");

      const results = await response.json();
      console.dir(results);
      setSearchResults(results.films);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };
  return (
    <div>
      <div className='searchForm'>
        <form onSubmit={handleSearch}>
          <div>
            <label htmlFor='q'>Search:</label>
            <input
              type='text'
              name='q'
              id='q'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <input type='submit' value='Search for a Film' />
          </div>
        </form>
      </div>
      <div>
        {searchResults.length > 0 ? (
          <div>
            {searchResults.map((film) => (
              <div key={film.film_id}>
                <p>
                  <Link href={`/catalogue/${film.film_id}`}>
                    {film.film_title} ({film.film_certificate})
                  </Link>{" "}
                </p>
              </div>
            ))}
          </div>
        ) : (
          searched && <p>No films found</p>
        )}
      </div>
    </div>
  );
};
export default SearchForm;
