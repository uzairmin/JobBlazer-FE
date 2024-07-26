import { memo } from 'react'

import { formatDate4 } from '@utils/helpers'

import { ResumeSvgs as svgs } from '@svgs'

const Template4 = ({ data: dev, hide, names }) => (
    <div className='p-8'>
        <div className='grid grid-cols-2 text-sm mb-10'>
            <div className='flex flex-col mb-2'>
                {hide.name && dev?.basic?.name && <p className='text-2xl text-blue-900'>{dev?.basic?.name}</p>}
                {hide.designation && dev?.basic?.designation && (
                    <p className='text-gray-500 text-lg'>{dev?.basic?.designation}</p>
                )}
                {hide.summary && dev?.summary?.length > 0 && (
                    <div className='mt-2'>
                        <div className='flex flex-col'>
                            <p className='text-gray-700 text-xs break-words'>{dev?.summary ?? ''}</p>
                        </div>
                    </div>
                )}
            </div>
            {(hide.phone || hide.email || hide.address) && (
                <div className='flex flex-col mt-6 space-y-4'>
                    {hide.phone && dev?.basic?.phone && (
                        <div className='flex flex-row justify-end space-x-2'>
                            <p className='text-gray-500 text-sm float-right'>{dev?.basic?.phone}</p>
                            <p className='text-blue-900 fill-current'>{svgs.phone4}</p>
                        </div>
                    )}
                    {hide.email && dev?.basic?.email && (
                        <div className='flex flex-row justify-end space-x-2'>
                            <p className='text-gray-500 text-sm float-right'>{dev?.basic?.email}</p>
                            <p className='text-blue-900 fill-current'>{svgs.gmail4}</p>
                        </div>
                    )}
                    {hide.address && dev?.basic?.address && (
                        <div className='flex flex-row justify-end space-x-2'>
                            <p className='text-gray-500 text-sm float-right'>{dev?.basic?.address}</p>
                            <p className='text-blue-900 fill-current'>{svgs.address4}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
        {hide.skill && dev?.skills?.all?.length > 0 && (
            <div className='mb-10'>
                <p className='text-lg text-center py-2 mb-4 border-y border-black text-blue-900 font-semibold uppercase'>
                    {names.skill}
                </p>
                <div className='flex flex-col'>
                    <div>
                        {dev?.skills?.all.map(({ name }, index) => (
                            <div className='inline-block py-1' key={index}>
                                <span className='bg-blue-900 text-white text-sm font-medium mr-2 px-2.5 py-1 rounded'>
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {hide.experience && dev?.experience?.length > 0 && (
            <div className='mb-10'>
                <p className='text-lg text-center py-2 mb-4 border-y border-black text-blue-900 font-semibold uppercase'>
                    {names.experience}
                </p>
                <div className='flex flex-col'>
                    <div className='space-y-5'>
                        {dev?.experience.map(({ company, title, from, to, description }, index) => (
                            <div className='grid grid-cols-1 text-sm' key={index}>
                                <div className='flex flex-col'>
                                    <div className='flex justify-between text-sm'>
                                        <p className='text-md font-semibold text-lg'>{company}</p>
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
                <p className='text-lg text-center py-2 mb-4 border-y border-black text-blue-900 font-semibold uppercase'>
                    {names.project}
                </p>
                <div className='flex flex-col '>
                    <div className='space-y-5'>
                        {dev?.projects?.map(({ name, title, repo, description }, index) => (
                            <div className='text-sm' key={index}>
                                <p className='font-bold text-lg'>{name}</p>
                                <p className='italic'>{title}</p>
                                <p className='text-gray-700 break-words text-xs'>{description ?? 'no description'}</p>
                                <p className='text-gray-500'>{repo ?? 'open source'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {hide.education && dev?.education?.length > 0 && (
            <div className='mb-10'>
                <p className='text-lg text-center py-2 mb-4 border-y border-black text-blue-900 font-semibold uppercase'>
                    {names.education}
                </p>
                <div className='flex flex-col'>
                    <div className='space-y-5'>
                        {dev?.education.map(({ degree, from, to, institute, grade }, index) => (
                            <div className='grid grid-cols-1 text-sm' key={index}>
                                <p className='text-lg font-semibold'>{institute}</p>
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

export default memo(Template4)
