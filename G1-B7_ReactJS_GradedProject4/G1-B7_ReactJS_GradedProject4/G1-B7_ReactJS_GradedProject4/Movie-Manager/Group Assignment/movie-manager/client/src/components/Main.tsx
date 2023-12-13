import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import IMovieList from "../model/IMovieList"
import { fetchMoviesList } from "../services/FetchData"
import MovieCard from "./MovieCard"


type Props = {
  searchValue: string
}

export default function Main({ searchValue }: Props) {
  const [moviesData, setMoviesData] = useState<IMovieList[]>([])
  const [filteredMovies, setFilteredMovies] = useState<IMovieList[]>([])
  const location = useLocation()

  let tabName: string | undefined = location.state?.tab || "movies-in-theaters"

  const fetchMovies = async () => {
    try {
      const movies = await fetchMoviesList(tabName)
      setMoviesData(movies)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [tabName])

  useEffect(() => {
    const filteredData = searchValue
      ? moviesData.filter((movie) =>
          movie.title.toLowerCase().includes(searchValue)
        )
      : moviesData
    setFilteredMovies(filteredData)
  }, [moviesData, searchValue])

  return (
    <>
    <h2 className="movie-details-details">Movies</h2>
     {filteredMovies.length === 0 ? (
        <h2 style={{color: "black", fontWeight: 700, textAlign:"center", marginTop: "20%"}}>Movie not available</h2>
      ) : (
        filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            tabName={tabName}
            fetchMovies={fetchMovies}
          />
        ))
      )}
    </>
  )
}
