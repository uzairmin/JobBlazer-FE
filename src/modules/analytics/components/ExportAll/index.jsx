import { memo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@components'

import { htmlToPng } from '@utils/helpers'
import { GRAPHS_DIVS_IDS } from '@constants/analytics'

import { DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'

const ExportAll = () => {
    const [exporting, setExporting] = useState(false)
    const handleClick = async () => {
        const exportDiv = document.getElementById('export-div')
        try {
            setExporting(true)
            GRAPHS_DIVS_IDS.forEach(id => {
                const div = document.getElementById(id)
                if (div?.cloneNode(true)) {
                    exportDiv.appendChild(div?.cloneNode(true))
                }
            })
            const waterMark = document.getElementById('waterMark')
            exportDiv.appendChild(waterMark?.cloneNode(true))
            await htmlToPng(exportDiv, { name: 'single_export' })
            setExporting(false)
            toast.success(`Graphs are exported successfully.`)
        } catch (error) {
            toast.error(`Error exporting graphs: ${error}`)
            setExporting(false)
        }
        exportDiv.innerHTML = ''
    }

    return (
        <>
            <Button
                icon={DownloadIcon2}
                label={exporting ? 'Exporting...' : 'Export ALL'}
                loading={exporting}
                onClick={handleClick}
                classes='!pl-2 !pr-3 whitespace-nowrap !rounded-full hidden 2xl:flex'
                disabled={exporting}
                fit
            />
            <div className='hidden'>
                <div id='waterMark' className='flex items-end mt-4 justify-end mr-4 py-2'>
                    <span className='text-cyan-900 col-span-3  px-2 font-bold'>Powered by</span>
                    <img src={logo} alt='' width='120' height='120' />
                </div>
            </div>
        </>
    )
}

export default memo(ExportAll)
