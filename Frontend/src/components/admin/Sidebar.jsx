import { AiOutlineDashboard } from 'react-icons/ai'
import { TbMinusVertical } from 'react-icons/tb'
import { FaUserEdit } from 'react-icons/fa'
import { BiCameraMovie } from 'react-icons/bi'
import { MdFastfood } from 'react-icons/md'

import SidebarDropdown from './SidebarDropdown'
import SidebarLink from './SidebarLink'

function Sidebar({ className }) {
    return (
        <div
            className={`fixed z-10 left-0 h-full transition-transform duration-700 bg-white overflow-y-auto px-3 ${className}`}
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
            <SidebarDropdown
                icon={<AiOutlineDashboard />}
                text="Dashboard"
                menu={
                    <>
                        <SidebarLink to="/" icon={<TbMinusVertical />}>
                            Dashboard
                        </SidebarLink>
                        <SidebarLink to="/" icon={<TbMinusVertical />}>
                            Dashboard
                        </SidebarLink>
                    </>
                }
            />
            <SidebarDropdown
                icon={<AiOutlineDashboard />}
                text="Dashboard2"
                menu={
                    <>
                        <SidebarLink to="/" icon={<TbMinusVertical />}>
                            Dashboard
                        </SidebarLink>
                        <SidebarLink to="/" icon={<TbMinusVertical />}>
                            Dashboard
                        </SidebarLink>
                    </>
                }
            />
        </div>
    )
}

export default Sidebar
