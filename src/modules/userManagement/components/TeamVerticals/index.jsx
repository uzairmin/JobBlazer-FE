import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@components'

import { BackToIcon } from '@icons'

const TeamVerticals = ({ verticals = null }) => (
    <div className='flex border shadow text-[#006366] py-8 px-6 mb-4 justify-between'>
        <div className='flex flex-col'>
            <p className='text-xl'>Assigned Verticals</p>
            <div className='mt-4'>
                {verticals?.length > 0 &&
                    verticals?.map(tag => (
                        <span key={tag.id}>
                            <span className='inline-block my-2 px-2.5 py-1.5 text-sm bg-gray-200 rounded-full items-center mx-1'>
                                <span className='font-semibold'>{`${tag?.pseudo?.name} | ${tag?.name} | `}</span>
                                {tag?.regions?.length > 0 ? (
                                    tag?.regions?.map(r => r?.label).join(', ')
                                ) : (
                                    <span className='text-red-600'>Please assign region</span>
                                )}
                            </span>
                        </span>
                    ))}
            </div>
        </div>
        <Link to='/teams' className='float-right'>
            <Button label='Back to teams' icon={BackToIcon} fit />
        </Link>
    </div>
)

export default memo(TeamVerticals)
