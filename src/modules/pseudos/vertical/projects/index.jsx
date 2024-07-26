import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { ActionButtons, ProjectActions, ProjectForm } from '@modules/pseudos/components'
import { fetchProjects } from '@modules/pseudos/api'

import { CreateIcon } from '@icons'

const Projects = ({ id }) => {
    const [project, setProject] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/project/?id=${id}`, fetchProjects)

    const handleClick = values => {
        setProject(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    return (
        <div className='mb-2 px-1'>
            <div className='flex items-center space-x-4 py-4'>
                <Button label='Add Project' fit icon={CreateIcon} onClick={() => handleClick(null)} />
            </div>
            <div className='grid gap-2 md:grid-cols-2'>
                {data?.length > 0 && !error ? (
                    data?.map((row, idx) => (
                        <div className='bg-white rounded-md p-2 md:p-4 border relative' key={idx}>
                            <h2 className='text-lg'>{row?.title ?? 'Not Specified'}</h2>
                            <ProjectActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            <div className='flex flex-col mt-2'>
                                <div className='font-semibold'>{row?.name ?? 'Not Specified'}</div>
                                <div className='text-sm italic'>
                                    {row?.repo ? (
                                        <a href={row?.repo} target='_blank' rel='noopener noreferrer'>
                                            {row?.repo}
                                        </a>
                                    ) : (
                                        'N/A'
                                    )}
                                </div>
                                <div className='ml-3 mt-2 text-gray-600 break-words'>
                                    {row?.description ?? 'Not description'}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='ml-2 text-gray-500'>No projects found yet!</span>
                )}
            </div>
            <ActionButtons mutate={mutate} classes='mt-4' />
            {show && <ProjectForm show={show} setShow={setShow} mutate={mutate} project={project} id={id} />}
        </div>
    )
}

export default memo(Projects)
