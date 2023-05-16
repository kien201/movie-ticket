import { TiThMenu } from 'react-icons/ti'
import { FaUserAlt } from 'react-icons/fa'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../Logo'
import { useAuth } from '../../contexts/AuthContext'
import Dropdown from '../Dropdown'

function Header({ className, handleShowSidebar }) {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = async () => {
        await logout()
        navigate('/login', { replace: true })
    }

    return (
        <header className={`sticky z-10 top-0 inset-x-0 bg-white flex ${className}`}>
            <div className="w-64 flex items-center justify-center">
                <Logo />
            </div>
            <div className="flex-1 flex justify-between items-center px-3">
                <button className="text-lg p-2 rounded-full hover:bg-gray-primary" onClick={handleShowSidebar}>
                    <TiThMenu />
                </button>

                <Dropdown
                    className="flex items-center p-2 text-lg"
                    menu={
                        <div className="absolute top-full right-[10px] min-w-[10rem] bg-white rounded border shadow py-2">
                            <Link className="block w-full text-left whitespace-nowrap px-3 py-1 hover:bg-gray-primary">
                                Thông tin cá nhân
                            </Link>
                            <button
                                className="block w-full text-left whitespace-nowrap px-3 py-1 hover:bg-gray-primary"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    }
                >
                    <FaUserAlt />
                    <RiArrowDropDownLine />
                </Dropdown>
            </div>
        </header>
    )
}

export default Header
