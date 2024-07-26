import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, Textarea } from '@components'

import { saveProject } from '@modules/pseudos/api'

import { projectSchema } from '@utils/schemas'

const ProjectForm = ({ show, setShow, mutate, project, id }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/profile/project${project?.id ? `/${project?.id}/` : '/'}`,
        saveProject,
        {
            vertical_id: id,
            name: project?.name || '',
            title: project?.title || '',
            description: project?.description || '',
            repo: project?.repo || '',
        },
        projectSchema,
        async formValues => trigger({ ...formValues, id: project?.id }),
        null,
        () => {
            mutate()
            if (!project?.id) resetForm()
        }
    )
    const flag = values.name.length > 0 && values.title.length > 0 && Object.keys(errors).length === 0

    return (
        <Drawer show={show} setShow={setShow} w='450px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{project?.id ? 'Edit' : 'Create'} Project</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Project Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter Project name' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Your Title*</span>
                    <Input
                        name='title'
                        value={values.title}
                        onChange={handleChange}
                        ph='Enter your title like Frontend Dev'
                    />
                    {errors.title && <small className='__error'>{errors.title}</small>}
                    <span className='text-xs font-semibold'>URL</span>
                    <Input name='repo' type='url' value={values.repo} onChange={handleChange} ph='Enter website Url' />
                    {errors.repo && <small className='__error'>{errors.repo}</small>}
                    <span className='text-xs font-semibold'>Description</span>
                    <Textarea
                        name='description'
                        value={values.description}
                        onChange={handleChange}
                        ph='Enter project description like about stack, technologies, etc'
                    />
                    {errors.description && <small className='__error'>{errors.description}</small>}
                    <div className='pt-4 flex gap-2'>
                        {flag && <Button label={project?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(ProjectForm)
