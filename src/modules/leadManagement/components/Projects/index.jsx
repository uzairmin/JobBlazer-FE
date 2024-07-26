import { memo, useState } from 'react'
import useSWR from 'swr'
import { useMutate } from '@/hooks'

import { Loading, Input, Badge, Button, Textarea } from '@/components'
import { fetchMyProjects, saveCandidateProjects } from '@modules/leadManagement/api'

import { parseProjects } from '@/utils/helpers'

import { AddSkillIcon } from '@icons'

const PROJECT_INITIAL_VALS = { name: '', description: '', tags: '' }

const Projects = ({ data }) => {
    const [tags, setTags] = useState([])
    const [inputs, setInputs] = useState(PROJECT_INITIAL_VALS)

    const { isLoading, mutate } = useSWR(
        `api/candidate_management/candidate_projects/${data?.candidates?.id ? `${data?.candidates?.id}` : '0'}/`,
        fetchMyProjects,
        {
            onSuccess: ({ data: projects }) => setTags(parseProjects(projects)),
        }
    )

    const { handleSubmit, trigger } = useMutate(
        `/api/candidate_management/candidate_projects/${data?.candidates?.id ? `${data?.candidates?.id}` : '0'}/`,
        saveCandidateProjects,
        {},
        null,
        async () => trigger({ projects: tags }),
        null,
        () => mutate()
    )

    const handleChange = ({ target }) => {
        if (target.name === 'tags') {
            setInputs(prevInputs => ({ ...prevInputs, [target.name]: target.value.split(',') }))
        } else {
            setInputs(prevInputs => ({ ...prevInputs, [target.name]: target.value }))
        }
    }

    const addProject = () => {
        setTags([...tags, inputs])
        setInputs(PROJECT_INITIAL_VALS)
    }
    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))

    if (isLoading) return <Loading />
    return (
        <div className='text-[#006366] '>
            <div className='flex flex-col md:flex-row md:justify-center'>
                <div className='border border-1 p-2 md:p-3 md:m-2 text-center h-fit bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] md:hover:transform md:hover:scale-[110%] z-10'>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-md font-semibold uppercase'>Projects</p>
                    </div>
                </div>
                <div className='flex flex-col w-full px-4 md:px-8 bg-slate-100 border py-4 md:py-8 rounded-3xl md:-ml-8'>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-flow-row gap-2 mb-1 w-full'>
                            <Input
                                value={inputs?.name}
                                onChange={handleChange}
                                ph='Add Name'
                                name='name'
                                classes='bg-white'
                            />
                            <Textarea
                                value={inputs?.description}
                                onChange={handleChange}
                                ph='Add desription'
                                name='description'
                                className='bg-slate-100'
                            />
                        </div>
                        <div className='grid grid-flow-col gap-2 mb-3 md:mb-6'>
                            <Input
                                value={inputs?.tags}
                                onChange={handleChange}
                                ph='Add , seprated keywords'
                                name='tags'
                                classes='bg-white'
                            />
                            <div className='grid grid-flow-col'>
                                <Button icon={AddSkillIcon} fit onClick={addProject} classes='!rounded-full bg-white' />
                                <Button label='save' type='submit' fill />
                            </div>
                        </div>
                    </form>
                    {tags?.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-flow-col md:mb-4 justify-items-end bg-[#EDFDFB] shadow-xl p-2.5 cursor-pointer md:p-4 rounded-xl items-center hover:transform hover:scale-[102%]'>
                                <div className='flex flex-col justify-self-start group'>
                                    <div className='text-md uppercase font-bold'>{item?.name}</div>
                                    <p className='text-sm line-clamp-2 group-hover:line-clamp-none'>
                                        {item?.description}
                                    </p>
                                    <div className='mt-2 space-x-1 flex flex-row'>
                                        {item?.tags?.length > 0 &&
                                            item?.tags?.map(tag => (
                                                <Badge
                                                    label={
                                                        <span className='inline-block'>
                                                            <span>{tag}</span>
                                                        </span>
                                                    }
                                                    type='success'
                                                    classes='border border-green-300'
                                                    key={tag}
                                                />
                                            ))}
                                    </div>
                                </div>
                                <button
                                    type='button'
                                    onClick={() => handleTagRemove(item)}
                                    className='ml-2 focus:outline-none hover:text-red-700'
                                >
                                    <p className='text-xl md:mr-4 font-bold'>X</p>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default memo(Projects)
