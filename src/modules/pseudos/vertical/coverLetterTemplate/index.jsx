import { memo, useMemo, useState } from 'react'
import useSWR from 'swr'
import { useMutate } from '@/hooks'

import { Loading, Textarea } from '@components'

import { ActionButtons } from '@modules/pseudos/components'
import { fetchCoverLetterTemplate, saveCoverLetterTemplate } from '@modules/pseudos/api'

import { COVER_LETTER_PLACEHOLDERS } from '@constants/pseudos'

const CoverLetterTemplate = ({ id }) => {
    const [text, setText] = useState('')
    const [popdown, setPopdown] = useState(false)
    const [cursor, setCursor] = useState(0)

    const { data, isLoading, mutate } = useSWR(`/api/profile/cover_letter/?id=${id}`, fetchCoverLetterTemplate)
    const { handleSubmit, trigger } = useMutate(
        `/api/profile/cover_letter${data?.id ? `/${data?.id}/` : '/'}`,
        saveCoverLetterTemplate,
        { vertical_id: id, template: text },
        null,
        async formValues => trigger({ ...formValues, id: data?.id }),
        null,
        () => mutate()
    )

    function handleInput(event) {
        const inputText = event.target.value
        const cursorIndex = event.target.selectionStart
        const character = inputText.charAt(cursorIndex - 1)
        setCursor(cursorIndex)
        if (character === '@') {
            setPopdown(true)
        } else {
            setPopdown(false)
        }
        setText(inputText)
    }

    const handleSelect = name => {
        const newValue = `${text.substring(0, cursor)}${name}@ ${text.substring(cursor)} `
        setText(newValue)
        setCursor(prevCursor => prevCursor + name.length)
        setPopdown(false)
    }

    useMemo(() => {
        if (data) {
            setText(data[0]?.template ?? '')
            setCursor(data[0]?.template?.length ?? 0)
        }
    }, [data])

    if (isLoading) return <Loading />
    return (
        <div className='overflow-visible max-w-full mb-2 px-1'>
            <form onSubmit={handleSubmit}>
                <div className='relative mb-3'>
                    <Textarea
                        name='template'
                        value={text}
                        onChange={handleInput}
                        ph='Start typing from here. You can include placeholders by typing @ followed by a name.'
                        rows={20}
                    />
                    <small className='text-gray-600'>
                        Placeholders can be added like @placeholder_name@ way. Dont remove @ at last of placeholder
                    </small>
                    {popdown && (
                        <div className='top-full left-0 w-full mt-1 border shadow-lg'>
                            <div className='flex py-2 flex-wrap'>
                                {COVER_LETTER_PLACEHOLDERS.map((placeholder, index) => (
                                    <span
                                        key={index}
                                        className='ml-2 px-4 py-2 my-1 cursor-pointer bg-gray-200 text-sm rounded-lg hover:bg-gray-100 hover:text-[#338d8c]'
                                        onClick={() => handleSelect(placeholder)}
                                    >
                                        {placeholder}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <ActionButtons form />
            </form>
        </div>
    )
}

export default memo(CoverLetterTemplate)
