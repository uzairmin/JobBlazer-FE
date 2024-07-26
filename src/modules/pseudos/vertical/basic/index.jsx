import { memo, useState } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Input, Loading } from '@components'

import { ActionButtons, BasicInfoTextareas, Hobbies, RegionsDropdown } from '@modules/pseudos/components'
import { fetchBasicInfo, updateBasicInfo } from '@modules/pseudos/api'

import { verticalBasicInfoSchema } from '@utils/schemas'
import { BASIC_INFO_INPUTS } from '@constants/pseudos'
import { SWR_REVALIDATE } from '@constants/global'

const Basic = ({ id, set = null }) => {
    const [hobbies, setHobbies] = useState([])
    const [regions, setRegions] = useState([])

    const { data, isLoading, mutate } = useSWR(`/api/profile/vertical/${id}/`, fetchBasicInfo, {
        ...SWR_REVALIDATE,
        onSuccess: fetchedData => {
            set(fetchedData?.name)
            setRegions(fetchedData?.regions)
        },
    })

    const { values, errors, handleSubmit, handleChange, trigger } = useMutate(
        `/api/profile/vertical/${id}/`,
        updateBasicInfo,
        {
            name: data?.name || '',
            email: data?.email || '',
            phone: data?.phone || '',
            designation: data?.designation || '',
            portfolio: data?.portfolio || '',
            address: data?.address || '',
            description: data?.description || '',
            summary: data?.summary || '',
            identity: data?.identity || '',
        },
        verticalBasicInfoSchema,
        async formValues => trigger({ ...formValues, vertical_id: id, hobbies, regions: regions.map(r => r.value) }),
        null,
        () => mutate()
    )

    if (isLoading) return <Loading />
    return (
        <div className='py-4 px-1'>
            <form onSubmit={handleSubmit}>
                <div className='grid gap-2 md:grid-cols-3 md:gap-3'>
                    {BASIC_INFO_INPUTS.map(input => (
                        <div key={input.name}>
                            <span className='text-xs font-semibold'>
                                {input.label}
                                {input.required && '*'}
                            </span>
                            <Input
                                name={input.name}
                                type={input.type}
                                value={values[input.name]}
                                onChange={handleChange}
                                ph={input.ph}
                            />
                            {errors[input.name] && <small className='__error'>{errors[input.name]}</small>}
                        </div>
                    ))}
                </div>
                <BasicInfoTextareas values={values} errors={errors} handleChange={handleChange} />
                <div className='flex flex-col md:flex-row md:gap-4 items-baseline mb-2'>
                    <div className='flex flex-col w-full md:w-auto md:flex-wrap'>
                        <RegionsDropdown value={data?.regions} set={setRegions} />
                        {data?.regions?.length > 0 && (
                            <small className='-mt-5 text-[#048c8c] p-1 w-80 text-justify'>
                                <span className='font-bold text-red-500'>Warning: </span>
                                By changing above selected regions,
                                <span className='font-bold ml-1'>users`s assigned verticals can also be removed.</span>
                            </small>
                        )}
                    </div>
                    <Hobbies hobbies={data?.hobbies} setHobbies={setHobbies} />
                </div>
                <ActionButtons form mutate={mutate} />
            </form>
        </div>
    )
}

export default memo(Basic)
