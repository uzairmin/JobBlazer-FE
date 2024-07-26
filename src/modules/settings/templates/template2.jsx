import { memo } from 'react'

import { formatDate4 } from '@utils/helpers'

import { ResumeSvgs as svgs } from '@svgs'

const Template2 = ({ data: dev, hide, names }) => (
    <div className='p-8'>
        <div className='flex flex-col mb-10'>
            {hide.name && dev?.basic?.name && <p className='text-blue-900 text-6xl font-bold'>{dev?.basic?.name}</p>}
            {hide.designation && dev?.basic?.designation && (
                <p className='text-gray-500 text-3xl font-bold mt-3'>{dev?.basic?.designation}</p>
            )}
        </div>
        {hide.summary && dev?.summary?.length > 0 && (
            <div className='flex items-baseline justify-start mb-3 mt-10'>
                <p className='text-blue-900 text-xl font-bold w-1/4'>{names.summary}</p>
                <div className='flex flex-col w-3/4'>
                    <hr className='mb-3 border border-blue-900' />
                    <p className='text-gray-700 text-sm break-words'>{dev?.summary ?? 'no summary'}</p>
                </div>
            </div>
        )}
        {hide.experience && dev?.experience?.length > 0 && (
            <div className='flex items-baseline justify-start my-3'>
                <p className='text-blue-900 text-xl font-bold w-1/4'>{names.experience}</p>
                <div className='flex flex-col w-3/4'>
                    <hr className='mb-3 border border-blue-900' />
                    <div className='space-y-5'>
                        {dev?.experience.map(({ company, title, from, to, description }, index) => (
                            <div className='grid grid-cols-2 text-sm' key={index}>
                                <div className='flex flex-col'>
                                    <p className='text-blue-900 font-bold'>{title}</p>
                                    <p className='italic'>{company}</p>
                                    <p className='text-gray-500'>
                                        {formatDate4(from)} to {formatDate4(to)}
                                    </p>
                                </div>
                                <p className='text-gray-700 break-words'>{description ?? 'no description'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {hide.project && dev?.projects?.length > 0 && (
            <div className='flex items-baseline justify-start my-3'>
                <p className='text-blue-900 text-xl font-bold w-1/4'>{names.project}</p>
                <div className='flex flex-col w-3/4'>
                    <hr className='mb-3 border border-blue-900' />
                    <div className='space-y-5'>
                        {dev?.projects?.map(({ name, title, repo, description }, index) => (
                            <div className='grid grid-cols-2 text-sm' key={index}>
                                <div className='flex flex-col'>
                                    <p className='text-blue-900 font-bold'>{name}</p>
                                    <p className='italic'>{title}</p>
                                    <p className='text-gray-500'>{repo ?? 'open source'}</p>
                                </div>
                                <p className='text-gray-700 break-words'>{description ?? 'no description'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {hide.education && dev?.education?.length > 0 && (
            <div className='flex items-baseline justify-start my-3'>
                <p className='text-blue-900 text-xl font-bold w-1/4'>{names.education}</p>
                <div className='flex flex-col w-3/4'>
                    <hr className='mb-3 border border-blue-900' />
                    <div className='space-y-5'>
                        {dev?.education.map(({ degree, from, to, institute, grade }, index) => (
                            <div className='grid grid-cols-2 text-sm' key={index}>
                                <div className='flex flex-col'>
                                    <p className='text-blue-900 font-bold'>{institute}</p>
                                    <p className='text-gray-500'>
                                        {formatDate4(from)} to {formatDate4(to)}
                                    </p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-blue-900 font-bold'>{degree}</p>
                                    <p className='text-gray-700'>{grade}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {hide.skill && dev?.skills?.all?.length > 0 && (
            <div className='flex items-baseline justify-start my-3'>
                <p className='text-blue-900 text-xl font-bold w-1/4'>{names.skill}</p>
                <div className='flex flex-col w-3/4'>
                    <hr className='mb-3 border border-blue-900' />
                    <div>
                        {dev?.skills?.all?.map(({ name }, index) => (
                            <div className='inline-block' key={index}>
                                <span className='pr-4'>{name}</span>
                                <span className='pr-4 text-gray-400 text-lg'>
                                    {dev?.skills.length !== index + 1 && '|'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {(hide.phone || hide.email || hide.portfolio || hide.address) &&
            (dev?.basic?.phone || dev?.basic?.email || dev?.basic?.portfolio || dev?.basic?.address) && (
                <div className='flex items-baseline justify-start my-3'>
                    <p className='text-blue-900 text-xl font-bold w-1/4'>Contact</p>
                    <div className='flex flex-col w-3/4'>
                        <hr className='mb-3 border border-blue-900' />
                        <div className='grid grid-cols-2 mb-3 text-sm'>
                            {hide.phone && dev?.basic?.phone && (
                                <div className='flex gap-4 my-3'>
                                    <span>{svgs.phone}</span>
                                    <p className='text-gray-700'>{dev?.basic?.phone}</p>
                                </div>
                            )}
                            {hide.portfolio && dev?.basic?.portfolio && (
                                <div className='flex gap-4 my-3'>
                                    <span>{svgs.portfolio}</span>
                                    <p className='text-gray-700'>{dev?.basic?.portfolio}</p>
                                </div>
                            )}
                            {hide.email && dev?.basic?.email && (
                                <div className='flex gap-4 my-3'>
                                    <span>{svgs.gmail}</span>
                                    <p className='text-gray-700'>{dev?.basic?.email}</p>
                                </div>
                            )}
                            {hide.address && dev?.basic?.address && (
                                <div className='flex gap-4 my-3'>
                                    <span>{svgs.address}</span>
                                    <p className='text-gray-700'>{dev?.basic?.address}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
    </div>
)

export default memo(Template2)
