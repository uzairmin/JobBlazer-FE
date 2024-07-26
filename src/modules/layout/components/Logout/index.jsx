import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { removeToken } from '@utils/helpers'
import { LogoutIcon } from '@icons'

const Logout = memo(({ toggle = true }) => {
    const navigate = useNavigate()

    const logout = () => {
        removeToken()
        navigate(0)
    }

    return (
        <button
            onClick={() => logout('/login')}
            className='flex items-center text-sm p-4 text-[#003C40] rounded border-2 hover:text-[#003C40] border-solid border-[#EDFFFB] hover:border-2 hover:border-solid hover:border-[#048C8C] active:border-2 active:border-solid active:border-[#048C8C]'
        >
            {LogoutIcon}
            {toggle ? <span className='ml-3'>Logout</span> : ''}
        </button>
    )
})

export default Logout
