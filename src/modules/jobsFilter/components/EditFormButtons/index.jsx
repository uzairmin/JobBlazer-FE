import { memo } from 'react'

import { Button } from '@components'

const EditFormButtons = ({ wait, set }) => (
    <div className='pt-4 flex justify-end gap-2'>
        <Button label='Cancel' fit onClick={() => set({ show: false })} classes='!px-4' />
        <Button label='Update' fit fill type='submit' disabled={wait} classes='!px-8' />
        {/* <Button
            label='Update & Apply'
            fit
            type='submit'
            disabled={wait}
            classes='!px-8 bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-100 hover:!text-[#048c8c] hover:!border-[#048c8c]'
        /> */}
    </div>
)

export default memo(EditFormButtons)
