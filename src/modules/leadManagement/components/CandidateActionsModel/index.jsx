import { memo } from 'react'

import { Button, Modal } from '@components'

const CandidateActionsModel = ({ show, setShow, message, handleSubmit }) => (
    <Modal
        classes='!w-1/3'
        show={show}
        setShow={setShow}
        content={
            <div className='w-full'>
                <h3 className='mt-1'>{message}</h3>
                <div className='flex items-center mt-3 gap-3 float-right'>
                    <Button
                        classes='bg-red-500 border-red-500 hover:bg-red-600'
                        label='Confirm'
                        fill
                        onClick={() => {
                            handleSubmit()
                            setShow(false)
                        }}
                    />
                    <Button label='Cancel' onClick={() => setShow(false)} />
                </div>
            </div>
        }
    />
)
export default memo(CandidateActionsModel)
