import React, { useEffect, useRef, useState } from 'react'

function Dropdown({ menu, ...props }) {
    const [show, setShow] = useState(false)

    const dropdownRef = useRef()

    useEffect(() => {
        function hideIfClickOutside(e) {
            if (!dropdownRef.current.contains(e.target)) setShow(false)
        }
        document.addEventListener('click', hideIfClickOutside)
        return () => {
            document.removeEventListener('click', hideIfClickOutside)
        }
    }, [])

    return (
        <div ref={dropdownRef} className="relative">
            <button onClick={() => setShow((prev) => !prev)} {...props}></button>
            {show && menu}
        </div>
    )
}

export default Dropdown
