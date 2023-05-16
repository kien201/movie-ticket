import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

function Pagination({ currentPage, totalPage, onPageClick }) {
    const pages = Array.from({ length: 5 }, (value, index) => currentPage - 2 + index)
    return (
        <div className="flex gap-1">
            <button className="py-1 px-3 rounded hover:bg-gray-primary" onClick={() => onPageClick(1)}>
                <FaAngleDoubleLeft />
            </button>
            {pages.map(
                (page, index) =>
                    page >= 1 &&
                    page <= totalPage && (
                        <button
                            key={index}
                            className="py-1 px-3 rounded hover:bg-gray-primary aria-[current]:bg-blue-primary aria-[current]:text-white"
                            onClick={() => onPageClick(page)}
                            aria-current={page === currentPage || undefined}
                        >
                            {page}
                        </button>
                    )
            )}
            <button className="py-1 px-3 rounded hover:bg-gray-primary" onClick={() => onPageClick(totalPage)}>
                <FaAngleDoubleRight />
            </button>
        </div>
    )
}

export default Pagination
