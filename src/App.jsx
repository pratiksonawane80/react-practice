import { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from "./search.svg"
import MovieCard from './MovieCard';

// 8769ba79

const API_URL = "https://www.omdbapi.com?apiKey=8769ba79";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async(title) => {
    const resp = await fetch(`${API_URL}&s=${title}`);
    const data = await resp.json();
    setMovies(data.Search);
  }
  

  useEffect(() => {
    return () => searchMovies(searchTerm);
  }, []);
  
  return (
    <>
      <div className="app">
        <h1>Movie Land</h1>
        <div className='search'>
          <input 
            placeholder='Search for movies'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img 
            src={SearchIcon} 
            onClick={() => searchMovies(searchTerm)}
            alt="search" />
        </div>
        {
          movies?.length > 0 ? (
            <div className='container'>
              {
                movies.map((movie) => (
                  <MovieCard movie={movie}/>
                ))
              }
            </div>
          ) : 
          (
            <div className='empty'>
              <h1>No movies found!!!</h1>
            </div>
          )
        }
        
      </div>
    </>
  )
}

export default App
