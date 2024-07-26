import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Modal, Input } from '@components'

import { Password } from '@modules/userManagement/components'
import { DesignationSelect, SkillsInput, ToolsInput, RegionInput } from '@modules/leadManagement/components'
import { saveCandidate } from '@modules/leadManagement/api'

import { parseSelectedDesignation } from '@utils/helpers'
import { candidateEditSchema, candidateCreateSchema } from '@utils/schemas'
import { CANDIDATE_INPUTS } from '@constants/leadManagement'

const CandidateForm = ({ show, setShow, mutate, candidate, allRegions }) => {
    const { values, errors, handleSubmit, handleChange, trigger, setFieldValue } = useMutate(
        `/api/candidate_management/candidate${candidate?.id ? `/${candidate?.id}/` : '/'}`,
        saveCandidate,
        {
            name: candidate?.name || '',
            email: candidate?.email || '',
            phone: candidate?.phone || '',
            id: candidate?.id || '',
            password: '',
            designation: candidate?.designation ? parseSelectedDesignation(candidate?.designation) : '',
            skills: candidate?.skills || [],
            tools: candidate?.tools || [],
            experience: candidate?.experience || 1,
            regions: candidate?.regions || [],
        },
        candidate?.id ? candidateEditSchema : candidateCreateSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => mutate() && setShow(false)
    )
    return (
        <Modal
            classes='md:!w-[40%] overflow-y-auto'
            show={show}
            setShow={setShow}
            content={
                <form onSubmit={handleSubmit} className='w-full'>
                    <p className='font-medium text-xl'>{candidate?.id ? 'Edit' : 'Create'} Candidate</p>
                    <hr className='my-2' />
                    <div className='grid grid-cols-2 gap-2'>
                        <DesignationSelect value={values.designation} error={errors.designation} set={setFieldValue} />
                        {CANDIDATE_INPUTS.map((input, idx) => (
                            <div key={idx}>
                                <span className='text-xs font-semibold'>
                                    {input.label}
                                    {input.required ? '*' : null}
                                </span>
                                <Input
                                    name={input.name}
                                    type={input.type}
                                    value={values[input.name]}
                                    onChange={handleChange}
                                    ph={input.ph}
                                    step={input?.step}
                                />
                                {errors[input.name] && <small className='__error'>{errors[input.name]}</small>}
                            </div>
                        ))}
                        <div>
                            <span className='text-xs font-semibold'>Email*</span>
                            <Input
                                name='email'
                                type='email'
                                value={values.email}
                                onChange={handleChange}
                                ph='Enter email'
                                // readonly={!!candidate?.id}
                            />
                            {errors.email && <small className='__error'>{errors.email}</small>}
                        </div>
                        <div>
                            <Password
                                value={values.password}
                                error={errors.password}
                                onChange={handleChange}
                                id={candidate?.id}
                            />
                        </div>
                    </div>
                    <RegionInput
                        value={values.regions}
                        error={errors.regions}
                        set={setFieldValue}
                        regions={allRegions}
                    />
                    <SkillsInput value={values.skills} error={errors.skills} set={setFieldValue} />
                    <ToolsInput value={values.tools} error={errors.tools} set={setFieldValue} />
                    <div className='pt-4 gap-2 flex items-center float-right'>
                        <Button label={candidate?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </form>
            }
        />
    )
}

export default memo(CandidateForm)
