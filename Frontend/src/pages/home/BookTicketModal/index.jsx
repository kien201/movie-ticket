import Modal from '../../../components/Modal'
import dateUtil from '../../../utils/dateUtil'
import Image from '../../../components/Image'
import webAPI from '../../../api/webAPI'

function BookTicketModal({ showtime, setShowModal }) {
    const startTime = new Date(showtime.startTime)
    const endTime = new Date(startTime.getTime() + showtime.movie.duration * 60000)

    return (
        <Modal className="w-2/3" onHideClick={() => setShowModal(false)}>
            <main className="mb-3">
                <h1 className="text-lg font-semibold">
                    {showtime.room.cinema.name} | {showtime.room.name} |{' '}
                    {dateUtil.format(startTime, dateUtil.DATETIME_FORMAT)} -{' '}
                    {dateUtil.format(endTime, dateUtil.DATETIME_FORMAT)}
                </h1>
                <h1 className="p-1 mb-3 text-center bg-gray-primary">Ghế</h1>
                <img className="w-full mb-3" src="/images/bg-screen.png" />
                <h1 className="p-1 mb-3 text-center bg-gray-primary">Đồ ăn</h1>
            </main>
            <footer>
                <div className="bg-black-primary text-gray-secondary mb-3">
                    <div className="h-2" style={{ background: 'url(/images/bg-ticket.png) repeat-x' }}></div>
                    <div className="p-5 grid lg:grid-cols-[8rem_70fr_30fr] gap-5">
                        <div className="max-lg:px-10">
                            <Image className="rounded" src={webAPI.getUpload(showtime.movie.thumbnail)} />
                        </div>
                        <div>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td>Phim</td>
                                        <td>{showtime.movie.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Rạp</td>
                                        <td>{showtime.room.cinema.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Phòng</td>
                                        <td>{showtime.room.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Xuất chiếu</td>
                                        <td>{dateUtil.format(startTime, dateUtil.DATETIME_FORMAT)}</td>
                                    </tr>
                                    <tr>
                                        <td>Ghế</td>
                                        <td>A1,A2</td>
                                    </tr>
                                    <tr>
                                        <td>Đồ ăn</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <table className="w-full mb-3">
                                <tbody>
                                    <tr>
                                        <td>Ghế</td>
                                        <td>
                                            {(1000000).toLocaleString('vi-vn', { style: 'currency', currency: 'VND' })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Đồ ăn</td>
                                        <td>
                                            {(1000000).toLocaleString('vi-vn', { style: 'currency', currency: 'VND' })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tổng</td>
                                        <td>
                                            {(1000000).toLocaleString('vi-vn', { style: 'currency', currency: 'VND' })}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="w-full px-5 py-2 rounded-md bg-blue-primary text-white hover:bg-opacity-80">
                                Đặt vé
                            </button>
                        </div>
                    </div>
                    <div
                        className="h-2"
                        style={{ background: 'url(/images/bg-ticket.png) repeat-x', transform: 'rotateX(180deg)' }}
                    ></div>
                </div>
            </footer>
        </Modal>
    )
}

export default BookTicketModal
