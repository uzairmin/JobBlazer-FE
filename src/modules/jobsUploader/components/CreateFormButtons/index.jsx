import { memo } from 'react'

import { Button } from '@components'

const CreateFormButtons = ({ wait, set }) => (
    <div className='pt-4 flex justify-end gap-2'>
        <Button label='Cancel' fit onClick={set} classes='!px-4' />
        <Button label='Save' fit fill type='submit' disabled={wait} classes='!px-8' />
        {/* <Button
            label='Save & Apply'
            fit
            type='submit'
            disabled={wait}
            classes='!px-8 bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-100 hover:!text-[#048c8c] hover:!border-[#048c8c]'
        /> */}
    </div>
)

export default memo(CreateFormButtons)
