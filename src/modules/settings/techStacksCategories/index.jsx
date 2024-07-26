import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Button, Searchbox, EmptyTable, Badge } from '@components'

import { TechStacksCategoryForm, TechStackCategoryActions } from '@modules/settings/components'
import { fetchTechStacksCategory } from '@modules/settings/api'

import { can } from '@utils/helpers'
import { TECH_STACKS_CATEGORIES_HEADS, TECH_STACKS_CATEGORIES_INITIAL_STATE } from '@constants/settings'

import { CreateIcon } from '@icons'

const TechStacksCategories = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), TECH_STACKS_CATEGORIES_INITIAL_STATE)
    const { data, error, isLoading, mutate } = useSWR(
        `api/job_portal/trends_analytics/?search=${vals.query}`,
        fetchTechStacksCategory
    )
    const handleClick = values => dispatch({ show: !vals.show, trend_analytics: values })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                {can('create_tech_stacks_categories') && (
                    <Button
                        label='Create Tech Stacks Categories'
                        fit
                        icon={CreateIcon}
                        onClick={() => handleClick(null)}
                    />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {TECH_STACKS_CATEGORIES_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.length > 0 && !error ? (
                        data?.data?.map(row => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                <td className='px-3 py-6'>{row?.id}</td>
                                <td className='px-3 py-6 uppercase'>{row?.category}</td>
                                <td className='px-3 py-6'>
                                    <div className='flex flex-wrap gap-3'>
                                        {row?.tech_stacks?.length > 0 &&
                                            row?.tech_stacks
                                                ?.split(',')
                                                ?.map(tag => (
                                                    <Badge
                                                        label={tag}
                                                        type='success'
                                                        classes='border border-green-300'
                                                        key={tag.value}
                                                    />
                                                ))}
                                    </div>
                                </td>
                                <td className='px-3 py-6 '>
                                    <TechStackCategoryActions row={row} edit={handleClick} mutate={mutate} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={4} msg='No Category found yet!' />
                    )}
                </tbody>
            </table>
            {can('create_tech_stacks_categories') && vals.show && (
                <TechStacksCategoryForm
                    show={vals.show}
                    setShow={show => dispatch({ show })}
                    mutate={mutate}
                    trendAnalytics={vals.trend_analytics}
                    techStacksOptions={data?.tech_stacks}
                />
            )}
        </div>
    )
}

export default memo(TechStacksCategories)
