import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Badge, Searchbox, EmptyTable, Filters, Button } from '@components'

import { CompanyForm } from '@modules/userManagement/components'
import { fetchCompanies, fetchBlacklistCompanies } from '@modules/userManagement/api'

import { blockedSourceHeads, comapnyStatus } from '@constants/userManagement'

import { CreateIcon, ActionsIcons } from '@icons'

const JobSourceBlocking = () => {
    const [query, setQuery] = useState()
    const [company, setCompany] = useState()
    const [show, setShow] = useState(false)
    // const { data, error, isLoading, mutate } = useSWR('/api/auth/company/', fetchAllCompanies)
    const { data, error, isLoading, mutate } = useSWR('/api/job_portal/blacklist/jobs/', fetchBlacklistCompanies)
    const handleClick = ({ name, status, id }) => {
        setCompany({ name, status, id })
        setShow(!show)
    }
    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={query} setQuery={setQuery} />
                <Filters />
                <Button
                    label='Block Company'
                    fitMdOutlineSettingsInputCoongamepaddisconnected
                    icon={CreateIcon}
                    onClick={() => handleClick({ name: '', status: true })}
                />
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {blockedSourceHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.job_source?.length > 0 ? (
                        data.job_source.map((comp, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={idx}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{comp}</td>
                                <td className='px-1 py-6'>
                                    <Badge
                                        label={comapnyStatus[comp?.status ? 0 : 1]}
                                        type={comp?.status ? 'enabled' : 'disabled'}
                                    />
                                </td>
                                <td className='px-3 py-6 float-right' onClick={() => handleClick(comp)}>
                                    {ActionsIcons}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No companies found yet!' />
                    )}
                </tbody>
            </table>
            {show && <CompanyForm show={show} setShow={setShow} mutate={mutate} company={company} />}
        </div>
    )
}

export default memo(JobSourceBlocking)
