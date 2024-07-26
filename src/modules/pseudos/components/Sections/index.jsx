import { memo, useState } from 'react'

import { useMutate } from '@/hooks'

import { Button, Input } from '@components'

import { saveSections } from '@modules/pseudos/api'

import { BASIC_INFO_SECTIONS } from '@constants/pseudos'

import { HidePassIcon, SeePassIcon, OpenSubMenuIcon } from '@icons'

const Sections = ({ hide, setHide, names, setNames, mutate, id }) => {
    const toggleSection = section => setHide({ ...hide, [section]: !hide[section] })
    const handleChange = e => setNames({ ...names, [e.target.name]: e.target.value })
    const [showSections, setShowSections] = useState(false)

    const { handleSubmit, trigger } = useMutate(
        `api/profile/section_status/${id}/`,
        saveSections,
        {},
        null,
        async () =>
            trigger(
                Object.keys(names).reduce((acc, key) => {
                    acc[key] = { name: names[key], status: hide[key] }
                    return acc
                }, {})
            ),
        null,
        () => mutate()
    )

    return (
        <form onSubmit={handleSubmit} className='w-full h-fit'>
            <div className='flex flex-col font-normal'>
                <div
                    className='bg-[#048C8C] border-2 rounded-lg py-2 md:py-4 text-center text-white md:text-xl font-semibold flex items-center justify-center gap-1'
                    onClick={() => setShowSections(!showSections)}
                >
                    Sections
                    <span className={`${showSections ? 'hidden' : 'block'} animate-ping ml-2 md:hidden`}>
                        {OpenSubMenuIcon}
                    </span>
                </div>
                <div className={`${showSections ? '' : 'hidden'} md:block text-center`}>
                    <div className='border p-2.5 my-1 mx-2 md:m-2 shadow-md rounded-md'>
                        <p>Basic Info</p>
                        <hr className='m-1' />
                        <div className='flex flex-col ml-1 text-sm'>
                            {BASIC_INFO_SECTIONS.map(item => (
                                <div className='flex items-center justify-between my-1 md:my-1.5' key={item}>
                                    <Input
                                        name={item}
                                        value={names[item]}
                                        classes='__input_2'
                                        onChange={handleChange}
                                    />
                                    <span className='ml-3 cursor-pointer' onClick={() => toggleSection(item)}>
                                        {hide[item] ? SeePassIcon : HidePassIcon}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {Object.keys(names).map(
                        item =>
                            !BASIC_INFO_SECTIONS?.includes(item) && (
                                <div
                                    className='border p-2.5 my-1 mx-2 md:m-2 flex items-center justify-between shadow-md rounded-md'
                                    key={item}
                                >
                                    <Input
                                        name={item}
                                        value={names[item]}
                                        classes='__input_2'
                                        onChange={handleChange}
                                    />
                                    <span className='ml-3 cursor-pointer' onClick={() => toggleSection(item)}>
                                        {hide[item] ? SeePassIcon : HidePassIcon}
                                    </span>
                                </div>
                            )
                    )}
                    <Button label='Update' fit classes='!px-6 !py-1 !mx-auto my-2 md:!mt-2' type='submit' />
                </div>
            </div>
        </form>
    )
}

export default memo(Sections)
