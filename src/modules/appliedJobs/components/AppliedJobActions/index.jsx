import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Tooltip } from '@components'

import { can } from '@utils/helpers'

import { DownloadIcon, DownloadIcon2, ConvertToLeadIcon } from '@icons'

const AppliedJobActions = ({ job }) => (
    <div className='flex space-x-2 items-center text-[#4f9d9b]'>
        {job?.cover_letter && (
            <a href={job?.cover_letter} download target='_blank' rel='noreferrer'>
                <Tooltip text='Download Cover Letter'>{DownloadIcon}</Tooltip>
            </a>
        )}
        {job?.resume && (
            <a href={job?.resume} download target='_blank' rel='noreferrer'>
                <Tooltip text='Download Resume'>{DownloadIcon2}</Tooltip>
            </a>
        )}
        {can('create_lead') && !job?.is_converted && (
            <Tooltip text='Convert to Lead'>
                <Link to={`/convert-to-lead/${job?.id}`}>{ConvertToLeadIcon}</Link>
            </Tooltip>
        )}
    </div>
)

export default memo(AppliedJobActions)
