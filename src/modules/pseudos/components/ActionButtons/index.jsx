import React, { memo } from 'react'

import { Button } from '@components'

import { useNavigate } from 'react-router-dom'

const ActionButtons = ({ form = false, mutate = null, classes = null }) => {
    const navigate = useNavigate()

    return (
        <div className={`flex items-center md:justify-end gap-2 ${classes}`}>
            {form && <Button label='Update' type='submit' fit fill classes='px-4 md:!px-8' />}
            {mutate && <Button label='Refetch' fill fit onClick={() => mutate()} classes='px-4 md:!px-8' />}
            <Button label='Back to pseudos' fit onClick={() => navigate('/pseudos')} classes='px-4 md:!px-6' />
        </div>
    )
}

export default memo(ActionButtons)
