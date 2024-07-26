import { memo, useState } from 'react'
import useSWR from 'swr'

import { Button, Loading } from '@components'

import { UpdateAvatar, UpdateDetails, UpdatePassword } from '@modules/profile/components'
import { fetchProfile } from '@modules/profile/api'

import { UserIcon, ActionsIcons, UpdatePasswordIcon } from '@icons'

const Profile = () => {
    const { data, isLoading } = useSWR('/api/auth/user_profile/', fetchProfile)
    const [activeTab, setActiveTab] = useState({ avatar: true, details: false, password: false })

    if (isLoading) return <Loading />

    return (
        <div className='p-2'>
            <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md'>
                <div className='flex flex-col mb-4'>
                    <div className='flex flex-col md:flex-row md:gap-5'>
                        <Button
                            label='Avatar'
                            fit
                            icon={UserIcon}
                            classes={`md:pr-4 md:pl-2 ${!activeTab.avatar && 'border-gray-200'}`}
                            onClick={() => setActiveTab({ avatar: true, details: false, password: false })}
                        />
                        <Button
                            label='Details'
                            fit
                            icon={ActionsIcons}
                            classes={`md:pr-4 md:pl-2 ${!activeTab.details && 'border-gray-200'}`}
                            onClick={() => setActiveTab({ avatar: false, details: true, password: false })}
                        />

                        <Button
                            label='Update Password'
                            fit
                            icon={UpdatePasswordIcon}
                            classes={`md:pr-4 md:pl-2 ${!activeTab.password && 'border-gray-200'}`}
                            onClick={() => setActiveTab({ avatar: false, details: false, password: true })}
                        />
                    </div>
                    {activeTab.avatar && (
                        <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md md:w-1/2 mx-auto mt-4'>
                            <UpdateAvatar data={data} />
                        </div>
                    )}
                    {activeTab.details && (
                        <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md md:w-1/2 mx-auto mt-4'>
                            <UpdateDetails data={data} />
                        </div>
                    )}
                    {activeTab.password && (
                        <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md md:w-1/2 mx-auto mt-4'>
                            <UpdatePassword />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(Profile)
