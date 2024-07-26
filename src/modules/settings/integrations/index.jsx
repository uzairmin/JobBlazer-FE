import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Badge, Searchbox, EmptyTable, Button } from '@components'

import { IntegrationForm, FilterForm } from '@modules/settings/components'
import { fetchIntegrations } from '@modules/settings/api'

import { integrations_head, apiStatus } from '@constants/settings'
import { CreateIcon, ActionsIcons } from '@icons'
import { can, decodeJwt, isSuper } from '@/utils/helpers'

const Integrations = () => {
    const loggedUser = decodeJwt()
    const [query, setQuery] = useState()
    const [filters, setfilters] = useState({ companies: isSuper() ? [] : [loggedUser?.company], integrations: [] })
    const [integration, setIntegration] = useState()
    const [mutateShow, setMutateShow] = useState(false)
    const [filterShow, setFilterShow] = useState(false)
    const seletedCompanies = filters.companies.map(r => r.value).toString()
    const seletedIntegrations = filters.integrations.map(r => r.value).toString()
    const { data, error, isLoading, mutate } = useSWR(
        `/api/auth/integration/?companies=${seletedCompanies}&integrations=${seletedIntegrations}`,
        fetchIntegrations
    )
    const handleMutate = ({ name, status, company, api_key, id }) => {
        setIntegration({ name, status, company, api_key, id })
        setMutateShow(!mutateShow)
    }
    const handleFilter = () => {
        setFilterShow(!filterShow)
    }
    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox
                    query={query}
                    setQuery={setQuery}
                    apply={() => handleFilter({ name: '', status: true, user: '' })}
                    clear={() => setfilters({ companies: [], integrations: [] })}
                />
                {can('create_integration') && (
                    <Button
                        label='Add Integration'
                        fit
                        icon={CreateIcon}
                        onClick={() => handleMutate({ name: '', status: true, company: '', api_key: '' })}
                    />
                )}
            </div>
            <table className='table-auto w-full  text-sm text-left text-[#048C8C] '>
                <thead className='text-xs uppercase border border-[#048C8C] '>
                    <tr>
                        {integrations_head.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.integrations?.length > 0 && !error ? (
                        data.integrations.map((comp, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={comp.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{comp.company?.name}</td>
                                <td className='px-3 py-6'>{comp?.name}</td>
                                <td className='px-1 py-6'>
                                    <Badge
                                        label={apiStatus[comp?.status ? 0 : 1]}
                                        type={comp?.status ? 'enabled' : 'disabled'}
                                    />
                                </td>
                                <td className='px-3 py-6 float-right' onClick={() => handleMutate(comp)}>
                                    {can('edit_integration') && ActionsIcons}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No company integrations found yet!' />
                    )}
                </tbody>
            </table>
            {mutateShow && can('edit_integration') && (
                <IntegrationForm
                    show={mutateShow}
                    setShow={setMutateShow}
                    mutate={mutate}
                    integration={integration}
                    data={data}
                />
            )}
            {filterShow && (
                <FilterForm show={filterShow} setShow={setFilterShow} filters={filters} setfilters={setfilters} />
            )}
        </div>
    )
}

export default memo(Integrations)
