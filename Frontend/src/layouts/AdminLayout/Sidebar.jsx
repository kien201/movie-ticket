import { AiOutlineDashboard, AiOutlinePlaySquare } from 'react-icons/ai'
import { TbTheater } from 'react-icons/tb'
import { FaUserEdit } from 'react-icons/fa'
import { BiCameraMovie } from 'react-icons/bi'
import { MdFastfood } from 'react-icons/md'
import { IoTicket } from 'react-icons/io5'

import SidebarLink from './SidebarLink'

function Sidebar({ className }) {
    return (
        <div
            className={`fixed z-10 left-0 h-full transition-transform duration-700 bg-white overflow-y-auto ${className}`}
        >
            <SidebarLink to="/admin" end icon={<AiOutlineDashboard />}>
                Dashboard
            </SidebarLink>
            <SidebarLink to="/admin/user" icon={<FaUserEdit />}>
                Người dùng
            </SidebarLink>
            <SidebarLink to="/admin/movie" icon={<BiCameraMovie />}>
                Phim
            </SidebarLink>
            <SidebarLink to="/admin/food" icon={<MdFastfood />}>
                Đồ ăn
            </SidebarLink>
            <SidebarLink to="/admin/cinema" icon={<TbTheater />}>
                Rạp
            </SidebarLink>
            <SidebarLink to="/admin/showtime" icon={<AiOutlinePlaySquare />}>
                Lịch chiếu
            </SidebarLink>
            <SidebarLink to="/admin/ticket" icon={<IoTicket />}>
                Vé
            </SidebarLink>
        </div>
    )
}

export default Sidebar
