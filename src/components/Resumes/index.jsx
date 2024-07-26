import { memo, useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import { jsPDF as JsPDF } from 'jspdf'

import { Button } from '@components'

import {
    Template1,
    Template2,
    Template3,
    Template4,
    Template5,
    Template6,
    Template7,
    Template8,
    Template9,
    Template10,
} from '@modules/settings/templates'

import { devProfile } from '@modules/settings/resumeBuilder/devProfile'
import { htmlToPng, chunkNumber } from '@utils/helpers'

import { DownloadIcon, OpenSubMenuIcon } from '@icons'

const Resumes = ({ data, hide, names, set = null }) => {
    const refs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ]
    const [tab, setTab] = useState(0)
    const [showTemplate, setShowTemplates] = useState(false)

    const convertTemplate = async (ref, conversion = 'pdf') => {
        await htmlToPng(ref, { name: 'download' }, false)
            .then(dataUrl => {
                const img = new Image()
                img.src = dataUrl
                img.onload = () => {
                    const pdf = new JsPDF({
                        unit: 'in',
                        floatPrecision: 'smart',
                        format: 'letter',
                        userUnit: 'in',
                    })
                    const chunks = chunkNumber(img.height, 1000)
                    if (chunks?.length > 1) {
                        chunks.forEach((row, index) => {
                            const canvas = document.createElement('canvas')
                            canvas.width = img.width
                            canvas.height = row.max
                            const context1 = canvas.getContext('2d')
                            context1.drawImage(img, 0, row.min, img.width, row.max, 0, 0, img.width, row.max)
                            const canvasImageURl = canvas.toDataURL('PNG', 1)
                            pdf.addImage(canvasImageURl, 'PNG', 0, 0)
                            if (chunks.length > index + 1) {
                                pdf.addPage()
                            }
                            canvas.remove()
                        })
                    } else {
                        pdf.addImage(dataUrl, 'PNG', 0, 0)
                    }
                    if (conversion === 'pdf') {
                        pdf.save('export.pdf')
                    } else if (conversion === 'blob') {
                        const bloob = pdf.output('blob')
                        set(bloob)
                    } else {
                        toast.error('Conversion type is inappropriate')
                    }
                }
            })
            .catch(err => {
                toast.error(err)
            })
    }

    const setBlob = reference => (set ? convertTemplate(reference?.current, 'blob') : null)
    const downloadPdf = () => convertTemplate(refs[tab].current)

    useEffect(() => {
        setBlob(refs[tab])
    }, [tab])

    const getTemplates = (profile, gethide, name) => [
        <Template1 data={profile} hide={gethide} names={name} />,
        <Template2 data={profile} hide={gethide} names={name} />,
        <Template6 data={profile} hide={gethide} names={name} />,
        <Template9 data={profile} hide={gethide} names={name} />,
        <Template3 data={profile} hide={gethide} names={name} />,
        <Template10 data={profile} hide={gethide} names={name} />,
        <Template4 data={profile} hide={gethide} names={name} />,
        <Template5 data={profile} hide={gethide} names={name} />,
        <Template7 data={profile} hide={gethide} names={name} />,
        <Template8 data={profile} hide={gethide} names={name} />,
    ]
    return (
        <div className='md:w-fit'>
            <div className='flex flex-col-reverse md:flex-col-2 md:flex-row mx-auto'>
                <div className='md:w-[75%]'>
                    <div className='md:h-[90%] overflow-y-auto hide_scrollbar'>
                        {getTemplates(data, hide, names).map(
                            (component, index) =>
                                tab === index && (
                                    <div key={index} className='w-[51rem] bg-slate-50 shadow-2xl rounded-lg border-2'>
                                        <div ref={refs[index]} className='w-[51rem]'>
                                            {component}
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                    <div>
                        <Button label='Download' icon={DownloadIcon} fit fill onClick={downloadPdf} classes='!m-4' />
                    </div>
                </div>
                <div className={`2xl:w-[30%] xl:w-[20%] border-2 rounded-lg ${showTemplate ? 'h-screen' : 'mb-4'}`}>
                    <div
                        className='bg-[#048C8C] border-2 rounded-lg py-2 md:py-4 text-center text-white md:text-xl font-semibold flex items-center justify-center'
                        onClick={() => setShowTemplates(!showTemplate)}
                    >
                        Templates
                        <span className={`${showTemplate ? 'hidden' : 'block'} animate-ping ml-2 md:hidden`}>
                            {OpenSubMenuIcon}
                        </span>
                    </div>
                    <div
                        className={`h-[90%] md:grid 2xl:grid-cols-2 xl:grid-cols-1 3xl:grid-cols-3 hide_scrollbar overflow-y-scroll gap-y-56 ${
                            showTemplate ? 'grid' : 'hidden'
                        }`}
                    >
                        {getTemplates(devProfile, hide, names).map((component, index) => (
                            <div className='h-6 transform scale-[20%] w-[20%]' key={index}>
                                <div
                                    className={`${
                                        index === tab ? 'border-zinc-800 border-r-2' : 'bg-white '
                                    }shadow-2xl border-2 rounded-lg w-[21cm] min-h-[29.7cm] hover:cursor-pointer hover:bg-[#F2F2F2] h-2`}
                                    key={index}
                                    onClick={() => setTab(index)}
                                >
                                    {component}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Resumes)
