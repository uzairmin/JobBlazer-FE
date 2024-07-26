import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, CustomSelector } from '@components'

import { saveDesignation } from '@modules/leadManagement/api'

import { parseComapnies } from '@utils/helpers'

const ExposedTeamForm = ({ candidates = [], companies = [], selectedCompanies = [], dispatch = null, mutate }) => {
    const { handleSubmit, trigger } = useMutate(
        `/api/candidate_management/team_exposed/`,
        saveDesignation,
        { company_ids: selectedCompanies, team_ids: candidates },
        null,
        async formValues => trigger({ ...formValues, company_ids: selectedCompanies.map(({ value }) => value) }),
        null,
        () => {
            mutate()
            dispatch({ ids: [], selectedCompanies: [] })
        }
    )

    return (
        <form onSubmit={handleSubmit} className='grid grid-flow-col'>
            <div className='flex items-center gap-x-3'>
                <div className='w-full md:w-96'>
                    <CustomSelector
                        name='members'
                        options={parseComapnies(companies)}
                        handleChange={obj => dispatch({ selectedCompanies: obj })}
                        selectorValue={selectedCompanies}
                        isMulti
                        placeholder='Select companies'
                    />
                </div>
                {selectedCompanies.length > 0 && candidates.length > 0 && (
                    <>
                        <Button label='Expose' type='submit' fill fit />
                        <Button label='Clear' fit onClick={() => dispatch({ ids: [] })} />
                    </>
                )}
            </div>
        </form>
    )
}

export default memo(ExposedTeamForm)
