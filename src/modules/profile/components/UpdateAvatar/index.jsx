import { memo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { useMutate } from '@/hooks'

import { Button } from '@components'

import { FilePreview } from '@modules/profile/components'
import { updateAvatar } from '@modules/profile/api'

import { avatarSchema } from '@utils/schemas'
import { getMsg } from '@utils/helpers'
import { avatarPlaceholder } from '@constants/profile'

const UpdateAvatar = ({ data }) => {
    const [avatar] = useState(data?.profile?.file_url || avatarPlaceholder)
    const [uploaded, setUploaded] = useState(null)

    const { errors, handleSubmit, setFieldValue, trigger, wait } = useMutate(
        '/api/auth/user_profile_image/',
        updateAvatar,
        { file: data?.profile?.file_url || avatarPlaceholder },
        avatarSchema,
        async formValues => trigger({ ...formValues }),
        error => toast.error(getMsg(error)),
        () => window.location.reload()
    )

    return (
        <form onSubmit={handleSubmit} className='text-[#328d8c]' encType='multipart/form-data'>
            <h1 className='mb-2 text-lg font-medium'>Avatar upload</h1>
            <hr className='mb-5' />
            <div className='grid grid-flow-row gap-2'>
                <div className='flex flex-col items-center space-y-6 mx-auto mt-4 md:space-y-0 md:flex-row md:items-center'>
                    <a className='shrink-0 mr-6' href={avatar} target='_blank' rel='noreferrer'>
                        <img
                            className='h-28 w-28 object-cover shadow-lg rounded-full border border-[#328d8c]'
                            alt='Avatar'
                            src={avatar}
                        />
                    </a>
                    <label className='block'>
                        <span className='sr-only'>Choose profile photo</span>
                        <input
                            type='file'
                            name='file'
                            accept='image/png, image/jpg, image/jpeg, image/webp'
                            onChange={e => {
                                setFieldValue('file', e.currentTarget.files[0])
                                setUploaded(e.currentTarget.files[0])
                            }}
                            className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:text-white file:font-semibold file:bg-[#329988] hover:file:bg-[#4ab9a7]'
                        />
                    </label>
                </div>
                {uploaded && (
                    <div className='flex flex-col items-center space-y-4 mx-auto mt-4'>
                        <FilePreview file={uploaded} />
                        {errors.file && <small className='my-2 text-xs text-red-600'>{errors.file}</small>}
                        <div className='pt-4'>
                            <Button
                                label={wait ? 'Uploading...' : 'Upload'}
                                type='submit'
                                fit
                                classes='px-6'
                                disabled={wait}
                            />
                        </div>
                    </div>
                )}
            </div>
        </form>
    )
}

export default memo(UpdateAvatar)
