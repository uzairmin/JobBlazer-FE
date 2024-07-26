import { memo } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import { useMutate } from '@/hooks'

import { Button } from '@components'

import { assignCandidate } from '@modules/leadManagement/api'
import { CandidateSelect } from '@modules/appliedJobs/components'

import { BackToIcon } from '@icons'

const AssignCandidate = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const redirect = useNavigate()

    const { values, handleSubmit, trigger, setFieldValue } = useMutate(
        `api/lead_managament/leads/${id}/`,
        assignCandidate,
        { candidate: state?.candidate ?? '' },
        null,
        async formValues => trigger({ ...formValues }),
        null,
        () => redirect('/leads')
    )

    return (
        <div className='max-w-full overflow-x-auto hide_scrollbar p-4 mt-4'>
            <form onSubmit={handleSubmit}>
                <CandidateSelect selected={values.candidate} handleSelect={setFieldValue} />
                <div className='py-5 flex space-x-3 float-right'>
                    {values.candidate && <Button label='Save' type='submit' fit fill classes='!px-12' />}
                    <Button
                        label='Back to Leads'
                        icon={BackToIcon}
                        fit
                        onClick={() => redirect('/leads')}
                        classes='!pr-6 pl-3'
                    />
                </div>
            </form>
        </div>
    )
}

export default memo(AssignCandidate)
