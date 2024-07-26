import { memo, useState } from 'react'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

import { useMutate } from '@/hooks'
import { Button, Drawer } from '@components'
import CustomSelector from '@components/CustomSelector'
import { assignVertical, fetchPseudos } from '@modules/userManagement/api'

import { verticalSchema } from '@utils/schemas'
import { getMsg, parsePseudos, parseVertical } from '@utils/helpers'
// import { can } from '@/utils/helpers'

const PseudosTeamForm = ({ show, setShow, mutate, team }) => {
    const { data, isLoading } = useSWR('api/profile/team_vertical_assignment/', fetchPseudos)
    const [pseudos, setPseudos] = useState({
        pseudo: [],
        vertical: team?.verticals?.length > 0 ? parseVertical(team) : [],
    })
    const { handleSubmit, trigger } = useMutate(
        'api/profile/team_vertical_assignment/',
        assignVertical,
        {
            team_id: team?.id,
            verticals: pseudos.vertical.map(obj => obj.value),
        },
        verticalSchema,
        async formValues =>
            trigger({ ...formValues, team_id: team.id, verticals: pseudos.vertical.map(obj => obj.value) }),
        error => toast.error(getMsg(error)),
        () => {
            mutate()
            setPseudos({ ...pseudos, pseudo: [], vertical: [] })
        }
    )

    const removeVertical = id => {
        const verticals = pseudos.vertical
        setPseudos({ ...pseudos, vertical: verticals.filter(item => item.value !== id) })
    }
    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Pseudo Assignment</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Pesudos*</span>
                    {isLoading ? (
                        'Pseudos Loading ...'
                    ) : (
                        <CustomSelector
                            name='pseudo'
                            options={parsePseudos(data?.pseudos)}
                            handleChange={obj => setPseudos({ ...pseudos, pseudo: obj })}
                            selectorValue={pseudos.pseudo}
                            placeholder='Select Pseudos'
                        />
                    )}
                    <span className='text-xs font-semibold'>Verticals*</span>
                    {isLoading ? (
                        'Verticals Loading ...'
                    ) : (
                        <CustomSelector
                            name='vertical'
                            options={parseVertical(pseudos.pseudo, true)}
                            handleChange={obj => setPseudos({ ...pseudos, vertical: obj })}
                            selectorValue={pseudos.vertical}
                            isMulti
                            placeholder='Select verticals'
                        />
                    )}

                    <div className='pt-4 space-y-2'>
                        <Button label='Assign' type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                    <div>
                        <h1 className='my-2 font-medium'>Selcted Verticals</h1>
                        {pseudos.vertical?.length > 0 &&
                            pseudos.vertical?.map(tag => (
                                <span
                                    key={tag.value}
                                    className='inline-block  my-2 px-2.5 py-1.5 text-sm font-semibold bg-gray-200 rounded-full items-center mx-1'
                                >
                                    <span>{tag.label}</span>
                                    <button
                                        type='button'
                                        onClick={() => removeVertical(tag.value)}
                                        className='ml-2 text-gray-700 font-semibold focus:outline-none hover:text-red-700'
                                    >
                                        x
                                    </button>
                                </span>
                            ))}
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(PseudosTeamForm)
