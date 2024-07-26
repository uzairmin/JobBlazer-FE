import { memo } from 'react'

import { Resumes } from '@/components'

import { devProfile } from '@modules/settings/resumeBuilder/devProfile'
import { getSectionNames, getSectionStatus } from '@utils/helpers'

const ResumeBuilder = () => (
    <div className='flex flex-col-1 w-[80%] mx-auto'>
        <Resumes
            data={devProfile}
            hide={getSectionStatus(devProfile.sections)}
            names={getSectionNames(devProfile.sections)}
        />
    </div>
)

export default memo(ResumeBuilder)
