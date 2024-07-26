import { memo } from 'react'

import { formatDate4 } from '@utils/helpers'

import { ResumeSvgs as svgs } from '@svgs'

const Template3 = ({ data: dev, hide, names }) => (
    <div className='p-8'>
        <div className='flex flex-col mb-2'>
            {hide.name && dev?.basic?.name && <p className='text-2xl text-center'>{dev?.basic?.name}</p>}
            {hide.designation && dev?.basic?.designation && (
                <p className='text-gray-500 text-md text-center'>{dev?.basic?.designation}</p>
            )}
            {(hide.phone || hide.email || hide.address) &&
                (dev?.basic?.phone || dev?.basic?.email || dev?.basic?.address) && (
                    <div className='text-gray-500 flex flex-row justify-center'>
                        {hide.phone && dev?.basic?.phone && (
                            <div className='flex flex-row justify-center text-xs'>
                                <p className='font-bold mx-2'>{svgs.phone3}</p>
                                <p>{dev?.basic?.phone}</p>
                            </div>
                        )}
                        {hide.email && dev?.basic?.email && (
                            <div className='flex flex-row justify-center text-xs'>
                                <p className='font-bold mx-2'>{svgs.gmail3}</p>
                                <p>{dev?.basic?.email}</p>
                            </div>
                        )}
                        {hide.address && dev?.basic?.address && (
                            <div className='flex flex-row justify-center text-xs'>
                                <p className='font-bold mx-2'>{svgs.address3}</p>
                                <p>{dev?.basic?.address}</p>
                            </div>
                        )}
                    </div>
                )}
        </div>
        {hide.summary && dev?.summary?.length > 0 && (
            <div className='mb-10'>
                <p className=' text-lg text-center mb-3'>{names.summary}</p>
                <div className='flex flex-col'>
                    <hr className='mb-3 border-black' />
                    <p className='text-gray-700 text-xs break-words'>{dev?.summary ?? 'no summary'}</p>
                </div>
            </div>
        )}
        {hide.experience && dev?.experience?.length > 0 && (
            <div className='mb-10'>
                <p className='text-lg text-center mb-3'>{names.experience}</p>
                <div className='flex flex-col'>
                    <hr className='mb-3  border-black' />
                    <div className='space-y-5'>
                        {dev?.experience.map(({ company, title, from, to, description }, index) => (
                            <div className='grid grid-cols-1 text-sm' key={index}>
                                <div className='flex flex-col'>
                                    <div className='flex justify-between text-sm'>
                                        <p className='text-gray-500 text-md'>{company}</p>
                                        <p className=' text-md'>location</p>
                                    </div>
                                    <div className='flex justify-between text-sm'>
                                        <p className=''>{title}</p>
                                        <p className='text-gray-500'>
                                            {formatDate4(from)} to {formatDate4(to)}
                                        </p>
                                    </div>

                                    <p className='text-gray-700 break-words text-xs'>
                                        {description ?? 'no description'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {hide.project && dev?.projects?.length > 0 && (
            <div className='mb-10'>
                <p className='text-lg text-center mb-3'>{names.project}</p>
                <div className='flex flex-col '>
                    <hr className='mb-3 border-black' />
                    <div className='space-y-5'>
                        {dev?.projects?.map(({ name, title, repo, description }, index) => (
                            <div className='text-sm' key={index}>
                                <p className='font-bold'>{name}</p>
                                <p className='italic'>{title}</p>
                                <p className='text-gray-700 break-words text-xs'>{description ?? 'no description'}</p>
                                <p className='text-gray-500'>{repo ?? 'open source'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {hide.skill && dev?.skills?.length > 0 && (
            <div className='mb-10'>
                <p className='text-lg text-center mb-3'>{names.skill}</p>
                <div className='flex flex-col'>
                    <hr className='mb-3 border-black' />
                    <div>
                        {dev?.skills.map(({ name }, index) => (
                            <div className='inline-block' key={index}>
                                <span className='pr-4 text-sm text-gray-800'>{name}</span>
                                <span className='pr-4 text-gray-600 text-sm'>
                                    {dev?.skills.length !== index + 1 && '|'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {hide.education && dev?.education?.length > 0 && (
            <div className='mb-10'>
                <p className='text-lg text-center mb-3'>{names.education}</p>
                <div className='flex flex-col'>
                    <hr className='mb-3 border-black' />
                    <div className='space-y-5'>
                        {dev?.education.map(({ degree, from, to, institute, grade }, index) => (
                            <div className='grid grid-cols-1 text-sm' key={index}>
                                <p className='text-lg text-gray-500'>{institute}</p>
                                <div className='flex justify-between text-sm'>
                                    <p className=''>{degree}</p>
                                    <p className='text-gray-500'>
                                        {formatDate4(from)} to {formatDate4(to)}
                                    </p>
                                </div>
                                <p className='text-gray-700'>Grade: {grade}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
)

export default memo(Template3)
