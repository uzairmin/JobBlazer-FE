import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable, Button, Paginated } from '@components'

import { PseudoForm, PseudoActions } from '@modules/pseudos/components'
import { fetchPseudos } from '@modules/pseudos/api'

import { can } from '@utils/helpers'
import { PSEUDO_HEADS } from '@constants/pseudos'

import { CreateIcon, EditIcon } from '@icons'

const Pseudos = () => {
    const [query, setQuery] = useState('')
    const [pseudo, setPseudo] = useState()
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/pseudo/?search=${query}`, fetchPseudos)

    const handleClick = (values = null) => {
        setPseudo(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    return (
        <div className='md:mb-14 px-3 md:px-5'>
            <div className='flex flex-col md:flex-row md:items-center gap-3 py-6'>
                <div className='flex space-x-4'>
                    <Searchbox query={query} setQuery={setQuery} />
                </div>
                {can('create_pseudo') && (
                    <Button label='Create Pseudo' fit icon={CreateIcon} onClick={() => handleClick()} />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C] __table-r'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {PSEUDO_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.pseudos?.length > 0 && !error ? (
                        data?.pseudos?.map((row, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                <td className='px-1 md:px-3 py-6'>{idx + 1}</td>
                                <td className='px-1 md:px-3 py-6'>{row?.name}</td>
                                <td className='px-1 md:px-3 py-6 w-1/2 md:w-fit'>
                                    {row?.verticals.length > 0
                                        ? row?.verticals.map(v => (
                                              <div
                                                  className='inline-flex items-center justify-center rounded-full bg-[#4f9d9b] text-white px-3 py-1 m-1 cursor-pointer hover:bg-[#346e6c] transition duration-200'
                                                  key={v.id}
                                              >
                                                  {can('edit_vertical') ? (
                                                      <Link
                                                          to={`/vertical/${v.id}`}
                                                          state={{ name: v.name }}
                                                          className='flex items-center'
                                                      >
                                                          <span className='mr-2'>{v.name}</span>
                                                          {EditIcon}
                                                      </Link>
                                                  ) : (
                                                      <span>{v.name}</span>
                                                  )}
                                              </div>
                                          ))
                                        : '-'}
                                </td>
                                <td className='px-1 md:px-3 py-6 md:float-right'>
                                    {can(['edit_pseudo', 'delete_pseudo', 'create_vertical']) && (
                                        <PseudoActions id={row?.id} edit={() => handleClick(row)} mutate={mutate} />
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No pseudo found yet!' />
                    )}
                </tbody>
            </table>
            {data?.users?.length > 24 && (
                <div className='w-full'>
                    <Paginated pages={data?.pages ?? Math.ceil(data.total / 25)} setPage={setPage} page={page} />
                </div>
            )}
            {can('edit_pseudo') && show && <PseudoForm show={show} setShow={setShow} mutate={mutate} pseudo={pseudo} />}
        </div>
    )
}

export default memo(Pseudos)
