import { memo } from 'react'

import { PaginateNext, PaginatePrev } from '@icons'

const Pagination = memo(({ next, prev, handleClick }) => (
    <ul className='inline-flex items-center -space-x-px'>
        <li>
            <button
                disabled={prev}
                className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700'
                onClick={() => handleClick('prev')}
            >
                {PaginatePrev}
            </button>
        </li>
        <li>
            <button
                disabled={next}
                className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'
                onClick={() => handleClick('next')}
            >
                {PaginateNext}
            </button>
        </li>
    </ul>
))

export default Pagination
