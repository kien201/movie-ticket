import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { toast } from 'react-toastify'

import Modal from '../../components/Modal'
import Dropdown from '../../components/Dropdown'
import adminAPI from '../../api/adminAPI'
import arrayUtil from '../../utils/arrayUtil'
import Pagination from '../../components/Pagination'
import { validateField, validateObject } from '../../utils/validateUtil'

const dataRequestInit = {
    id: '',
    fullname: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    roleNames: [],
    active: true,
}
const validateRules = [
    {
        name: 'fullname',
        message: 'Họ tên không được để trống.',
        test: (value) => !value,
    },
    {
        name: 'username',
        message: 'Tài khoản không được để trống.',
        test: (value) => !value,
    },
    {
        name: 'password',
        message: 'Mật khẩu không được để trống.',
        test: (value) => !value,
    },
    {
        name: 'email',
        message: 'Email không được để trống.',
        test: (value) => !value,
    },
    {
        name: 'email',
        message: 'Email không đúng định dạng.',
        test: (value) => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
    },
    {
        name: 'phoneNumber',
        message: 'Số điện thoại không được để trống.',
        test: (value) => !value,
    },
    {
        name: 'phoneNumber',
        message: 'Số điện thoại không đúng định dạng.',
        test: (value) => !/^0\d{8,15}$/.test(value),
    },
]

function User() {
    const [isLoading, setLoading] = useState(true)
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showModalResetPass, setShowModalResetPass] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    const [users, setUsers] = useState([])
    const [paging, setPaging] = useState({})
    const [roles, setRoles] = useState([])

    const [selectedId, setSelectedId] = useState([])
    const [dataRequest, setDataRequest] = useState(dataRequestInit)
    const [errors, setErrors] = useState({})

    async function loadUsers(query) {
        try {
            const res = await adminAPI.user.getAll(query)
            setUsers(res.data.result)
            setPaging(res.data.paging)
        } catch (err) {
            toast.error('Lỗi load danh sách')
            console.log(err)
        }
    }

    useEffect(() => {
        async function loadRoles() {
            try {
                const res = await adminAPI.role.getAll()
                setRoles(res.data)
            } catch (err) {
                toast.error('Lỗi load quyền')
                console.log(err)
            }
        }

        ;(async function () {
            await Promise.all([loadUsers(), loadRoles()])
            setLoading(false)
        })()
    }, [])

    const handleFormInputChange = (e) => {
        const { name, value, type, checked } = e.target
        if (name === 'roleNames')
            setDataRequest((prev) => ({ ...prev, [name]: arrayUtil.addOrRemoveValue(prev[name], value) }))
        else if (type === 'checkbox') setDataRequest((prev) => ({ ...prev, [name]: checked }))
        else {
            const errs = validateField(name, value, validateRules, errors)
            setErrors(errs)
            setDataRequest((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleFormCreateSubmit = async (e) => {
        e.preventDefault()
        const errs = validateObject(dataRequest, validateRules)
        if (Object.keys(errs).length > 0) {
            setErrors(errs)
            return
        }
        try {
            const res = await adminAPI.user.create(dataRequest)
            toast.success('Thêm mới thành công')
            // loadUsers(paging)
            setUsers((prev) => [res.data, ...prev])
            setPaging((prev) => ({ ...prev, totalItems: prev.totalItems + 1 }))
            setShowModalCreate(false)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleFormUpdateSubmit = async (e) => {
        e.preventDefault()
        const errs = validateObject(dataRequest, validateRules)
        if (Object.keys(errs).length > 0) {
            setErrors(errs)
            return
        }
        try {
            const res = await adminAPI.user.update(dataRequest.id, dataRequest)
            toast.success('Cập nhật thành công')
            setUsers((prev) => prev.map((user) => (user.id === res.data.id ? res.data : user)))
            setShowModalUpdate(false)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleResetPassword = async () => {
        try {
            await adminAPI.user.changePassword(dataRequest.id, '123456')
            toast.success('Reset mật khẩu thành công')
            setShowModalResetPass(false)
        } catch (error) {
            toast.error('Lỗi reset mật khẩu')
        }
    }

    const handleDeleteUser = async () => {
        try {
            await adminAPI.user.delete(selectedId)
            toast.success('Xoá người dùng thành công')
            // loadUsers(paging)
            setUsers((prev) => prev.filter((user) => !selectedId.includes(user.id)))
            setPaging((prev) => ({ ...prev, totalItems: prev.totalItems - selectedId.length }))
            setSelectedId([])
            setShowModalDelete(false)
        } catch (error) {
            toast.error('Lỗi xoá người dùng')
        }
    }

    return isLoading ? (
        <></>
    ) : (
        <>
            <h1 className="mb-3 text-lg font-semibold">Danh Sách</h1>
            <div className="bg-white rounded shadow p-5">
                <div className="mb-3">
                    <button
                        className="inline-flex gap-1 items-center py-1 px-3 rounded bg-green-primary text-white hover:opacity-80 disabled:opacity-50 mr-2"
                        onClick={() => {
                            setDataRequest(dataRequestInit)
                            setErrors({})
                            setShowModalCreate(true)
                        }}
                    >
                        <IoMdAdd />
                        Thêm
                    </button>
                    <button
                        className="inline-flex gap-1 items-center py-1 px-3 rounded bg-red-secondary text-white hover:opacity-80 disabled:opacity-50"
                        disabled={selectedId.length === 0}
                        onClick={() => setShowModalDelete(true)}
                    >
                        <AiFillDelete />
                        Xóa ({selectedId.length})
                    </button>
                </div>
                <div className="mb-3">
                    <select
                        className="mr-2 border rounded outline-none"
                        value={paging.size}
                        onChange={(e) => loadUsers({ ...paging, page: 1, size: e.target.value })}
                    >
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        {paging.totalItems > 20 && <option value={paging.totalItems}>Tất cả</option>}
                    </select>
                    dòng / trang
                </div>
                <table className="table-custom mb-3">
                    <thead>
                        <tr>
                            <th className="w-1">
                                <input
                                    type="checkbox"
                                    checked={selectedId.length === users.length}
                                    onChange={() => {
                                        if (selectedId.length === users.length) setSelectedId([])
                                        else if (selectedId.length < users.length)
                                            setSelectedId(users.map((user) => user.id))
                                    }}
                                />
                            </th>
                            <th>#</th>
                            <th>Họ tên</th>
                            <th>Tài khoản</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Kích hoạt</th>
                            <th className="w-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedId.includes(user.id)}
                                        onChange={() =>
                                            setSelectedId((prev) => arrayUtil.addOrRemoveValue(prev, user.id))
                                        }
                                    />
                                </td>
                                <td>{user.id}</td>
                                <td>{user.fullname}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>
                                    {user.active ? (
                                        <span className="text-xs rounded text-white p-1 bg-green-primary">
                                            Đã kích hoạt
                                        </span>
                                    ) : (
                                        <span className="text-xs rounded text-white p-1 bg-red-secondary">
                                            Chưa kích hoạt
                                        </span>
                                    )}
                                </td>
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
                                                        setDataRequest({
                                                            ...user,
                                                            roleNames: user.roles.map((role) => role.name),
                                                        })
                                                        setErrors({})
                                                        setShowModalUpdate(true)
                                                    }}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="block w-full text-left whitespace-nowrap px-3 py-1 hover:bg-gray-primary"
                                                    onClick={() => {
                                                        setDataRequest(user)
                                                        setShowModalResetPass(true)
                                                    }}
                                                >
                                                    Reset mật khẩu
                                                </button>
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
                <div className="flex justify-between">
                    <p>
                        Hiển thị <span className="text-blue-primary">{users.length}</span> / tổng số{' '}
                        <span className="text-blue-primary">{paging.totalItems}</span>
                    </p>
                    {paging.totalPages > 1 && (
                        <Pagination
                            currentPage={paging.page}
                            totalPage={paging.totalPages}
                            onPageClick={(page) => {
                                loadUsers({ ...paging, page })
                            }}
                        />
                    )}
                </div>
            </div>
            {showModalCreate && (
                <Modal onHideClick={(e) => setShowModalCreate(false)}>
                    <form onSubmit={handleFormCreateSubmit}>
                        <header className="flex items-center justify-between mb-3">
                            <h1 className="font-bold text-xl">Thêm</h1>
                        </header>
                        <main>
                            <div className="mb-3">
                                <label>
                                    Họ tên
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-1 outline-blue-primary"
                                        type="text"
                                        name="fullname"
                                        value={dataRequest.fullname}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.fullname}
                                        autoFocus
                                    />
                                </label>
                                {errors.fullname && <div className="mt-1 text-red-primary">{errors.fullname}</div>}
                            </div>
                            <div className="mb-3">
                                <label>
                                    Tài khoản
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-1 outline-blue-primary"
                                        type="text"
                                        name="username"
                                        value={dataRequest.username}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.username}
                                    />
                                </label>
                                {errors.username && <div className="mt-1 text-red-primary">{errors.username}</div>}
                            </div>
                            <div className="mb-3">
                                <label>
                                    Mật khẩu
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-1 outline-blue-primary"
                                        type="password"
                                        name="password"
                                        value={dataRequest.password}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.password}
                                    />
                                </label>
                                {errors.password && <div className="mt-1 text-red-primary">{errors.password}</div>}
                            </div>
                            <div className="mb-3">
                                <label>
                                    Email
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-1 outline-blue-primary"
                                        type="text"
                                        name="email"
                                        value={dataRequest.email}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.email}
                                    />
                                </label>
                                {errors.email && <div className="mt-1 text-red-primary">{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                                <label>
                                    Số điện thoại
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-1 outline-blue-primary"
                                        type="text"
                                        name="phoneNumber"
                                        value={dataRequest.phoneNumber}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.phoneNumber}
                                    />
                                </label>
                                {errors.phoneNumber && (
                                    <div className="mt-1 text-red-primary">{errors.phoneNumber}</div>
                                )}
                            </div>
                            <div className="mb-3 select-none">
                                <span>Quyền</span>
                                {roles.map((role) => (
                                    <div key={role.id}>
                                        <label>
                                            <input
                                                className="mr-2"
                                                type="checkbox"
                                                name="roleNames"
                                                value={role.name}
                                                checked={dataRequest.roleNames.includes(role.name)}
                                                onChange={handleFormInputChange}
                                            />
                                            {role.description}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-3 select-none">
                                <span>Kích hoạt</span>
                                <div>
                                    <label>
                                        <input
                                            className="mr-2"
                                            type="checkbox"
                                            name="active"
                                            checked={dataRequest.active}
                                            onChange={handleFormInputChange}
                                        />
                                        Đã kích hoạt
                                    </label>
                                </div>
                            </div>
                        </main>
                        <footer className="text-right">
                            <button className="py-2 px-5 rounded-md bg-blue-primary text-white hover:opacity-80">
                                Thêm mới
                            </button>
                        </footer>
                    </form>
                </Modal>
            )}
            {showModalUpdate && (
                <Modal onHideClick={(e) => setShowModalUpdate(false)}>
                    <form onSubmit={handleFormUpdateSubmit}>
                        <header className="flex items-center justify-between mb-3">
                            <h1 className="font-bold text-xl">Cập nhật thông tin</h1>
                        </header>
                        <main>
                            <div className="mb-3">
                                <label>
                                    Họ tên
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-1 outline-blue-primary"
                                        type="text"
                                        name="fullname"
                                        value={dataRequest.fullname}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.fullname}
                                        autoFocus
                                    />
                                </label>
                                {errors.fullname && <div className="mt-1 text-red-primary">{errors.fullname}</div>}
                            </div>
                            <div className="mb-3">
                                <label>
                                    Email
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-1 outline-blue-primary"
                                        type="text"
                                        name="email"
                                        value={dataRequest.email}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.email}
                                    />
                                </label>
                                {errors.email && <div className="mt-1 text-red-primary">{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                                <label>
                                    Số điện thoại
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-1 outline-blue-primary"
                                        type="text"
                                        name="phoneNumber"
                                        value={dataRequest.phoneNumber}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.phoneNumber}
                                    />
                                </label>
                                {errors.phoneNumber && (
                                    <div className="mt-1 text-red-primary">{errors.phoneNumber}</div>
                                )}
                            </div>
                            <div className="mb-3 select-none">
                                <span>Quyền</span>
                                {roles.map((role) => (
                                    <div key={role.id}>
                                        <label>
                                            <input
                                                className="mr-2"
                                                type="checkbox"
                                                name="roleNames"
                                                value={role.name}
                                                checked={dataRequest.roleNames.includes(role.name)}
                                                onChange={handleFormInputChange}
                                            />
                                            {role.description}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-3 select-none">
                                <span>Kích hoạt</span>
                                <div>
                                    <label>
                                        <input
                                            className="mr-2"
                                            type="checkbox"
                                            name="active"
                                            checked={dataRequest.active}
                                            onChange={handleFormInputChange}
                                        />
                                        Đã kích hoạt
                                    </label>
                                </div>
                            </div>
                        </main>
                        <footer className="text-right">
                            <button className="py-2 px-5 rounded-md bg-blue-primary text-white hover:opacity-80">
                                Cập nhật
                            </button>
                        </footer>
                    </form>
                </Modal>
            )}
            {showModalResetPass && (
                <Modal onHideClick={(e) => setShowModalResetPass(false)}>
                    <header className="flex items-center justify-between mb-3">
                        <h1 className="font-bold text-xl">Reset mật khẩu</h1>
                    </header>
                    <main>
                        <p className="mb-3">Reset mật khẩu thành 123456 ?</p>
                    </main>
                    <footer className="text-right">
                        <button
                            className="py-2 px-5 rounded-md bg-blue-primary text-white hover:opacity-80"
                            onClick={handleResetPassword}
                        >
                            Xác nhận
                        </button>
                    </footer>
                </Modal>
            )}
            {showModalDelete && (
                <Modal onHideClick={(e) => setShowModalDelete(false)}>
                    <header className="flex items-center justify-between mb-3">
                        <h1 className="font-bold text-xl">Xóa</h1>
                    </header>
                    <main>
                        <p className="mb-3">
                            Bạn có chắc muốn xóa{' '}
                            <span className="text-blue-primary">{selectedId.map((id) => `#${id}`).join(', ')}</span> ?
                        </p>
                    </main>
                    <footer className="text-right">
                        <button
                            className="py-2 px-5 rounded-md bg-blue-primary text-white hover:opacity-80"
                            onClick={handleDeleteUser}
                        >
                            Xác nhận
                        </button>
                    </footer>
                </Modal>
            )}
        </>
    )
}

export default User
