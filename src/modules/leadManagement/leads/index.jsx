import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Board, Loading, Searchbox, Button, Paginated } from '@components'

import { LeadCard, LeadModal, LeadSearchAndFilters } from '@modules/leadManagement/components'
import { fetchLeads, changeLeadStatus } from '@modules/leadManagement/api'

import { getSelectedVals } from '@utils/helpers'
import { LEADS_INITIAL_VALS } from '@constants/leadManagement'

import { CandidateFilterIcon } from '@icons'

const Leads = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), LEADS_INITIAL_VALS)

    const { data, isLoading, error, mutate } = useSWR(
        `/api/lead_managament/leads/?search=${vals.query}&page=${vals.page}&from=${vals.from}&to=${
            vals.to
        }&team=${getSelectedVals(vals?.team)}&members=${getSelectedVals(vals.members)}&stacks=${getSelectedVals(
            vals.stacks
        )}&candidates=${getSelectedVals(vals.candidates)}`,
        fetchLeads,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            revalidateOnMount: true,
        }
    )

    const convertToColumns = columns =>
        columns.reduce((acc, row) => {
            acc[row.id] = {
                name: row?.status?.toUpperCase(),
                items: row?.leads?.map(lead => ({
                    id: lead?.id,
                    content: <LeadCard lead={lead} dispatch={dispatch} />,
                })),
            }
            return acc
        }, {})

    const { handleSubmit, trigger } = useMutate(
        `/api/lead_managament/leads/${vals.draggable}/`,
        changeLeadStatus,
        {},
        null,
        async () => trigger({ status: vals.destination }),
        null,
        () => mutate()
        // () => setTimeout(() => window.location.reload(), 1000)
    )
    const clearFilters = () => {
        mutate({ url: `/api/lead_managament/leads/?search=&page=1` })
        dispatch({ filter: false, to: '', from: '', members: [], stacks: [], team: '', candidates: [] })
    }

    return isLoading ? (
        <Loading />
    ) : !error ? (
        <>
            {vals.draggable && <LeadModal vals={vals} dispatch={dispatch} refetch={mutate} />}
            <div className='flex flex-col gap-3'>
                <LeadSearchAndFilters filtered={vals} dispatch={dispatch} />
                {data?.pages > 1 && (
                    <Paginated
                        pages={data?.pages ?? Math.ceil(data.total / 25)}
                        setPage={page => dispatch({ page })}
                        page={vals.page}
                    />
                )}
                {data?.leads?.length > 0 ? (
                    <Board data={convertToColumns(data?.leads)} set={dispatch} handleDrag={handleSubmit} />
                ) : (
                    <span className='mx-7 text-lg italic font-light'>No leads found yet</span>
                )}
            </div>
        </>
    ) : (
        <span>Some gone wrong while fetching leads</span>
    )
}
export default memo(Leads)
