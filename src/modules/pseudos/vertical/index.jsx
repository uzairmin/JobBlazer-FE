import { memo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { Button } from '@components'

import {
    BasicInfo,
    Skills,
    Experiences,
    Education,
    Languages,
    Links,
    OtherSections,
    CoverLetterTemplate,
    ResumePreview,
    Projects,
    DeleteVertical,
} from '@modules/pseudos/vertical/sections'

import { VERTICAL_INITIAL_TABS, VERTICAL_SECTIONS } from '@constants/pseudos'

const Vertical = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const [activeTab, setActiveTab] = useState(VERTICAL_INITIAL_TABS)
    const [name, setName] = useState(state?.name ?? 'No name')

    const handleClick = key => {
        Object.keys(activeTab).forEach(k => (activeTab[k] = false))
        activeTab[key] = true
        setActiveTab({ ...activeTab })
    }

    return (
        <div className='p-2'>
            <p className='pl-2 pr-6 mb-2 w-fit rounded-r-full bg-[#328d8c] text-lg md:text-2xl text-white'>
                {id} --- {name}
            </p>
            <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md'>
                <div className='flex flex-wrap mb-4 gap-2'>
                    {Object.entries(activeTab).map(([key, value]) => (
                        <Button
                            key={key}
                            label={VERTICAL_SECTIONS[key] ?? 'Other'}
                            fit
                            classes={`rounded-none border-0 border-b-4 ${
                                key === 'delete' && 'border-red-200 text-red-600'
                            } ${!value && 'border-gray-200 text-gray-500'}`}
                            onClick={() => handleClick(key)}
                        />
                    ))}
                </div>
                {activeTab.basic && <BasicInfo id={id} set={setName} />}
                {activeTab.skill && <Skills id={id} />}
                {activeTab.experience && <Experiences id={id} />}
                {activeTab.education && <Education id={id} />}
                {activeTab.language && <Languages id={id} />}
                {activeTab.link && <Links id={id} />}
                {activeTab.other && <OtherSections id={id} />}
                {activeTab.cover_letter_template && <CoverLetterTemplate id={id} />}
                {activeTab.resume_preview && <ResumePreview id={id} />}
                {activeTab.project && <Projects id={id} />}
                {activeTab.delete && <DeleteVertical id={id} name={name} />}
            </div>
        </div>
    )
}

export default memo(Vertical)
