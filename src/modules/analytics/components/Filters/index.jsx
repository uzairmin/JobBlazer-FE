import { memo, useReducer } from 'react'

import { Button } from '@components'

import { DateRange, ExportAll, FilterOptions, FilterTypes, OtherFilters } from '@modules/analytics/components'

import { DEFAULT_FILTER_VALS } from '@constants/analytics'

import { DateTimeIcon, CandidateFilterIcon, ResetFilterIcon } from '@icons'

const Filters = ({ values, set, data = null }) => {
    const [vals, update] = useReducer((state, newState) => ({ ...state, ...newState }), {
        from: values?.from,
        to: values?.to,
        year: values?.year,
        month: values?.month,
        week: values?.week,
        quarter: values?.quarter,
        query: values?.query,
        percent: values?.percent,
        minimum: values?.minimum,
        excluded: values?.excluded || [],
        tab: values?.tab || 'custom',
    })
    const applyFilters = () =>
        set({
            from: vals.from,
            to: vals.to,
            query: vals.query,
            year: vals.year,
            month: vals.month,
            week: vals.week,
            quarter: vals.quarter,
            tab: vals.tab,
            percent: vals.percent,
            minimum: vals.minimum,
            excluded: vals.excluded,
        })
    const clearFilters = () => {
        set({ query: '', percent: '', minimum: '', filter: false, bar: 'total', excluded: [], ...DEFAULT_FILTER_VALS })
        update({ query: '', percent: '', minimum: '', excluded: [], ...DEFAULT_FILTER_VALS })
    }
    return (
        <div className='text-[#1E6570]'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0'>
                <DateRange start={data?.start_date} end={data?.end_date} />
                <div className='flex flex-wrap gap-3'>
                    <Button
                        icon={CandidateFilterIcon}
                        label='Date Filters'
                        onClick={() => set({ filter: !values.filter })}
                        fit
                        fill={values.filter}
                        classes='!gap-1 !px-3 !rounded-full'
                    />
                    <OtherFilters values={vals} update={update} apply={applyFilters} />
                    {(values.from ||
                        values.to ||
                        values.query ||
                        values.year ||
                        values.month ||
                        values.week ||
                        values.quarter ||
                        values.percent ||
                        values.minimum ||
                        values?.excluded?.length > 0) && (
                        <Button
                            onClick={clearFilters}
                            label='Clear Filters'
                            fit
                            classes='!pl-2 !pr-3 !gap-1 !rounded-full !text-gray-700 bg-slate-200 !border-slate-400 hover:!bg-slate-300 hover:!text-black'
                            icon={ResetFilterIcon}
                        />
                    )}
                    <ExportAll />
                </div>
            </div>
            {values.filter && (
                <div className='border px-2 pt-9 text-[#1E6570] mt-10 relative'>
                    <FilterTypes vals={vals} update={update} />
                    <div className='flex flex-wrap items-end gap-2 md:gap-4 pb-3 px-2'>
                        <FilterOptions vals={vals} update={update} />
                        <Button onClick={applyFilters} label='Apply' classes='md:!py-2.5 w-max' icon={DateTimeIcon} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(Filters)
