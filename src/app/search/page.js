import SearchForm from "@/app/components/SearchForm";
import Sidebar from "@/app/components/Sidebar";
const Search = () => {
  return (
    <main>
      <div className='banner'>
        <h2>Search Films</h2>
      </div>
      <section className='twoColumn'>
        <SearchForm />
        <Sidebar />
      </section>
    </main>
  );
};
export default Search;
