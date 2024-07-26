import { memo, useState } from 'react'

import { Button, TextEditor } from '@components'

import { CoverLetterForm } from '@modules/coverLetter/components'

import { CreateLetterIcon } from '@icons'

const CoverLetter = () => {
    const [show, setShow] = useState(false)
    const [init, setInit] = useState('<p>your Ai Generated Cover Letter Displays here.........</p>')

    const handleClick = () => {
        setShow(!show)
    }

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-2'>
                <Button label='Generate Cover Letter' fit icon={CreateLetterIcon} onClick={() => handleClick()} />
            </div>
            {!show && <TextEditor init={init} />}
            {show && <CoverLetterForm show={show} setShow={setShow} setInit={setInit} />}
        </div>
    )
}

export default memo(CoverLetter)
