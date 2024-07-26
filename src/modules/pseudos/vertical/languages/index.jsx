import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { ActionButtons, LanguageActions, LanguageForm } from '@modules/pseudos/components'
import { fetchLanguages } from '@modules/pseudos/api'

import { PROFICIENCY_LEVELS } from '@constants/pseudos'

import { CreateIcon } from '@icons'

const Languages = ({ id }) => {
    const [language, setLanguage] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/language/?id=${id}`, fetchLanguages)

    const handleClick = values => {
        setLanguage(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    return (
        <div className='mb-2 px-1'>
            <div className='flex items-center space-x-4 py-4'>
                <Button label='Add Language' fit icon={CreateIcon} onClick={() => handleClick(null)} />
            </div>
            <div className='grid gap-2 md:grid-cols-2'>
                {data?.length > 0 && !error ? (
                    data?.map((row, idx) => (
                        <div className='bg-white rounded-md p-2 md:p-4 border relative' key={idx}>
                            <h2 className='text-lg'>{row?.name ?? 'N/A'}</h2>
                            <span className='text-gray-600'>{PROFICIENCY_LEVELS[row?.level] ?? 'Others'}</span>
                            <LanguageActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            <div className='flex items-center mt-2'>
                                <div className='w-full bg-gray-200 rounded-lg overflow-hidden shadow-inner'>
                                    <div className='bg-[#4f9d9b] h-2' style={{ width: `${row.level * 20}%` }} />
                                </div>
                                <div className='ml-2'>{row?.level ?? 0}/5</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='ml-2 text-gray-500'>No languages found yet!</span>
                )}
            </div>
            <ActionButtons mutate={mutate} classes='mt-4' />
            {show && <LanguageForm show={show} setShow={setShow} mutate={mutate} language={language} id={id} />}
        </div>
    )
}

export default memo(Languages)
