"use client";

import { addFilm } from "@/app/lib/filmCrud";
import { useFormState } from "react-dom";

const Add = () => {
  const initialState = {
    success: "",
    error: "",
  };
  const [formState, formAction] = useFormState(addFilm, initialState);

  return (
    <div>
      {formState.error && <p className='error'>{formState.error}</p>}
      <form action={formAction}>
        <div>
          <label htmlFor='filmTitle'>Title:</label>
          <input type='text' id='filmTitle' name='filmTitle' required />
        </div>
        <div>
          <label htmlFor='filmCertificate'>Certificate:</label>
          <input
            type='text'
            id='filmCertificate'
            name='filmCertificate'
            required
          />
        </div>
        <div>
          <label htmlFor='filmDescription'>Description:</label>
          <textarea id='filmDescription' name='filmDescription' required />
        </div>
        <div>
          <label htmlFor='filmImage'>Image:</label>
          <input type='text' id='filmImage' name='filmImage' required />
        </div>
        <div>
          <label htmlFor='filmPrice'>Price:</label>
          <input type='number' id='filmPrice' name='filmPrice' required />
        </div>
        <div>
          <label htmlFor='filmStars'>Stars:</label>
          <input type='number' id='filmStars' name='filmStars' required />
        </div>
        <div>
          <label htmlFor='releaseDate'>Release Date:</label>
          <input type='date' id='releaseDate' name='releaseDate' required />
        </div>
        <button>Add Film</button>
      </form>
    </div>
  );
};
export default Add;
