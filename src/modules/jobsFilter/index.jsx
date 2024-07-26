import { useState, memo, useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { useJobPortalFiltersStore, useVisitedJobsStore } from '@/stores'

import { Paginated, CustomDilog, EmptyTable, Loading, CustomSelector, Filters, Checkbox } from '@components'

import { fetchJobs, downloadJobsData, updateRecruiterStatus } from '@modules/jobsFilter/api'
import {
    EditJobForm,
    JobActions,
    JobPortalAnalytics,
    JobPortalSearchBox,
    Selector,
    JobShow,
} from '@modules/jobsFilter/components'

import { can, formatDate, checkToken, formatStringInPascal } from '@utils/helpers'
import { baseURL } from '@utils/http'
import { JOB_HEADS } from '@constants/jobPortal'

const JobsFilter = memo(() => {
    const gsm = useJobPortalFiltersStore(state => state)
    const [setVisitedJobs, inVisitedJobs] = useVisitedJobsStore(state => [state.setVisitedJobs, state.inVisitedJobs])

    const apiUrl = `${baseURL}api/job_portal/`
    const [data, setData] = useState([])
    const [currentCompany, setCurrentCompany] = useState([])
    const [pagesCount, setPagesCount] = useState([])
    const jobDetailsUrl = `${apiUrl}job_details/`

    const [job, setJob] = useReducer((prev, next) => ({ ...prev, ...next }), { show: false, data: {} })

    const defaultFilterState = {
        techStacData: [],
        jobSourceData: [],
        jobTypeData: [],
        techStackSelector: [],
        jobSourceSelector: [],
        jobTypeSelector: 'all',
        jobVisibilitySelector: 'all',
        stats: {
            total_job: '0',
            filtered_job: '0',
            recruiter_job: '0',
            non_recruiter_job: '0',
            today_uploaded_job: 0,
        },
        jobStatusChoice: {},
        dates: { from_date: '', to_date: '' },
        jobTitle: '',
        techStackData: [],
        ordering: '-job_posted_date',
        showCoverLetter: false,
        isLoading: true,
        blocked: false,
    }

    const [filterState, setFilterState] = useState(defaultFilterState)

    const navigate = useNavigate()
    const error = true

    const getJobsParamsFromFilters = () => {
        const {
            jobSourceSelector,
            jobTypeSelector,
            ordering,
            jobVisibilitySelector,
            dates,
            techStackSelector,
            blocked,
            jobTitle,
            page,
        } = gsm
        const { from_date, to_date } = dates
        const tech_keywords = techStackSelector.map(obj => obj.value).join(',')
        const selected_job_sources = jobSourceSelector.map(obj => obj.value).join(',')
        return {
            tech_keywords,
            job_source: selected_job_sources,
            ordering,
            page,
            job_visibility: jobVisibilitySelector,
            from_date,
            to_date,
            job_type: jobTypeSelector !== 'all' ? jobTypeSelector : '',
            search: jobTitle,
            blocked,
        }
    }

    const generateParamsString = () => {
        const params_list = getJobsParamsFromFilters()
        const params = new URLSearchParams()
        let params_count = 0

        Object.entries(params_list).forEach(([key, value]) => {
            params.append(key, value)
            params_count++
        })
        return params_count > 0 ? params.toString() : ''
    }

    const updateSelectorCount = (selector, new_count_list) =>
        selector
            .map(({ value }) => {
                const updated_count = new_count_list.find(item => item.name === value)
                return (
                    updated_count && {
                        label: `${updated_count.name} (${updated_count.value})`,
                        value: updated_count.name,
                    }
                )
            })
            .filter(Boolean)

    const fetchJobsData = async url => {
        setFilterState(prevFilters => ({ ...prevFilters, isLoading: true }))
        setData([])
        const {
            jobsData,
            status,
            total_jobs,
            filtered_jobs,
            recruiter_jobs,
            non_recruiter_jobs,
            today_uploaded_jobs,
            job_status_choice,
            tech_keywords_count_list,
            job_source_count_list,
            total_job_type,
            num_pages,
            detail,
        } = await fetchJobs(`${url}?${generateParamsString()}`)
        const { techStackSelector, jobSourceSelector } = filterState
        if (status === 'success') {
            setFilterState({
                ...filterState,
                stats: {
                    total_job: total_jobs,
                    filtered_job: filtered_jobs,
                    non_recruiter_job: non_recruiter_jobs,
                    recruiter_job: recruiter_jobs,
                    today_uploaded_job: today_uploaded_jobs,
                },
                jobStatusChoice: job_status_choice,
                techStackData: tech_keywords_count_list,
                jobSourceData: job_source_count_list,
                jobTypeData: total_job_type,
                isLoading: false,
                techStackSelector: updateSelectorCount(techStackSelector, tech_keywords_count_list),
                jobSourceSelector: updateSelectorCount(jobSourceSelector, job_source_count_list),
            })
            setData(jobsData)
            setPagesCount(num_pages)
        } else {
            toast.error(detail)
            setFilterState({ ...filterState, isLoading: false })
        }
    }

    const updateParams = () => {
        gsm?.setPage(1)
        fetchJobsData(jobDetailsUrl)
    }

    const resetFilters = () => {
        gsm?.reset()
        setData([])
        setFilterState(defaultFilterState)
        fetchJobsData(jobDetailsUrl)
    }

    useEffect(() => {
        fetchJobsData(jobDetailsUrl)
    }, [gsm?.page])

    const changeRecruiter = async (company, func) => {
        const { status, detail } = await updateRecruiterStatus(`${apiUrl}company/blacklist/${func}`, company)
        if (status === 'success') {
            fetchJobsData(jobDetailsUrl)
            toast.success(detail)
        } else {
            toast.error(detail)
        }
    }

    const formatOptions = options_arr =>
        options_arr?.map(({ name, value }) => ({ label: `${name} (${value})`, value: name }))

    const { CustomModal, openModal } = CustomDilog(
        'Please Confirm ',
        'Are you sure you want to change the state of recruiter',
        () => {
            checkToken()
            changeRecruiter(currentCompany[0], currentCompany[1])
        },
        'success'
    )

    const handleJobDetails = jobDetail => {
        gsm?.setId(jobDetail?.id)
        // navigate(`/job-details/${jobDetail.id}`, {
        //     state: {
        //         data: jobDetail,
        //         title: 'Job Details',
        //     },
        // })
    }

    if (filterState?.isLoading) return <Loading />
    return (
        <div className='text-[#048C8C] px-2'>
            <div className='flex flex-col items-center mb-4 transform scale-[85%]'>
                <JobPortalAnalytics
                    job_sources={[
                        { type: 'Filtered', count: filterState?.stats?.filtered_job },
                        { type: 'Recruiters', count: filterState?.stats?.recruiter_job },
                        { type: 'Non Recruiters', count: filterState?.stats?.non_recruiter_job },
                        { type: "Today's Jobs", count: filterState?.stats?.today_uploaded_job },
                    ]}
                    total={filterState?.stats?.total_job}
                />
            </div>
            <div className='px-8 border bg-slate-100 rounded-3xl py-2'>
                <div className='flex items-center py-2 justify-between mt-2'>
                    <JobPortalSearchBox
                        value={gsm?.jobTitle}
                        handleEnter={e => {
                            if (e.key === 'Enter') {
                                updateParams()
                            }
                        }}
                        setQuery={title => gsm?.setJobTitle(title)}
                    />
                    <button
                        className='bg-[#10868a] hover:bg-[#209fa3] text-[#ffffff]  py-2 px-3 rounded inline-flex items-center'
                        onClick={() =>
                            downloadJobsData(
                                `${jobDetailsUrl}?${generateParamsString(getJobsParamsFromFilters())}&download=true`
                            )
                        }
                    >
                        Download CSV
                    </button>
                </div>
                <div className='grid grid-cols-3 my-2 gap-3'>
                    <div className='grid grid-cols-2  gap-3'>
                        <div className='my-2'>
                            From
                            <input
                                className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                                type='date'
                                max={new Date().toISOString().slice(0, 10)}
                                value={gsm?.dates?.from_date}
                                onChange={event => gsm?.setDates(event.target.value, 'from_date')}
                            />
                        </div>
                        <div className='my-2'>
                            To
                            <input
                                className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                                type='date'
                                max={new Date().toISOString().slice(0, 10)}
                                value={gsm?.dates?.to_date}
                                onChange={event => gsm?.setDates(event.target.value, 'to_date')}
                            />
                        </div>
                    </div>
                    <div className='my-2'>
                        Listings
                        <Selector
                            data={filterState?.jobTypeData}
                            selectorValue={gsm?.jobTypeSelector}
                            handleSelectChange={e => gsm?.setJobType(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        Job Source
                        <CustomSelector
                            className='mx-auto'
                            options={formatOptions(filterState?.jobSourceData)}
                            handleChange={value => gsm?.setJobSources(value)}
                            selectorValue={gsm?.jobSourceSelector}
                            isMulti
                            placeholder='Select Job Source'
                        />
                    </div>
                    <div className='my-2'>
                        Order By
                        <select
                            value={gsm?.ordering}
                            onChange={e => gsm?.setOrdering(e.target.value)}
                            className='bg-gray-50 text-gray-900 text-sm focus:[#048C8C]-500 focus:border-[#048C8C]-500 block w-full p-2.5 rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer'
                        >
                            <option value='-job_posted_date'>Posted Date</option>
                            <option value='job_title'>Job Title</option>
                            <option value='job_type'>Job Type</option>
                            <option value='company_name'>Company</option>
                        </select>
                    </div>
                    <div className='my-2'>
                        Job Visibility
                        <select
                            value={gsm?.jobVisibilitySelector}
                            onChange={e => gsm?.setJobVisibility(e.target.value)}
                            className='bg-gray-50 text-gray-900 text-sm focus:[#048C8C]-500 focus:border-[#048C8C]-500 block w-full p-2.5 rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer'
                        >
                            <option value='all'>All</option>
                            <option value='recruiter'>Recruiter</option>
                            <option value='non-recruiter'>Non-Recruiter</option>
                        </select>
                    </div>
                    <div className='my-2'>
                        Tech Stack
                        <CustomSelector
                            className='mx-auto'
                            options={formatOptions(filterState?.techStackData)}
                            handleChange={value => gsm?.setTechs(value)}
                            selectorValue={gsm?.techStackSelector}
                            isMulti
                            placeholder='Select Tech Stack'
                        />
                    </div>
                </div>
                <div className='flex justify-between items-center mb-2'>
                    <div>
                        <Checkbox
                            label='Show Only Blocked Companies Jobs'
                            checked={gsm?.blocked}
                            onChange={() => gsm?.toggleBlocked()}
                        />
                    </div>
                    <div>
                        <Filters apply={() => updateParams()} clear={() => resetFilters()} />
                    </div>
                </div>
            </div>
            <div>
                <table className='table-auto w-full table text-lg text-left mt-4 border text-[#048C8C]'>
                    <thead className='text-md uppercase bg-[#edfdfb] border'>
                        <tr>
                            {JOB_HEADS?.map(heading => (
                                <th scope='col' className='px-3 py-2' key={heading}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data?.length > 0 && error ? (
                            data?.map((item, key) => (
                                <tr
                                    className={`${
                                        item?.block ? 'bg-[#d9d5d5]' : 'bg-white'
                                    } border-b border-[#006366] border-opacity-30 hover:bg-gray-100`}
                                    key={key}
                                >
                                    <td className='p-2 w-96'>
                                        <a
                                            className='hover:bg-gray-100 cursor-pointer underline underline-offset-4 font-semibold'
                                            onClick={() => handleJobDetails(item)}
                                            data-title='click to open Job description'
                                        >
                                            {item?.job_title &&
                                                item?.job_title.length > 0 &&
                                                formatStringInPascal(item.job_title)}
                                        </a>
                                    </td>
                                    <td className='p-2'>
                                        {item?.company_name &&
                                            item?.company_name.length > 0 &&
                                            formatStringInPascal(item.company_name)}
                                    </td>
                                    <td className='capitalize'>
                                        <a
                                            className={`underline focus:font-bold focus:italic p-2 ${
                                                inVisitedJobs(item?.id) && 'bg-[#4ab9a7] text-white rounded'
                                            }`}
                                            target='_blank'
                                            rel='noreferrer'
                                            href={item?.job_source_url}
                                            onClick={() => setVisitedJobs(item?.id)}
                                        >
                                            {item?.job_source}
                                        </a>
                                    </td>
                                    <td className='p-2'>{item?.tech_keywords}</td>
                                    <td className='p-2'>{item?.job_type}</td>
                                    <td className='p-2'>{formatDate(item?.job_posted_date)}</td>
                                    <td>
                                        {can('apply_job') && item?.total_vertical > 0 && !gsm?.blocked ? (
                                            <Link
                                                to={`/apply-for-job/${item?.id}`}
                                                className='rounded bg-[#10868a] text-white text-sm inline-flex w-fit p-1'
                                            >
                                                Apply
                                                <span className='text-bold ml-0.5'>
                                                    ({item?.remaining_vertical ?? 0} / {item?.total_vertical ?? 0})
                                                </span>
                                            </Link>
                                        ) : (
                                            <small className='text-xs text-gray-500 border px-1.5 border-gray-500 rounded-lg'>
                                                {item?.total_vertical > 0
                                                    ? gsm?.blocked
                                                        ? 'blocked'
                                                        : 'unauthorized'
                                                    : 'no vertical'}
                                            </small>
                                        )}
                                    </td>
                                    {CustomModal}
                                    <td className='p-5'>
                                        <JobActions
                                            id={item?.id}
                                            blocked={item?.block}
                                            edited={item?.edited}
                                            edit={() => setJob({ data: item, show: true })}
                                            add={() => {
                                                setCurrentCompany([item?.company_name, 'add/'])
                                                openModal()
                                            }}
                                            remove={() => {
                                                setCurrentCompany([item?.company_name, 'remove/'])
                                                openModal()
                                            }}
                                            mutate={() => fetchJobsData(jobDetailsUrl)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTable cols={8} msg='No Jobs found yet!' />
                        )}
                    </tbody>
                </table>
                <Paginated page={gsm?.page} setPage={pageNumber => gsm?.setPage(pageNumber)} pages={pagesCount} />
            </div>
            {job.show && <EditJobForm job={job} set={setJob} mutate={() => fetchJobsData(jobDetailsUrl)} />}
            {gsm?.show && <JobShow />}
        </div>
    )
})

export default JobsFilter
