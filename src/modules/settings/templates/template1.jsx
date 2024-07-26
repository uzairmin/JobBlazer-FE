import { memo } from 'react'

import { formatDate4 } from '@utils/helpers'

import { ResumeSvgs as svgs } from '@svgs'

const Template1 = ({ data: dev, hide, names }) => (
    <div className='p-8'>
        <div className='flex flex-col mb-5'>
            {hide.name && dev?.basic?.name && <p className='text-5xl font-bold'>{dev?.basic?.name}</p>}
            {hide.designation && dev?.basic?.designation && (
                <p className='text-gray-500 text-3xl mt-3'>{dev?.basic?.designation}</p>
            )}
        </div>
        {(hide.phone || hide.email || hide.address) && (
            <div className='flex flex-col mt-6 space-y-4'>
                {hide.phone && dev?.basic?.phone && (
                    <div className='flex flex-row space-x-2'>
                        <p className='fill-white bg-black p-1'>{svgs.phone4}</p>
                        <p className='text-gray-500 text-sm float-right'>{dev?.basic?.phone}</p>
                    </div>
                )}
                {hide.email && dev?.basic?.email && (
                    <div className='flex flex-row space-x-2'>
                        <p className='fill-white bg-black p-1'>{svgs.gmail4}</p>
                        <p className='text-gray-500 text-sm float-right'>{dev?.basic?.email}</p>
                    </div>
                )}
                {hide.address && dev?.basic?.address && (
                    <div className='flex flex-row space-x-2'>
                        <p className='fill-white bg-black p-1'>{svgs.address4}</p>
                        <p className='text-gray-500 text-sm float-right'>{dev?.basic?.address}</p>
                    </div>
                )}
            </div>
        )}
        {hide.summary && dev?.summary?.length > 0 && (
            <div className='flex items-baseline justify-start mb-5 mt-5'>
                <div className='flex flex-col'>
                    <p className='text-gray-700 text-sm break-words'>{dev?.summary}</p>
                </div>
            </div>
        )}
        {hide.skill && dev?.skills?.all?.length > 0 && (
            <div className='my-5'>
                <div className='flex flex-row align-baseline gap-2'>
                    <div className='bg-black p-2'>
                        <p className='fill-white'>{svgs.skill1}</p>
                    </div>
                    <p className='text-lg text-center mt-3 font-semibold '>{names.skill}</p>
                </div>
                <hr className='mb-6 border-gray-700' />
                <div className='flex flex-col'>
                    <div className='grid grid-col-1'>
                        <div className='flex flex-row text-sm'>
                            <div className='w-[30%]'>{}</div>
                            <div className='w-[80%]'>
                                {dev?.skills?.all.map(({ name }, index) => (
                                    <div className='inline-block' key={index}>
                                        <span className='pr-4 text-sm text-gray-800'>{name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {hide.experience && dev?.experience?.length > 0 && (
            <div className='my-5'>
                <div className='flex flex-row align-baseline gap-2'>
                    <div className='bg-black p-2'>
                        <p className='fill-white'>{svgs.experience1}</p>
                    </div>
                    <p className='text-lg text-center mt-3 font-semibold '>{names.experience}</p>
                </div>
                <hr className='mb-6 border-gray-700' />
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
                                    <p className='text-gray-700 break-words'>{description ?? 'no description'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {hide.education && dev?.education?.length > 0 && (
            <div className='my-5'>
                <div className='flex flex-row align-baseline gap-2'>
                    <div className='bg-black p-2'>
                        <p className='fill-white'>{svgs.education1}</p>
                    </div>
                    <p className='text-lg text-center mt-3 font-semibold '>{names.education}</p>
                </div>
                <hr className='mb-6 border-gray-700' />
                <div className='flex flex-col'>
                    <div className='grid grid-col-1 gap-8'>
                        {dev?.education.map(({ degree, institute }, index) => (
                            <div className='flex flex-row text-sm' key={index}>
                                <div className='w-[30%]'>{}</div>
                                <div className='w-[80%]'>
                                    <div className='flex flex-col'>
                                        <p className='font-bold text-xl'>{degree}</p>
                                        <p className='text-gray-700'>{institute}</p>
                                    </div>{' '}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
)

export default memo(Template1)
