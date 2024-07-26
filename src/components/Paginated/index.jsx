import { memo } from 'react'
import ReactPaginate from 'react-paginate'

import { PageNext, PagePrev } from '@icons'

const Paginated = ({ pages: pageCount, setPage, page }) => {
    const handlePageClick = event => {
        setPage(event.selected + 1)
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 20,
                boxSizing: 'border-box',
            }}
        >
            <ReactPaginate
                breakLabel='...'
                nextLabel={PageNext}
                onPageChange={handlePageClick}
                pageCount={pageCount}
                pageRangeDisplayed={5}
                previousLabel={PagePrev}
                forcePage={page - 1}
                renderOnZeroPageCount={null}
                containerClassName='flex items-center justify-start my-2 gap-2'
                pageLinkClassName='border px-2 py-1 rounded-lg border-[#10868a]'
                previousClassName='border px-2 py-1 rounded-lg text-white bg-[#10868a] border-[#10868a]'
                nextClassName='border px-2 py-1 rounded-lg text-white bg-[#10868a] border-[#10868a]'
                breakLinkClassName='text-gray-500 border px-2 py-1 rounded-lg border-[#10868a]'
                activeLinkClassName='text-white bg-[#10868a] border px-2 py-1'
            />
        </div>
    )
}

export default memo(Paginated)
