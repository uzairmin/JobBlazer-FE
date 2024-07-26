import { memo, useState } from 'react'

import { avatarPlaceholder } from '@constants/profile'

const FilePreview = ({ file }) => {
    const [preview, setPreview] = useState(null)

    const reader = new FileReader()

    reader.readAsDataURL(file)

    const isFileImage = filee => filee && filee.type.split('/')[0] === 'image'

    reader.onload = () => {
        setPreview(isFileImage(file) ? reader.result : avatarPlaceholder)
    }

    return (
        <>
            <p className='mb-2 pt-4'>Preview</p>
            <div className='shrink-0'>
                <img className='h-52 w-52 object-cover shadow-lg' alt='Uploading.....' src={preview} />
            </div>
        </>
    )
}

export default memo(FilePreview)
