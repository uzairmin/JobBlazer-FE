import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Resumes } from '@components'

import { ActionButtons, Sections } from '@modules/pseudos/components'
import { fetchProfile } from '@modules/pseudos/api'

import { getSectionNames, getSectionStatus } from '@utils/helpers'
import { DEFAULT_SECTIONS } from '@constants/pseudos'

const ResumePreview = ({ id }) => {
    const [hide, setHide] = useState(getSectionStatus(DEFAULT_SECTIONS))
    const [names, setNames] = useState(getSectionNames(DEFAULT_SECTIONS))

    const { data, isLoading, mutate } = useSWR(`/api/profile/resume/${id}/`, fetchProfile, {
        onSuccess: fetchedData => {
            if (
                !(
                    fetchedData?.sections &&
                    Object.keys(fetchedData?.sections).length === 0 &&
                    fetchedData?.sections?.constructor === Object
                )
            ) {
                setHide(getSectionStatus(fetchedData.sections))
                setNames(getSectionNames(fetchedData.sections))
            }
        },
    })

    if (isLoading) return <Loading />
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-3 md:gap-0 md:flex-row md:items-start'>
                {data ? (
                    <>
                        <div className='md:w-[25%] border-2 rounded-lg md:h-screen md:mr-2 md:overflow-y-auto'>
                            <Sections
                                hide={hide}
                                setHide={setHide}
                                names={names}
                                setNames={setNames}
                                mutate={mutate}
                                id={id}
                            />
                        </div>
                        <Resumes data={data} hide={hide} names={names} />
                    </>
                ) : (
                    <span>Error to load resume previews</span>
                )}
            </div>
            <div className='bg-white px-4'>
                <ActionButtons mutate={mutate} />
            </div>
        </div>
    )
}

export default memo(ResumePreview)
