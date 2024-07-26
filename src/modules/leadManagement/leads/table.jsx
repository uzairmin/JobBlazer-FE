import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { EmptyTable, Loading, Paginated, Badge } from '@components'

import { LeadActions, LeadModal, LeadSearchAndFilters } from '@modules/leadManagement/components'
import { fetchLeadsData } from '@modules/leadManagement/api'

import { formatDate2, getSelectedVals } from '@utils/helpers'
import { LEADS_INITIAL_VALS, LEAD_HEADS } from '@constants/leadManagement'

const LeadsTable = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), LEADS_INITIAL_VALS)
    const { data, isLoading, error, mutate } = useSWR(
        `/api/lead_managament/leads_data/?search=${vals.query}&page=${vals.page}&from=${vals.from}&to=${
            vals.to
        }&team=${getSelectedVals(vals?.team)}&members=${getSelectedVals(vals.members)}&stacks=${getSelectedVals(
            vals.stacks
        )}&candidates=${getSelectedVals(vals.candidates)}&status=${vals.statusFilter}`,
        fetchLeadsData,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            revalidateOnMount: true,
        }
    )
    return isLoading ? (
        <Loading />
    ) : !error ? (
        <div className=''>
            {vals.draggable && <LeadModal vals={vals} dispatch={dispatch} refetch={mutate} />}
            <div className='flex flex-col gap-3 px-4'>
                <LeadSearchAndFilters filtered={vals} dispatch={dispatch} />
                <div className='overflow-x-auto'>
                    <table className='table-auto w-full overflow-y-auto max-h-[500px] text-sm text-left text-[#048C8C]'>
                        <thead className='text-xs uppercase border border-[#048C8C]'>
                            <tr>
                                {LEAD_HEADS.map(heading => (
                                    <th scope='col' className='px-3 py-4' key={heading}>
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.leads?.length > 0 && !error ? (
                                data?.leads?.map((row, idx) => (
                                    <tr
                                        className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'
                                        key={row.id}
                                    >
                                        <td className='px-3 py-4 w-10'>{idx + 1}</td>
                                        <td className='px-3 py-4 sm:w-1/5'>{row?.applied_job?.title || '-'}</td>
                                        <td className='px-3 py-4 sm:w-1/6'>{row?.applied_job?.company || '-'}</td>
                                        <td className='px-3 py-4 capitalize italic sm:w-1/5'>
                                            {row?.applied_job?.applied_by?.name || '-'}
                                        </td>
                                        <td className='px-3 py-4 capitalize font-semibold sm:w-1/6'>
                                            {row?.applied_job?.vertical_name || '-'}
                                        </td>
                                        <td className='px-3 py-4 capitalize font-semibold italic sm:w-1/6'>
                                            {row?.candidate?.name || '-'}
                                        </td>
                                        <td className='px-3 py-4'>
                                            <Badge label={row?.applied_job?.tech_stack || '-'} />
                                        </td>
                                        <td className='px-3 py-4'>
                                            <Badge
                                                label={row?.status?.name || '-'}
                                                classes='!font-semibold !bg-green-100 !text-green-700 border border-green-500'
                                            />
                                        </td>
                                        <td className='px-3 py-4'>{row?.phase?.name || '-'}</td>
                                        <td className='px-3 py-4'>{formatDate2(row?.created_at)}</td>
                                        <td className='px-3 py-4'>{formatDate2(row?.updated_at)}</td>
                                        <td className='px-3 py-4 text-right'>
                                            <LeadActions lead={row} dispatch={dispatch} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <EmptyTable cols={8} msg='No leads found yet' />
                            )}
                        </tbody>
                    </table>
                </div>
                {data?.pages > 1 && (
                    <Paginated
                        pages={data?.pages ?? Math.ceil(data.total / 25)}
                        setPage={page => dispatch({ page })}
                        page={vals.page}
                    />
                )}
            </div>
        </div>
    ) : (
        <span className='m-10 italic'>Something gone wrong while fetching leads</span>
    )
}
export default memo(LeadsTable)
