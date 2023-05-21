import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Image from '../../components/Image'
import webAPI from '../../api/webAPI'
import dateUtil from '../../utils/dateUtil'

function Movie() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        async function loadMovies() {
            const res = webAPI.movie.getAll()
            setMovies((await res).data.result)
        }
        loadMovies()
    }, [])

    return (
        <div>
            <div className="container-custom">
                <h1 className="mb-3">Tất cả phim</h1>
                <hr />
                <div className="mb-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {movies.map((movie) => (
                        <div key={movie.id} className="rounded-lg shadow-lg overflow-hidden">
                            <Link to={`/movie/${movie.slug}`}>
                                <Image src={webAPI.getUpload(movie.thumbnail)} className="w-full object-cover" />
                            </Link>
                            <div className="p-5">
                                <Link
                                    to={`/movie/${movie.slug}`}
                                    className="block mb-1 text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis hover:text-blue-primary transition-colors"
                                    title={movie.name}
                                >
                                    {movie.name}
                                </Link>
                                <p>Thể loại: {movie.genre}</p>
                                <p>
                                    {dateUtil.format(new Date(movie.premiere), dateUtil.DATE_FORMAT)} - {movie.duration}{' '}
                                    phút
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Movie
