import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [films, setFilms] = useState([]);
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=6e30c4b4&s=${search}&type=${type}&y=${year}`);
      const data = await res.json();
      setFilms(data.Search);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    handleFilter();
  }, []); // Empty dependency array to mimic componentDidMount behavior

  return (
    <div className="container flex mx-auto px-20">
      <div className="w-3/12 py-20 bg-slate-100">
        <div className="p-6">
          <form onSubmit={handleFilter} className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="search" className="text-black">
                Search
              </label>{' '}
              <br />
              <input
                type="text"
                id="search"
                onChange={(e) => setSearch(e.target.value)}
                className="border-2 border-gray-400 p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="text-black">
                Type
              </label>{' '}
              <br />
              <select
                id="type"
                onChange={(e) => setType(e.target.value)}
                className="border-2 border-gray-400 p-2 rounded-md"
              >
                <option value="movies">Movies</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="year" className="text-black">
                Year
              </label>
              <br />
              <input
                type="text"
                id="year"
                onChange={(e) => setYear(e.target.value)}
                className="border-2 border-gray-400 p-2 rounded-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-9/12">
        <h1 className="py-4 text-black text-center text-3xl">All Movies</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {films.map((item, index) => (
            <Link  key={index} className="bg-white p-4 shadow-lg rounded-md">
              <div className="flex items-center justify-center">
                <img src={item.Poster} alt={item.Title} className="w-32 h-48 object-cover rounded-md" />
              </div>
              <div className="mt-4">
                <h1 className="text-xl font-bold">{item.Title}</h1>
                <p className="text-gray-600">{item.Type}</p>
              </div>
              <div className="pt-6">
                <Link to={`details/${item.imdbID}`}className="px-10 rounded-lg py-2 bg-sky-700 text-white">
                  Show Details
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
