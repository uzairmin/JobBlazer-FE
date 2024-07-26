import { memo } from 'react'
import toast from 'react-hot-toast'

import { useDelete } from '@/hooks'

import { Button } from '@components'

import { getMsg } from '@utils/helpers'

const DeleteDialog = ({
    children,
    url,
    show,
    text = 'Are you sure you want to delete this item?',
    title = ' Confirm Delete',
    setShow,
    refetch,
    perm = null,
}) => {
    const { wait, confirm, err } = useDelete(url)
    const allowDeletion = import.meta.env.VITE_DELETE_ACTION_ALLOWED === 'true'
    return (
        (perm ?? allowDeletion) && (
            <>
                {children}
                {show && (
                    <div className='fixed z-10 inset-0 overflow-y-auto'>
                        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                            <div className='fixed inset-0 transition-opacity'>
                                <div
                                    className='absolute inset-0 backdrop-blur-[5px] bg-[rgba(0,0,0,0.3)] transition-[background-color] duration-[0.5s]'
                                    onClick={() => setShow(false)}
                                />
                            </div>
                            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' />
                            &#8203;
                            <div
                                className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                                role='dialog'
                                aria-modal='true'
                                aria-labelledby='modal-headline'
                            >
                                <div>
                                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                        <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                                            {title}
                                        </h3>
                                        <div className='mt-2'>
                                            <p className='text-sm leading-5 text-gray-500'>{text}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-5 sm:mt-6'>
                                    <span className='flex w-full rounded-md shadow-sm gap-4 sm:w-auto'>
                                        <Button label='Cancel' full onClick={() => setShow(false)} />
                                        <Button
                                            classes={
                                                wait
                                                    ? ''
                                                    : 'border-red-500 bg-red-500 hover:bg-red-600 hover:border-red-600'
                                            }
                                            label={wait ? 'Deleting...' : 'Confirm'}
                                            fill
                                            onClick={() => {
                                                confirm().then(() => {
                                                    if (!err) {
                                                        refetch()
                                                    } else {
                                                        toast.error(getMsg(err))
                                                    }
                                                    setShow(false)
                                                })
                                            }}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    )
}

export default memo(DeleteDialog)
