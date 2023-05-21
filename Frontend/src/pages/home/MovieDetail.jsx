import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import webAPI from '../../api/webAPI'
import Image from '../../components/Image'
import dateUtil from '../../utils/dateUtil'
import BookTicketModal from './BookTicketModal'

function MovieDetail() {
    const { slug } = useParams()

    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState({})
    const [cinemasWithShowtime, setCinemasWithShowtime] = useState([])

    const datePickers = useMemo(
        () => Array.from({ length: 30 }, (value, index) => new Date(Date.now() + 86400000 * index)),
        []
    )
    const [selectedDate, setSelectedDate] = useState(datePickers[0])
    const [showModalBookTicket, setShowModalBookTicket] = useState(false)
    const [selectedShowtime, setSelectedShowtime] = useState({})

    useEffect(() => {
        async function loadMovie() {
            const res = await webAPI.movie.getOne(slug)
            setMovie(res.data)
            setLoading(false)
        }
        loadMovie()
    }, [slug])

    useEffect(() => {
        if (movie.id) {
            async function loadCinemasWithShowtime() {
                const res = await webAPI.movie.getShowtime(
                    movie.id,
                    dateUtil.format(selectedDate, dateUtil.INPUT_DATE_FORMAT)
                )
                const showtimes = res.data

                const cinemas = showtimes.reduce((prev, showtime, index, self) => {
                    const cinema = showtime.room.cinema
                    if (prev.find((item) => item.id === cinema.id)) return prev
                    return [...prev, { ...cinema, showtimes: self.filter((item) => item.room.cinema.id === cinema.id) }]
                }, [])
                setCinemasWithShowtime(cinemas)
            }
            loadCinemasWithShowtime()
        }
    }, [movie.id, selectedDate])

    return loading ? (
        <></>
    ) : (
        <div className="container-custom flex flex-wrap py-5">
            <div className="w-full md:w-1/5">
                <Image
                    className="object-cover rounded-lg mb-3 mx-auto max-md:w-3/5"
                    src={webAPI.getUpload(movie.thumbnail)}
                />
                <h1 className="font-semibold text-lg">{movie.name}</h1>
                <p className="mb-3 text-justify">{movie.description}</p>
                <table className="w-full">
                    <tbody>
                        {movie.director && (
                            <tr>
                                <td className="text-black-secondary">Đạo diễn</td>
                                <td>{movie.director}</td>
                            </tr>
                        )}
                        {movie.actor && (
                            <tr>
                                <td className="text-black-secondary">Diễn viên</td>
                                <td>{movie.actor}</td>
                            </tr>
                        )}
                        {movie.genre && (
                            <tr>
                                <td className="text-black-secondary">Thể loại</td>
                                <td>{movie.genre}</td>
                            </tr>
                        )}
                        {movie.premiere && (
                            <tr>
                                <td className="text-black-secondary">Khởi chiếu</td>
                                <td>{dateUtil.format(new Date(movie.premiere), dateUtil.DATE_FORMAT)}</td>
                            </tr>
                        )}
                        <tr>
                            <td className="text-black-secondary">Thời lượng</td>
                            <td>{movie.duration} phút</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-full md:w-4/5 md:pl-5">
                <h1 className="text-lg font-bold">Chọn lịch chiếu</h1>
                <hr />
                <div className="flex overflow-x-auto gap-2 pb-2 mb-3">
                    {datePickers.map((date, index) => (
                        <button
                            key={index}
                            className="rounded border p-2 aria-selected:border-blue-primary"
                            onClick={(e) => setSelectedDate(date)}
                            role="tab"
                            aria-selected={selectedDate === date}
                        >
                            <h1 className="font-bold text-3xl">{date.getDate()}</h1>
                            <p className="text-sm">{dateUtil.format(date, 'MM/yyyy')}</p>
                        </button>
                    ))}
                </div>
                {cinemasWithShowtime.map((cinema) => (
                    <div key={cinema.id} className="mb-3">
                        <h1 className="text-lg font-semibold">{cinema.name}</h1>
                        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
                            {cinema.showtimes.map((showtime) => (
                                <button
                                    key={showtime.id}
                                    className="p-2 rounded bg-green-primary text-white hover:bg-opacity-80"
                                    onClick={(e) => {
                                        setSelectedShowtime(showtime)
                                        setShowModalBookTicket(true)
                                    }}
                                >
                                    {dateUtil.format(new Date(showtime.startTime), dateUtil.TIME_FORMAT)}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {showModalBookTicket && (
                <BookTicketModal showtime={selectedShowtime} setShowModal={setShowModalBookTicket} />
            )}
        </div>
    )
}

export default MovieDetail
