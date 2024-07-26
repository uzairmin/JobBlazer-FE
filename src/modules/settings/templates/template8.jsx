import { memo } from 'react'

import { formatDate4 } from '@utils/helpers'

import { ResumeSvgs as svgs } from '@svgs'

const Template8 = ({ data: dev, hide, names }) => (
    <div className='p-4'>
        <div className='flex flex-row w-fit space-x-6 mt-8 divide-x-2 h-[100%]'>
            <div className='w-3/4 px-2'>
                {hide.summary && dev?.summary?.length > 0 && (
                    <div className='flex items-baseline justify-start py-8'>
                        <p className='text-gray-700 text-sm break-words'>{dev?.summary ?? 'no summary'}</p>
                    </div>
                )}
                {hide.experience && dev?.experience?.length > 0 && (
                    <div className='mb-10'>
                        <hr className='mb-2 border-gray-300' />
                        <div className='flex flex-row align-baseline gap-2'>
                            <p className='text-lg mb-2 text-center font-bold text-sky-800'>{names.experience}</p>
                        </div>
                        <hr className='mb-6 border-gray-300' />
                        <div className='flex flex-col'>
                            <div className='grid grid-cols-1 gap-8'>
                                {dev?.experience.map(({ company, title, from, to, description }, index) => (
                                    <div className='flex flex-row text-sm' key={index}>
                                        <div className='w-[30%]'>
                                            <p className='text-gray-900'>
                                                {formatDate4(from)} to {formatDate4(to)}
                                            </p>
                                        </div>
                                        <div className='w-[80%]'>
                                            <p className='font-bold'>{title}</p>
                                            <p className='italic'>{company}</p>
                                            <p className='text-gray-700 break-words'>
                                                {description ?? 'no description'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {hide.education && dev?.education?.length > 0 && (
                    <div className='mb-10'>
                        <hr className='mb-2 border-gray-300' />
                        <div className='flex flex-row align-baseline gap-2'>
                            <p className='text-lg mb-2 text-center font-bold text-sky-800'>{names.education}</p>
                        </div>
                        <hr className='mb-6 border-gray-300' />
                        <div className='flex flex-col'>
                            <div className='grid grid-col-1 gap-8'>
                                {dev?.education.map(({ degree, institute }, index) => (
                                    <div className='flex flex-row text-sm' key={index}>
                                        <div className='w-[30%]'>{}</div>
                                        <div className='w-[80%]'>
                                            <div className='flex flex-col'>
                                                <p className='font-bold text-xl'>{degree}</p>
                                                <p className='text-gray-700'>{institute}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='w-[35%]  bg-sky-800 '>
                <div className='flex flex-col mb-10 px-2'>
                    {hide.name && dev?.basic?.name && (
                        <p className='text-white text-3xl font-bold py-2 mt-2'>{dev?.basic?.name}</p>
                    )}
                    {hide.designation && dev?.basic?.designation && (
                        <p className='text-white text-2xl font-medium mt-3'>{dev?.basic?.designation}</p>
                    )}
                </div>
                <div className='mb-10'>
                    <div className='bg-sky-900 p-3'>
                        <p className='text-lg font-bold text-white'>Contact</p>
                    </div>
                    {(hide.phone || hide.email || hide.address) && (
                        <div className='flex flex-col p-4 space-y-4'>
                            {hide.phone && dev?.basic?.phone && (
                                <div className='flex flex-row space-x-2'>
                                    <p className='text-white fill-current'>{svgs.phone4}</p>
                                    <p className='text-white text-sm '>{dev?.basic?.phone}</p>
                                </div>
                            )}
                            {hide.email && dev?.basic?.email && (
                                <div className='flex flex-row space-x-2'>
                                    <p className='text-white fill-current'>{svgs.gmail4}</p>
                                    <p className='text-white text-sm '>{dev?.basic?.email}</p>
                                </div>
                            )}
                            {hide.address && dev?.basic?.address && (
                                <div className='flex flex-row space-x-2'>
                                    <p className='text-white fill-current'>{svgs.address4}</p>
                                    <p className='text-white text-sm '>{dev?.basic?.address}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {hide.skill && dev?.skills?.all?.length > 0 && (
                    <div className='mb-10'>
                        <div className='bg-sky-900 p-3'>
                            <p className='text-lg font-bold text-white'>{names.skill}</p>
                        </div>
                        <div className='flex flex-col'>
                            <div className='grid grid-col-1'>
                                <div className='flex flex-row text-sm'>
                                    <div className='p-4'>
                                        {dev?.skills?.all.map(({ name }, index) => (
                                            <div className='inline-block' key={index}>
                                                <span className='pr-4 text-sm text-white'>{name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
)

export default memo(Template8)
