import { memo } from 'react'
import useSWR from 'swr'

import { fetchProfile } from '@modules/profile/api'

import { avatarPlaceholder } from '@constants/profile'

const Profile = () => {
    const { data, isLoading } = useSWR('/api/auth/user_profile/', fetchProfile)

    return (
        <div className='absolute flex items-center justify-between rounded-xl bg-white border px-4 py-2 shadow-xl right-20 z-10 border-[#4ab9a7]'>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <>
                    <div className='text-gray-500'>
                        <h3 className='mt-2 text-lg font-bold text-gray-900 sm:text-xl'>{data?.profile?.username}</h3>
                        <p className='mt-1 hidden text-sm sm:block'>{data?.profile?.email}</p>
                        <p className='mb-2 hidden text-sm italic sm:block'>{data?.profile?.role}</p>
                    </div>
                    <span className='rounded-full pl-10'>
                        <img
                            alt={data?.profile?.username}
                            src={data?.profile?.file_url ?? avatarPlaceholder}
                            onError={e => (e.target.src = avatarPlaceholder)}
                            className='h-16 w-16 rounded-lg object-cover shadow-sm'
                        />
                    </span>
                </>
            )}
        </div>
    )
}

export default memo(Profile)
