import { React, useEffect, useRef, useState } from 'react'
import './index.css'
import { EmptyTable } from '@components'
import { toast } from 'react-hot-toast'
import { baseURL } from '@utils/http'
import { UploadIcon, CrossIcon } from '@icons'
import uploadJobs from '../../api'

import { can } from '@utils/helpers'

const JobsUploader = () => {
    // drag state
    const [dragActive, setDragActive] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(true)
    const [fileUploadButton, setFileUploadButton] = useState(false)
    // ref
    const inputRef = useRef(null)
    // upload files
    const [files, setFiles] = useState([])
    // handle drag events
    const handleDrag = e => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    useEffect(() => {}, [files])

    // triggers when file is dropped
    const handleDrop = e => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // handleFiles(e.dataTransfer.files);
            setFiles([...e.dataTransfer.files])
            setButtonDisable(false)
        }
    }

    // triggers when file is selected with click
    const handleChange = e => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            setFiles([...e.target.files])
            setButtonDisable(false)
        }
    }

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click()
    }

    const removeFile = id => {
        const files_copy = files.map(file => file)
        files_copy.splice(id, 1)
        setFiles(files_copy)
        if (files_copy.length === 0) {
            setButtonDisable(true)
        }
    }

    const uploadFiles = async event => {
        event.preventDefault()

        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append(`file_upload`, files[i])
        }

        const { status, detail } = await uploadJobs(`${baseURL}api/job_portal/upload_data/`, formData)

        if (status === 'success') {
            toast.success(detail)
        } else {
            toast.error(detail)
        }
        setFileUploadButton(false)
        setFiles([])
        return false
    }

    return (
        <div className='flex flex-row mx-auto'>
            {can(['upload_csv']) ? (
                <div className='flex flex-col justify-center mx-auto border p-3 '>
                    <div>
                        <h4 className='text-center text-cyan-700 my-3 font-bold'>Upload multiples files</h4>
                        <form id='form-file-upload' onDragEnter={handleDrag} onSubmit={e => e.preventDefault()}>
                            <input
                                accept='.xlsx, .xls, .ods'
                                required
                                name='input-file-upload'
                                ref={inputRef}
                                type='file'
                                id='input-file-upload'
                                multiple
                                value={[]}
                                onChange={handleChange}
                            />
                            <label
                                id='label-file-upload'
                                htmlFor='input-file-upload'
                                className={dragActive ? 'drag-active' : ''}
                            >
                                <div className='flex px-12 h-32 py-12 align-item-middle '>
                                    <button
                                        disabled={fileUploadButton}
                                        className='upload-button'
                                        onClick={() => {
                                            onButtonClick()
                                        }}
                                    >
                                        <div className='flex'>
                                            <span className='px-2'> {UploadIcon}</span>
                                            <span>drag,drop,select files?csv.xlsx.xls.ods </span>
                                        </div>
                                    </button>
                                </div>
                            </label>

                            {dragActive && (
                                <div
                                    id='drag-file-element'
                                    onDragEnter={handleDrag}
                                    onDrop={handleDrop}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                />
                            )}
                        </form>
                    </div>
                    <div className='text-xs flex flex-col items-start p-3'>
                        {files?.map((item, i) => (
                            <div className='flex justify-between items-center w-full gap-5' key={i}>
                                <span className='py-2'>{item.name}</span>
                                <span className='py-2' onClick={() => removeFile(i)}>
                                    {CrossIcon}
                                </span>
                            </div>
                        ))}
                        <div className='mx-auto'>
                            <button
                                disabled={buttonDisable}
                                className={`${
                                    buttonDisable
                                        ? 'text-[#66666d] bg-[#dddde0] text-sm'
                                        : 'text-white bg-[#048C8C] hover:bg-[#048C6D]'
                                }  py-3 px-6 rounded`}
                                type='submit'
                                onClick={e => {
                                    setButtonDisable(true)
                                    setFileUploadButton(true)
                                    uploadFiles(e)
                                }}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <EmptyTable cols={6} msg='User do not have the required permissions ' />
            )}
        </div>
    )
}

export default JobsUploader
