import { CloseIcon } from '@/assets/icons'
import { memo, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ children, content, show, setShow, classes = null }) => {
    useEffect(() => {
        const dialogWrapper = document.createElement('div')
        document.body.appendChild(dialogWrapper)
        return () => {
            document.body.removeChild(dialogWrapper)
        }
    }, [])

    return (
        <>
            {children}
            {show &&
                ReactDOM.createPortal(
                    <div className='fixed z-20 inset-0 overflow-y-auto'>
                        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                            <div className='fixed inset-0 transition-opacity'>
                                <div className='absolute inset-0 backdrop-blur-[5px] bg-[rgba(0,0,0,0.3)] transition-[background-color] duration-[0.5s]' />
                            </div>
                            <span className='hidden sm:inline-block sm:align-middle' />
                            &#8203;
                            <div
                                className={`mt-8 inline-block align-bottom bg-white rounded-lg px-4 pb-4 text-left overflow-y-scroll shadow-xl transform transition-all sm:align-middle md:w-[80%] w-full ${classes}`}
                                role='dialog'
                                aria-modal='true'
                                aria-labelledby='modal-headline'
                            >
                                <span onClick={() => setShow(false)} className='float-right cursor-pointer pt-3'>
                                    {CloseIcon}
                                </span>
                                <div className='mt-6'>
                                    <span className='flex w-full sm:w-auto overflow-y-scroll min-h-fit max-h-[85vh]'>
                                        {content}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    )
}

export default memo(Modal)
