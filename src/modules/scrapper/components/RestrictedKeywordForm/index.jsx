import { memo } from 'react'

import { useMutate } from '@/hooks'

import { useResctrictedKeywordsStore } from '@/stores'

import { Button, Drawer, Input } from '@components'

import { saveRestrictedKeyword } from '@modules/scrapper/api'

import { resctrictedKeywordSchema } from '@utils/schemas'

const RestrictedKeywordForm = ({ refetch = null }) => {
    const [keyword, show, setShow] = useResctrictedKeywordsStore(state => [state?.keyword, state?.show, state?.setShow])

    console.log(keyword)

    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/job_scraper/restricted_keywords${keyword?.id ? `/${keyword?.id}/` : '/'}`,
        saveRestrictedKeyword,
        { tag: keyword?.tag || '' },
        resctrictedKeywordSchema,
        async formValues => trigger({ ...formValues, id: keyword?.id }),
        null,
        () => {
            if (refetch) refetch()
            if (!keyword?.id) {
                resetForm()
            } else {
                setShow(false)
            }
        }
    )

    return (
        <Drawer
            show={show}
            setShow={setShow}
            w='350px'
            dir='bottom'
            header={`${keyword?.id ? 'Edit' : 'Create'} Restricted Keyword`}
        >
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <span className='text-xs font-semibold'>Keyword*</span>
                    <Input name='tag' value={values.tag} onChange={handleChange} ph='Enter Restricted Keyword' />
                    {errors.tag && <small className='__error'>{errors.tag}</small>}
                    <div className='pt-4 flex gap-2'>
                        {values.tag.length > 0 && (
                            <Button label={keyword?.id ? 'Update' : 'Submit'} type='submit' fill />
                        )}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(RestrictedKeywordForm)
