import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Resumes } from '@components'

import { fetchProfile } from '@modules/profile/api'

import { getSectionNames, getSectionStatus } from '@utils/helpers'
import { DEFAULT_SECTIONS } from '@constants/pseudos'
import { SWR_REVALIDATE } from '@constants/global'

const ResumeSelect = ({ vertical, setResume }) => {
    const [hide, setHide] = useState(getSectionStatus(DEFAULT_SECTIONS))
    const [names, setNames] = useState(getSectionNames(DEFAULT_SECTIONS))

    const { data, isLoading } = useSWR(`/api/profile/resume/${vertical}/`, fetchProfile, {
        ...SWR_REVALIDATE,
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
        <div className='flex flex-col items-center'>
            {data?.profile && <Resumes data={data?.profile} hide={hide} names={names} set={setResume} />}
        </div>
    )
}

export default memo(ResumeSelect)
