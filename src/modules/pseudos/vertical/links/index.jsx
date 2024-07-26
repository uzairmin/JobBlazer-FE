import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { ActionButtons, LinkActions, LinkForm } from '@modules/pseudos/components'
import { fetchLinks } from '@modules/pseudos/api'

import { SOCIAL_PLATFORMS } from '@constants/pseudos'

import { CreateIcon } from '@icons'
import { LinksSvgs } from '@svgs'

const Links = ({ id }) => {
    const [link, setLink] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/links/?id=${id}`, fetchLinks)

    const handleClick = values => {
        setLink(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    return (
        <div className='mb-2 px-1'>
            <div className='flex items-center space-x-4 py-4'>
                <Button label='Add Link' fit icon={CreateIcon} onClick={() => handleClick(null)} />
            </div>
            <div className='grid gap-2 md:grid-cols-2'>
                {data?.length > 0 && !error ? (
                    data?.map((row, idx) => (
                        <div className='bg-white flex flex-col rounded-md p-2 md:p-4 border relative' key={idx}>
                            <div className='flex gap-4'>
                                <span>{LinksSvgs[row?.platform ?? 'other']}</span>
                                <h2 className='text-lg capitalize'>{SOCIAL_PLATFORMS[row?.platform ?? 'other']}</h2>
                                <LinkActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            </div>
                            <small className='mt-2 font-mono text-ellipsis'>
                                <a href={row?.url} target='_blank' rel='noopener noreferrer'>
                                    {row?.url}
                                </a>
                            </small>
                        </div>
                    ))
                ) : (
                    <span className='ml-2 text-gray-500'>No links added yet!</span>
                )}
            </div>
            <ActionButtons mutate={mutate} classes='mt-4' />
            {show && <LinkForm show={show} setShow={setShow} mutate={mutate} link={link} id={id} />}
        </div>
    )
}

export default memo(Links)
