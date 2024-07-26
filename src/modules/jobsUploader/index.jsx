import { React, useState } from 'react'

import { Button } from '@components'

import { FilesUploader, ManualJobs, ExpiredJobs } from '@modules/jobsUploader/components'

import { can } from '@utils/helpers'

import { PostJobIcon, UploadJobIcon, ExpiredJobsIcon } from '@icons'

const JobsUploader = () => {
    const [activeTab, setActiveTab] = useState({ jobposter: true, filesuploader: false, expiredJobs: false })

    return (
        <div className='flex flex-col border shadow	text-[#006366] py-8 '>
            <div className='flex flex-col mb-4'>
                <div className='flex flex-row mb-4 gap-3 md:gap-5 ml-6'>
                    {can('view_manual_job') && (
                        <Button
                            label='Post a Job'
                            fit
                            icon={PostJobIcon}
                            classes={`md:pr-8 md:pl-6 ${activeTab.jobposter && 'text-white bg-[#048C8C]'}`}
                            onClick={() => setActiveTab({ jobposter: true, filesuploader: false, expiredJobs: false })}
                        />
                    )}
                    {can(['view_job_uploader', 'upload_csv']) && (
                        <Button
                            label='Upload Job Files'
                            fit
                            icon={UploadJobIcon}
                            classes={`md:pr-8 md:pl-6 ${activeTab.filesuploader && 'text-white bg-[#048C8C]'}`}
                            onClick={() => setActiveTab({ jobposter: false, filesuploader: true, expiredJobs: false })}
                        />
                    )}
                    {can('view_expired_job') && (
                        <Button
                            label='Expired Jobs'
                            fit
                            icon={ExpiredJobsIcon}
                            classes={`md:pr-8 md:pl-6 ${activeTab.expiredJobs && 'text-white bg-[#048C8C]'}`}
                            onClick={() => setActiveTab({ jobposter: false, filesuploader: false, expiredJobs: true })}
                        />
                    )}
                </div>
                {activeTab.jobposter &&
                    (can(['view_manual_job']) ? (
                        <ManualJobs />
                    ) : (
                        <div className='text-center	my-4'>User do not have the required permissions</div>
                    ))}
                {activeTab.filesuploader && <FilesUploader />}
                {activeTab.expiredJobs &&
                    (can('view_expired_job') ? (
                        <ExpiredJobs />
                    ) : (
                        <div className='text-center	my-4 italic'>You do not have permissions to view expired jobs!!</div>
                    ))}
            </div>
        </div>
    )
}

export default JobsUploader
