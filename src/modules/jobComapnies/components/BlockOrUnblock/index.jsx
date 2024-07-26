import { memo, useState } from 'react'

import { useMutate } from '@/hooks'

import { Button, Modal, Tooltip } from '@components'

import { changeJobCompanyStatus } from '@modules/jobComapnies/api'

import { can } from '@utils/helpers'

import { BlockJobCompanyIcon, UnblockJobCompanyIcon } from '@icons'

const BlockOrUnblock = ({ row, mutate }) => {
    const [show, setShow] = useState(false)

    const { handleSubmit, trigger } = useMutate(
        '/api/job_portal/all_job_companies/',
        changeJobCompanyStatus,
        { is_block: !row?.is_block, company_name: row?.company },
        null,
        async formValues => trigger({ ...formValues }),
        null,
        () => mutate()
    )

    return (
        <div className='absolute top-0 right-0 pl-2 flex'>
            {can('block_unblock_job_company') && (
                <Tooltip text={`${row?.is_block ? 'Unblock' : 'Block'} Company`}>
                    <Button
                        classes='_icon-btn'
                        icon={row?.is_block ? UnblockJobCompanyIcon : BlockJobCompanyIcon}
                        onClick={() => setShow(true)}
                    />
                </Tooltip>
            )}
            <Modal
                classes='!w-1/3'
                show={show}
                setShow={setShow}
                content={
                    <div className='w-full'>
                        <h3 className='mt-1'>
                            Are you sure to {row?.is_block ? 'unblock' : 'block'} this company named
                            <span className='font-bold ml-2 uppercase'>{row?.company}</span>?
                        </h3>
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
        </div>
    )
}

export default memo(BlockOrUnblock)
