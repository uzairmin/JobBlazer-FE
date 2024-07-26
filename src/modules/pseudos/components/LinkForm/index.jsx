import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, CustomSelector } from '@components'

import { saveLink } from '@modules/pseudos/api'

import { parsePlatform } from '@utils/helpers'
import { linkSchema } from '@utils/schemas'
import { SOCIAL_PLATFORM_OPTIONS } from '@constants/pseudos'

const LinkForm = ({ show, setShow, mutate, link, id }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange, setFieldValue } = useMutate(
        `/api/profile/links${link?.id ? `/${link?.id}/` : '/'}`,
        saveLink,
        { vertical_id: id, url: link?.url || '', platform: link?.platform || '' },
        linkSchema,
        async formValues => trigger({ ...formValues, id: link?.id }),
        null,
        () => {
            mutate()
            if (!link?.id) resetForm()
        }
    )
    const flag = values.platform.length > 0 && values.url.length > 0

    return (
        <Drawer show={show} setShow={setShow} w='450px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{link?.id ? 'Edit' : 'Create'} Link</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Platform*</span>
                    <CustomSelector
                        options={SOCIAL_PLATFORM_OPTIONS}
                        selectorValue={parsePlatform(values.platform)}
                        handleChange={({ value }) => setFieldValue('platform', value)}
                        placeholder='Select platform'
                    />
                    {errors.platform && <small className='__error'>{errors.platform}</small>}
                    <span className='text-xs font-semibold'>URL*</span>
                    <Input type='url' name='url' value={values.url} onChange={handleChange} ph='Enter url name' />
                    {errors.url && <small className='__error'>{errors.url}</small>}
                    <div className='pt-4 flex gap-2'>
                        {flag && <Button label={link?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(LinkForm)
