import { memo, useMemo, useState, useReducer } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useSWRImmutable from 'swr/immutable'

import { useMutate } from '@/hooks'

import { TextEditor, Loading, Button, Input } from '@components'

import { ResumeSelect, ResumeTypes, VerticalSelect } from '@modules/jobsFilter/components'
import { fetchUserVerticals, applyJob } from '@modules/jobsFilter/api'

const ApplyForJob = () => {
    const { id } = useParams()
    const redirect = useNavigate()

    const [vals, setVals] = useReducer((prev, next) => ({ ...prev, ...next }), {
        verticalId: null,
        teamId: null,
        coverLetter: `Here your cover letter ${id}`,
        resumeType: 'automatic',
    })
    const [pdfBlob, setPdfBlob] = useState(null)
    const [resumePDF, setResumePDF] = useState('')

    const { data: data2, isLoading: isLoading2 } = useSWRImmutable(
        `/api/profile/generate/cover_letter/?vertical_id=${vals.verticalId}&job_id=${id}`,
        vals.verticalId ? fetchUserVerticals : null
    )

    const { wait, handleSubmit, trigger } = useMutate(
        '/api/job_portal/job_status/',
        applyJob,
        { status: 1, job: id, resume_type: vals.resumeType },
        null,
        async formValues => {
            trigger({
                ...formValues,
                cover_letter: vals.coverLetter,
                vertical_id: vals.verticalId,
                resume:
                    vals.resumeType === 'automatic'
                        ? pdfBlob
                        : vals.resumeType === 'manual' && resumePDF
                        ? resumePDF
                        : null,
            })
        },
        null,
        () => redirect('/jobs-portal')
    )

    useMemo(() => setVals({ coverLetter: data2?.cover_letter }), [data2])

    if (isLoading2 || wait) return <Loading />
    return (
        <div className='max-w-full mb-14 px-5'>
            <form onSubmit={handleSubmit}>
                <div className='flex gap-5'>
                    <div className='flex flex-col space-y-4 w-1/3 bg-[#edfdfb] p-5 border border-gray-200 rounded-lg h-full md:mt-8'>
                        <div className='z-50'>
                            <VerticalSelect jobId={id} vId={vals.verticalId} teamId={vals.teamId} setVals={setVals} />
                            {vals.verticalId && (
                                <>
                                    <p className='text-gray-600 pt-2 pb-2'>Resume Type</p>
                                    <ResumeTypes type={vals.resumeType} setVals={setVals} />
                                </>
                            )}
                        </div>
                        {vals.verticalId && vals.resumeType && (
                            <>
                                <TextEditor
                                    init={data2?.cover_letter ?? `Here your cover letter ${id}`}
                                    value={vals.coverLetter}
                                    onChange={text => setVals({ coverLetter: text })}
                                />
                                <Button label='Apply' type='submit' fill fit classes='px-8 md:px-12 !rounded-full' />
                            </>
                        )}
                    </div>
                    <div className='w-2/3'>
                        {vals.verticalId &&
                            vals.resumeType &&
                            (vals.resumeType === 'automatic' ? (
                                <ResumeSelect vertical={vals.verticalId} setResume={setPdfBlob} />
                            ) : (
                                <div className='bg-[#edfdfb] p-5 border border-gray-200 text-center rounded-lg md:mt-8 border-1 text-gray-600'>
                                    <p>Upload Resume in PDF</p>
                                    <Input
                                        type='file'
                                        accepts='.pdf'
                                        name='resume'
                                        onChange={e => setResumePDF(e.target.files[0])}
                                        classes='my-3'
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default memo(ApplyForJob)
