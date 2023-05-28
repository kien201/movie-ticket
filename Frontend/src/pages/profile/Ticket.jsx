import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import webAPI from '../../api/webAPI'
import dateUtil from '../../utils/dateUtil'
import currencyUtil from '../../utils/currencyUtil'
import { ticketStatus } from '../../constants/ticketStatus'
import Dropdown from '../../components/Dropdown'
import Modal from '../../components/Modal'
import { Link } from 'react-router-dom'

function Ticket() {
    const [showModalInfo, setShowModalInfo] = useState(false)
    const [tickets, setTickets] = useState([])
    const [selectedTicket, setSelectedTicket] = useState({})

    useEffect(() => {
        ;(async () => {
            const res = await webAPI.profile.getCurrentUserTicket()
            setTickets(res.data)
        })()
    }, [])

    const renderTicketStatus = (status) => {
        switch (status) {
            case ticketStatus.PAYMENT_SUCCESS.value:
                return <span className="text-xs rounded text-white p-1 bg-green-primary">Thành công</span>
            case ticketStatus.PAYMENT_FAILED.value:
                return <span className="text-xs rounded text-white p-1 bg-red-secondary">Lỗi thanh toán</span>
            default:
                return <span className="text-xs rounded p-1 bg-gray-primary">Chưa thanh toán</span>
        }
    }

    return (
        <>
            <table className="table-custom">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ngày đặt</th>
                        <th>Rạp</th>
                        <th>Phim</th>
                        <th>Thành tiền</th>
                        <th>Trạng thái</th>
                        <th className="w-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{dateUtil.format(ticket.createdDate, dateUtil.DATETIME_FORMAT)}</td>
                            <td>{ticket.showtime.room.cinema.name}</td>
                            <td>{ticket.showtime.movie.name}</td>
                            <td>{currencyUtil.format(ticket.totalPrice)}</td>
                            <td>{renderTicketStatus(ticket.status)}</td>
                            <td>
                                <Dropdown
                                    className="p-2 rounded-full hover:bg-gray-primary"
                                    Menu={({ isShow }) => (
                                        <div
                                            className="absolute bottom-full right-0 bg-white rounded shadow py-2"
                                            hidden={!isShow}
                                        >
                                            <button
                                                className="block w-full text-left whitespace-nowrap px-3 py-1 hover:bg-gray-primary"
                                                onClick={() => {
                                                    setSelectedTicket(ticket)
                                                    setShowModalInfo(true)
                                                }}
                                            >
                                                Xem
                                            </button>
                                            <Link
                                                to="/print-ticket"
                                                state={ticket}
                                                className="block w-full text-left whitespace-nowrap px-3 py-1 hover:bg-gray-primary"
                                            >
                                                In vé
                                            </Link>
                                        </div>
                                    )}
                                >
                                    <BsThreeDotsVertical />
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModalInfo && (
                <Modal onHideClick={(e) => setShowModalInfo(false)}>
                    <header className="flex items-center justify-between mb-3">
                        <h1 className="font-bold text-xl">Thông tin vé #{selectedTicket.id}</h1>
                    </header>
                    <main>
                        <p className="mb-3">Tên khách hàng: {selectedTicket.user.fullname}</p>
                        <p className="mb-3">Số điện thoại: {selectedTicket.user.phoneNumber}</p>
                        <p className="mb-3">Email: {selectedTicket.user.email}</p>
                        <hr />
                        <p className="mb-3">
                            Ngày đặt vé: {dateUtil.format(selectedTicket.createdDate, dateUtil.DATETIME_FORMAT)}
                        </p>
                        <p className="mb-3">Phim: {selectedTicket.showtime.movie.name}</p>
                        <p className="mb-3">Rạp: {selectedTicket.showtime.room.cinema.name}</p>
                        <p className="mb-3">Phòng: {selectedTicket.showtime.room.name}</p>
                        <p className="mb-3">
                            Thời gian chiếu:{' '}
                            {dateUtil.format(selectedTicket.showtime.startTime, dateUtil.DATETIME_FORMAT)} -{' '}
                            {dateUtil.format(
                                dateUtil.add(
                                    selectedTicket.showtime.startTime,
                                    selectedTicket.showtime.movie.duration,
                                    dateUtil.addType.MINUTES
                                ),
                                dateUtil.DATETIME_FORMAT
                            )}
                        </p>
                        <h1 className="mb-3 text-center font-semibold bg-gray-primary rounded shadow">Chi tiết</h1>
                        <table className="mb-3 w-full text-left">
                            <thead>
                                <tr>
                                    <th>Loại</th>
                                    <th>Tên</th>
                                    <th>Số lượng</th>
                                    <th>Tổng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedTicket.details.map((detail) => (
                                    <tr key={detail.id}>
                                        <td>{detail.seat ? 'Ghế' : 'Khác'}</td>
                                        <td>{detail.seat?.name || detail.food.name}</td>
                                        <td>{detail.quantity}</td>
                                        <td>{currencyUtil.format(detail.price * detail.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="mb-3 text-left font-semibold">
                            Thành tiền: {currencyUtil.format(selectedTicket.totalPrice)}
                        </p>
                    </main>
                </Modal>
            )}
        </>
    )
}

export default Ticket
