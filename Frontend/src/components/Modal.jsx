import React from 'react'

function Modal({ className, ...props }) {
    return <div className={`fixed z-50 inset-0 bg-black bg-opacity-30 ${className}`} {...props}></div>
}

export default Modal
