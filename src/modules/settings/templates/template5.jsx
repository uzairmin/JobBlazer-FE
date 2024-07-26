import { memo } from 'react'

import { formatDate4 } from '@utils/helpers'

const Template5 = ({ data: dev, hide, names }) => (
    <div className='p-8'>
        <div className='flex flex-col'>
            {hide.name && dev?.basic?.name && <p className='text-5xl font-bold'>{dev?.basic?.name}</p>}
            {hide.designation && dev?.basic?.designation && (
                <p className='text-cyan-800 text-3xl mt-1'>{dev?.basic?.designation}</p>
            )}
        </div>
        {(hide.phone || hide.email || hide.address) && (
            <div className='flex flex-col'>
                {hide.address && dev?.basic?.address && (
                    <div className='flex flex-row space-x-2'>
                        <p className='text-gray-900 text-sm float-right font-semibold'>{dev?.basic?.address}</p>
                    </div>
                )}
                <div className='flex flex-row space-x-2'>
                    {hide.phone && dev?.basic?.phone && (
                        <p className='text-gray-500 text-sm float-right'>{dev?.basic?.phone} - </p>
                    )}
                    {hide.email && dev?.basic?.email && (
                        <p className='text-gray-500 text-sm float-right'>{dev?.basic?.email}</p>
                    )}
                </div>
            </div>
        )}
        {hide.summary && dev?.summary?.length > 0 && (
            <div className='flex items-baseline justify-start mb-10 mt-10'>
                <div className='flex flex-col'>
                    <p className='text-gray-900 text-lg float-right font-bold'>About me:</p>
                    <p className='text-gray-700 text-sm break-words'>{dev?.summary}</p>
                </div>
            </div>
        )}
        {hide.education && dev?.education?.length > 0 && (
            <div className='mb-10'>
                <div className='flex flex-row align-baseline gap-2'>
                    <p className='text-lg text-center mb-2 font-semibold '>{names.education}</p>
                </div>
                <hr className='mb-6 border-gray-700' />
                <div className='flex flex-col'>
                    <div className='grid grid-col-1 gap-8'>
                        {dev?.education.map(({ degree, institute, from, to }, index) => (
                            <div className='flex flex-row text-sm' key={index}>
                                <div className='w-[80%]'>
                                    <div className='flex flex-col'>
                                        <p className='font-bold text-xl'>{degree}</p>
                                        <p className='text-gray-700'>{institute}</p>
                                    </div>{' '}
                                </div>
                                <div className='w-[30%] justify-end'>
                                    <p className='text-sm font-medium text-right'>
                                        {formatDate4(from)} to {formatDate4(to)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {hide.experience && dev?.experience?.length > 0 && (
            <div className='mb-10 '>
                <div className='flex flex-row align-baseline gap-2'>
                    <p className='text-lg text-center mb-2 font-semibold'>{names.experience}</p>
                </div>
                <hr className='mb-6 border-gray-700' />
                <div className='flex flex-col'>
                    <div className='grid grid-cols-1 gap-8'>
                        {dev?.experience.map(({ company, title, from, to, description }, index) => (
                            <div className=' text-sm' key={index}>
                                <div className=''>
                                    <div className='flex flex-row justify-between'>
                                        <div className='text-cyan-800'>
                                            <p className='font-bold text-lg'>{company}</p>
                                            <p className='font-bold text-xl'>{title}</p>
                                        </div>
                                        <p className='text-gray-900 text-sm'>
                                            {formatDate4(from)} to {formatDate4(to)}
                                        </p>
                                    </div>
                                    <p className='text-gray-700 break-words mt-6 ml-20'>
                                        {description ?? 'no description'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {hide.skill && dev?.skills?.all?.length > 0 && (
            <div className='mb-10'>
                <div className='flex flex-row align-baseline gap-2'>
                    <p className='text-lg text-center mb-2 font-semibold '>{names.skill}</p>
                </div>
                <hr className='mb-6 border-gray-700' />
                <div className='flex flex-col'>
                    <div className='grid grid-col-1'>
                        <div className='flex flex-row text-sm'>
                            <div className='w-fit'>
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
    </div>
)

export default memo(Template5)
