import { memo, useState } from 'react'

import { Badge } from '@components'

import { CandidateForm } from '@modules/leadManagement/components'

import { ResumeSvgs as svgs } from '@svgs'
import { can } from '@utils/helpers'
import { avatarPlaceholder } from '@constants/profile'

const CandidtaeProfile = ({ data, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='h-fit'>
            <div className='rounded-lg overflow-hidden bg-white text-[#006366]'>
                <div className='grid space-x-6'>
                    <div className='flex flex-col w-100'>
                        <div className='flex flex-cols-2 md:p-6 p-3 rounded-t-2xl border'>
                            <div className='flex-shrink-0 w-24 md:w-fit mb-6 h-24 md:h-44 sm:mb-0 shadow-xl'>
                                <img
                                    src={avatarPlaceholder}
                                    alt='avatar'
                                    className='object-cover object-center w-full h-full rounded dark:bg-gray-500'
                                />
                            </div>
                            <div className='px-2 md:px-4 py-2'>
                                <div className='flex flex-row flex-wrap'>
                                    <p className='flex items-center'>
                                        <span className='font-semibold mr-2 md:mr-3 md:text-lg uppercase'>name :</span>
                                        <span className='text-gray-800 text-md'>{data?.candidates?.name}</span>
                                    </p>
                                </div>
                                <div className='flex flex-row flex-wrap'>
                                    <p className='flex items-center'>
                                        <span className='font-semibold mr-2 md:mr-3 md:text-lg uppercase'>
                                            Designation :
                                        </span>
                                        <span className='text-gray-800 text-md'>
                                            {data?.candidates?.designation?.name}
                                        </span>
                                    </p>
                                </div>
                                <div className='flex flex-row flex-wrap'>
                                    <p className='flex items-center'>
                                        <span className='font-semibold mr-2 md:mr-3 md:text-lg uppercase'>
                                            Company :
                                        </span>
                                        <span className='text-gray-800 text-md'>{data?.candidates?.company?.name}</span>
                                    </p>
                                </div>
                                <div className='flex flex-row flex-wrap'>
                                    <p className='flex items-center'>
                                        <span className='font-semibold mr-2 md:mr-3 md:text-lg uppercase'>
                                            Experience :
                                        </span>
                                        <span className='text-gray-800 text-md'>
                                            {data?.candidates?.experience} Years
                                        </span>
                                    </p>
                                </div>
                                <div className='flex flex-row flex-wrap'>
                                    <p>
                                        <span className='font-semibold mr-1 md:mr-3 md:text-lg uppercase'>
                                            Regions :
                                        </span>
                                        <span className='text-gray-800 text-md space-x-2'>
                                            {data?.candidates?.regions.map(region => (
                                                <Badge
                                                    label={
                                                        <span className='inline-block items-center'>
                                                            <span>{region.name}</span>
                                                        </span>
                                                    }
                                                    type='success'
                                                    classes='border border-green-300'
                                                    key={region.id}
                                                />
                                            ))}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-full relative'>
                            <div className='grid md:grid-cols-3 border divide-x bg-gray-100 rounded-b-2xl gap-3 md:gap-0 py-3'>
                                <div className='md:text-xs flex flex-row items-center justify-center underline-offset-4 underline'>
                                    <span className='fill-teal-700 mr-3'>{svgs.gmail4}</span>
                                    {data?.candidates?.email}
                                </div>
                                <div className='uppercase text-sm flex flex-row items-center justify-center'>
                                    <span className='fill-teal-700 mr-3'>{svgs.phone4}</span>
                                    {data?.candidates?.phone}
                                </div>
                                <div
                                    className='uppercase text-sm flex flex-row items-center justify-center font-semibold hover:cursor-pointer hover:underline underline-offset-4'
                                    onClick={() => setShow(true)}
                                >
                                    <div className='mr-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='20px'
                                            viewBox='0 0 24 24'
                                            width='20px'
                                            fill='#006366'
                                        >
                                            <path d='M0 0h24v24H0z' fill='none' />
                                            <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' />
                                        </svg>
                                    </div>
                                    Edit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {can('edit_candidate_profile') && show && (
                <CandidateForm
                    show={show}
                    setShow={setShow}
                    mutate={mutate}
                    candidate={data.candidates}
                    allRegions={data.regions}
                />
            )}
        </div>
    )
}
export default memo(CandidtaeProfile)
