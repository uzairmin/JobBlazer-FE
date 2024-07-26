import { memo, useState, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import useSWR from 'swr'

import { Loading, SelectBox } from '@components'

import { Filters, Leads, WarmLeads, TechStacks, JobStats, LeadsAnalytics } from '@modules/dashboard/components'
import { fetchDashboardData } from '@modules/dashboard/api'
import { fetchCompanies } from '@modules/userManagement/api'

import { can, decodeJwt, isSuper, parseComapnies, parseSelectedCompany } from '@utils/helpers'
import { TECH_STACKS_RANDOM_MAX } from '@constants/dashboard'

const Dashboard = () => {
    const user = decodeJwt()
    if (user.role === 'candidate') {
        return <Navigate to='/my-profile' />
    }
    const [filters, setFilters] = useState({ from_date: '', to_date: '', company: '' })
    const { data, error, isLoading } = useSWR([filters], () => fetchDashboardData(filters), {
        revalidateOnFocus: false,
    })
    const {
        data: fetchedCompanies,
        error: companyError,
        isLoading: companyLoading,
    } = useSWR(`/api/auth/company/`, isSuper() && fetchCompanies, {
        revalidateOnFocus: false,
    })

    const memoizedCompaniesSelect = useMemo(
        () =>
            isSuper() &&
            (companyLoading ? (
                <small className='ml-1 p-3 text-xs text-gray-400'>Companies Loading...</small>
            ) : companyError ? (
                <div>Failed to load companies</div>
            ) : (
                <SelectBox
                    options={parseComapnies(fetchedCompanies?.companies)}
                    selected={parseSelectedCompany(filters.company, fetchedCompanies?.companies)}
                    handleChange={({ value }) => setFilters({ ...filters, company: value })}
                    classes='text-gray-500 text-sm mt-2 w-full'
                />
            )),
        [companyLoading, companyError, fetchedCompanies?.companies, filters.company]
    )

    if (isLoading || companyLoading) return <Loading />

    return user?.permissions?.length > 0 ? (
        can(['view_dashboard', 'view_statistics']) ? (
            <div>
                {!error ? (
                    <div className='flex flex-col'>
                        <div className='flex flex-col pb-4'>
                            <div className='w-full'>
                                {can('view_statistics') && data?.statistics && (
                                    <LeadsAnalytics classes='flex-col space-y-8' data={data?.statistics} />
                                )}
                                <div className='flex flex-row items-end float-right space-x-3 mr-4'>
                                    <Filters filters={filters} setFilters={setFilters} />
                                    {memoizedCompaniesSelect}
                                </div>
                            </div>
                        </div>
                        {isSuper() && <JobStats />}
                        {can('view_dashboard') && (
                            <div className='flex flex-col  space-y-7 md:space-y-16 mt-10'>
                                {data?.leads && data?.leads?.length > 0 && (
                                    <Leads data={data?.leads} stats={data?.statistics} />
                                )}
                                {data?.tech_jobs?.length > 0 && data?.tech_jobs?.length < TECH_STACKS_RANDOM_MAX && (
                                    <TechStacks data={data?.tech_jobs} />
                                )}
                                {data?.leads && data?.leads?.length > 0 && <WarmLeads data={data?.leads} />}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className='mx-auto'>No Graphs or data Found!</p>
                )}
            </div>
        ) : (
            <div className='flex flex-col w-full space-y-14'>
                <p className='mx-auto mt-10 italic'>You don`t have permission to view dashboard and statistics.</p>
            </div>
        )
    ) : (
        <div className='flex flex-col w-full space-y-14'>
            <p className='mx-auto mt-10 italic text-lg'>You don`t have any permission. Please contact your admin.</p>
        </div>
    )
}

export default memo(Dashboard)
