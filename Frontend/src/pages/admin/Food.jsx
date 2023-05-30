import { Fragment, useEffect, useRef, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineFileUpload } from 'react-icons/md'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { toast } from 'react-toastify'

import Modal from '../../components/Modal'
import Dropdown from '../../components/Dropdown'
import adminAPI from '../../api/adminAPI'
import webAPI from '../../api/webAPI'
import arrayUtil from '../../utils/arrayUtil'
import currencyUtil from '../../utils/currencyUtil'
import Pagination from '../../components/Pagination'
import { validateField, validateObject } from '../../utils/validateUtil'
import Image from '../../components/Image'
import { handleError } from '../../api/axiosConfig'
import InputDelay from '../../components/InputDelay'

const dataRequestInit = {
    id: '',
    name: '',
    thumbnailFile: null,
    description: '',
    price: 0,
    active: true,
}
const validateRules = [
    {
        name: 'name',
        message: 'Tên đồ ăn không được để trống.',
        test: (value) => !value,
    },
    {
        name: 'description',
        message: 'Mô tả không được để trống.',
        test: (value) => !value,
    },
]

function Food() {
    const [isLoading, setLoading] = useState(true)
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    const [query, setQuery] = useState({})
    const [foods, setFoods] = useState({
        data: [],
        page: {},
    })

    const [selectedId, setSelectedId] = useState([])
    const [dataRequest, setDataRequest] = useState(dataRequestInit)
    const [errors, setErrors] = useState({})

    const thumbnailUrl = useRef()

    useEffect(() => {
        async function loadFoods() {
            try {
                const res = await adminAPI.food.getAllWithPage(query)
                setFoods(res.data)
            } catch (error) {
                toast.error('Lỗi load danh sách')
                console.log(error)
            }
        }

        ;(async function () {
            await loadFoods()
            setLoading(false)
        })()
    }, [query])

    const handleFormInputChange = (e) => {
        const { name, value, type, checked, files, valueAsNumber } = e.target
        if (type === 'number') setDataRequest((prev) => ({ ...prev, [name]: valueAsNumber || 0 }))
        else if (type === 'file') {
            const file = files[0]
            thumbnailUrl.current = URL.createObjectURL(file)
            setDataRequest((prev) => ({ ...prev, [name]: file }))
        } else if (type === 'checkbox') setDataRequest((prev) => ({ ...prev, [name]: checked }))
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
            const res = await adminAPI.food.create(dataRequest)
            toast.success('Thêm mới thành công')
            setFoods((prev) => ({
                data: [res.data, ...prev.data],
                page: { ...prev.page, totalItems: prev.page.totalItems + 1 },
            }))
            setShowModalCreate(false)
        } catch (error) {
            handleError(error)
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
            const res = await adminAPI.food.update(dataRequest.id, dataRequest)
            toast.success('Cập nhật thành công')
            setFoods((prev) => ({
                ...prev,
                data: prev.data.map((food) => (food.id === res.data.id ? res.data : food)),
            }))
            setShowModalUpdate(false)
        } catch (error) {
            handleError(error)
        }
    }

    const handleDelete = async () => {
        try {
            await adminAPI.food.delete(selectedId)
            toast.success('Xoá thành công')
            setFoods((prev) => ({
                data: prev.data.filter((food) => !selectedId.includes(food.id)),
                page: { ...prev.page, totalItems: prev.page.totalItems - selectedId.length },
            }))
            setSelectedId([])
            setShowModalDelete(false)
        } catch (error) {
            toast.error('Lỗi xoá đồ ăn')
        }
    }

    const renderTableHeader = (text, property) => {
        let Icon,
            newDirection = 'ASC'
        const { property: currentProperty, direction: currentDirection } = foods.page
        if (property === currentProperty) {
            if (currentDirection === 'ASC') {
                Icon = TiArrowSortedUp
                newDirection = 'DESC'
            } else {
                Icon = TiArrowSortedDown
            }
        } else {
            Icon = Fragment
        }

        return (
            <th>
                <button
                    onClick={(e) =>
                        setQuery((prev) => ({ ...prev, page: 1, property: property, direction: newDirection }))
                    }
                >
                    <div className="flex items-center hover:opacity-80">
                        {text}
                        <div className="w-4">
                            <Icon />
                        </div>
                    </div>
                </button>
            </th>
        )
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
                            thumbnailUrl.current = undefined
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
                    <div className="flex items-center justify-between">
                        <div>
                            <select
                                className="mr-2 border rounded outline-none"
                                value={foods.page.size}
                                onChange={(e) => setQuery((prev) => ({ ...prev, page: 1, size: e.target.value }))}
                            >
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                {foods.page.totalItems > 20 && <option value={foods.page.totalItems}>Tất cả</option>}
                            </select>
                            <span>dòng / trang</span>
                        </div>
                        <InputDelay
                            className="flex px-3 py-1 items-center border rounded-full focus-within:border-blue-primary"
                            onAfterDelay={(value) => setQuery((prev) => ({ ...prev, page: 1, q: value }))}
                        />
                    </div>
                </div>
                <table className="table-custom">
                    <thead>
                        <tr>
                            <th className="w-1">
                                <input
                                    type="checkbox"
                                    checked={selectedId.length === foods.length}
                                    onChange={() => {
                                        if (selectedId.length === foods.length) setSelectedId([])
                                        else if (selectedId.length < foods.length)
                                            setSelectedId(foods.map((item) => item.id))
                                    }}
                                />
                            </th>
                            {renderTableHeader('#', 'id')}
                            {renderTableHeader('Tên', 'name')}
                            {renderTableHeader('Mô tả', 'description')}
                            {renderTableHeader('Giá', 'price')}
                            {renderTableHeader('Kích hoạt', 'active')}
                            <th className="w-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.data.map((food) => (
                            <tr key={food.id}>
                                <td>
                                    <input
                                        className="p-2"
                                        type="checkbox"
                                        checked={selectedId.includes(food.id)}
                                        onChange={() =>
                                            setSelectedId((prev) => arrayUtil.addOrRemoveValue(prev, food.id))
                                        }
                                    />
                                </td>
                                <td>{food.id}</td>
                                <td>{food.name}</td>
                                <td>{food.description}</td>
                                <td>{currencyUtil.format(food.price)}</td>
                                <td>
                                    {food.active ? (
                                        <span className="text-xs rounded text-white p-1 bg-green-primary whitespace-nowrap">
                                            Đã kích hoạt
                                        </span>
                                    ) : (
                                        <span className="text-xs rounded text-white p-1 bg-red-secondary whitespace-nowrap">
                                            Chưa kích hoạt
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <Dropdown
                                        className="p-2 rounded-full hover:bg-gray-secondary"
                                        Menu={({ isShow }) => (
                                            <div
                                                className="absolute bottom-full right-0 bg-white rounded shadow py-2"
                                                hidden={!isShow}
                                            >
                                                <button
                                                    className="block w-full text-left whitespace-nowrap px-3 py-1 hover:bg-gray-secondary"
                                                    onClick={() => {
                                                        setDataRequest(food)
                                                        setErrors({})
                                                        thumbnailUrl.current = webAPI.getUpload(food.thumbnail)
                                                        setShowModalUpdate(true)
                                                    }}
                                                >
                                                    Sửa
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
                <div className="flex justify-between mt-2">
                    <p>
                        Hiển thị <span className="text-blue-primary">{foods.data.length}</span> / tổng số{' '}
                        <span className="text-blue-primary">{foods.page.totalItems}</span>
                    </p>
                    {foods.page.totalPages > 1 && (
                        <Pagination
                            className="flex gap-1"
                            buttonClassName="py-1 px-3 rounded enabled:hover:bg-gray-secondary aria-[current]:bg-blue-primary aria-[current]:text-white"
                            currentPage={foods.page.page}
                            totalPage={foods.page.totalPages}
                            onPageClick={(page) => setQuery((prev) => ({ ...prev, page }))}
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
                                <label className="block relative mx-auto w-40 rounded border overflow-hidden group cursor-pointer">
                                    <Image
                                        src={thumbnailUrl.current}
                                        onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                                    />
                                    <div className="absolute top-3/4 bottom-0 inset-0 flex items-center justify-center text-4xl text-blue-primary bg-blue-secondary opacity-60 group-hover:opacity-80">
                                        <MdOutlineFileUpload />
                                    </div>
                                    <input
                                        className="hidden"
                                        type="file"
                                        name="thumbnailFile"
                                        id="thumbnailFile"
                                        onChange={handleFormInputChange}
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                <label>
                                    Tên
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-blue-primary"
                                        type="text"
                                        name="name"
                                        value={dataRequest.name}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.name}
                                        autoFocus
                                    />
                                </label>
                                {errors.name && <div className="mt-1 text-red-primary">{errors.name}</div>}
                            </div>
                            <div className="mb-3">
                                <label>
                                    Mô tả
                                    <textarea
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-blue-primary"
                                        rows={3}
                                        name="description"
                                        value={dataRequest.description}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.description}
                                    />
                                </label>
                                {errors.description && (
                                    <div className="mt-1 text-red-primary">{errors.description}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label>
                                    Giá
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-blue-primary"
                                        type="number"
                                        name="price"
                                        min={0}
                                        value={dataRequest.price.toString()}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.price}
                                    />
                                </label>
                                {errors.price && <div className="mt-1 text-red-primary">{errors.price}</div>}
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
                                <label className="block relative mx-auto w-40 rounded border overflow-hidden group cursor-pointer">
                                    <Image
                                        src={thumbnailUrl.current}
                                        onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                                    />
                                    <div className="absolute top-3/4 bottom-0 inset-0 flex items-center justify-center text-4xl text-blue-primary bg-blue-secondary opacity-60 group-hover:opacity-80">
                                        <MdOutlineFileUpload />
                                    </div>
                                    <input
                                        className="hidden"
                                        type="file"
                                        name="thumbnailFile"
                                        id="thumbnailFile"
                                        onChange={handleFormInputChange}
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                <label>
                                    Tên
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-blue-primary"
                                        type="text"
                                        name="name"
                                        value={dataRequest.name}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.name}
                                        autoFocus
                                    />
                                </label>
                                {errors.name && <div className="mt-1 text-red-primary">{errors.name}</div>}
                            </div>
                            <div className="mb-3">
                                <label>
                                    Mô tả
                                    <textarea
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-blue-primary"
                                        rows={3}
                                        name="description"
                                        value={dataRequest.description}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.description}
                                    />
                                </label>
                                {errors.description && (
                                    <div className="mt-1 text-red-primary">{errors.description}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label>
                                    Giá
                                    <input
                                        className="border aria-[invalid]:outline-red-primary rounded-md px-3 py-2 w-full focus:outline outline-blue-primary"
                                        type="number"
                                        name="price"
                                        min={0}
                                        value={dataRequest.price.toString()}
                                        onChange={handleFormInputChange}
                                        aria-invalid={errors.price}
                                    />
                                </label>
                                {errors.price && <div className="mt-1 text-red-primary">{errors.price}</div>}
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
                            onClick={handleDelete}
                        >
                            Xác nhận
                        </button>
                    </footer>
                </Modal>
            )}
        </>
    )
}

export default Food
