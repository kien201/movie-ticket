import { NavLink } from 'react-router-dom'

function SidebarLink({ icon, children, ...props }) {
    return (
        <NavLink
            className={({ isActive }) =>
                `flex items-center rounded-md p-3 my-2 transition-colors ${
                    isActive ? 'bg-blue-primary text-white' : 'hover:bg-blue-secondary hover:text-blue-primary'
                }`
            }
            {...props}
        >
            <div className="mr-2 text-2xl">{icon}</div>
            {children}
        </NavLink>
    )
}

export default SidebarLink
