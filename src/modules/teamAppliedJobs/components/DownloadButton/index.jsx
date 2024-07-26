import { memo } from 'react'
import useSWRMutation from 'swr/mutation'

import { Button } from '@components'

import { downloadFilteredJobs } from '@modules/teamAppliedJobs/api'

const DownloadFilteredJobs = memo((end_date, job_type, applied_by, job_source, start_date, tech_stacks) => {
    const { trigger } = useSWRMutation(
        `/api/job_portal/download_logs/?download=true&end_date=${end_date}&job_type=${job_type}&applied_by=${applied_by}&job_source=${job_source}&start_date=${start_date}&tech_stacks=${tech_stacks}`,
        downloadFilteredJobs
    )
    return <Button label='Download' fit onClick={trigger} />
})

export default DownloadFilteredJobs
