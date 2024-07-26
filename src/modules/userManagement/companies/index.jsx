import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Badge, Searchbox, EmptyTable, Button } from '@components'

import { CompanyForm } from '@modules/userManagement/components'
import { fetchCompanies } from '@modules/userManagement/api'

import { comapnyHeads, comapnyStatus } from '@constants/userManagement'

import { CreateIcon, ActionsIcons } from '@icons'
import { can } from '@/utils/helpers'

const Companies = () => {
    const [query, setQuery] = useState('')
    const [company, setCompany] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/auth/company/?search=${query}`, fetchCompanies)

    const handleClick = ({ name, status, id }) => {
        setCompany({ name, status, id })
        setShow(!show)
    }

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={query} setQuery={setQuery} />
                {can('create_company') && (
                    <Button
                        label='Create Company'
                        fit
                        icon={CreateIcon}
                        onClick={() => handleClick({ name: '', status: true })}
                    />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {comapnyHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.companies?.length > 0 && !error ? (
                        data.companies.map((comp, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={comp.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{comp?.name}</td>
                                <td className='px-3 py-6'>{comp?.code}</td>
                                <td className='px-1 py-6'>
                                    <Badge
                                        label={comapnyStatus[comp?.status ? 0 : 1]}
                                        type={comp?.status ? 'enabled' : 'disabled'}
                                    />
                                </td>
                                <td className='px-3 py-6 float-right' onClick={() => handleClick(comp)}>
                                    {can('edit_company') && ActionsIcons}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No companies found yet!' />
                    )}
                </tbody>
            </table>
            {show && can('edit_company') && (
                <CompanyForm show={show} setShow={setShow} mutate={mutate} company={company} />
            )}
        </div>
    )
}

export default memo(Companies)
