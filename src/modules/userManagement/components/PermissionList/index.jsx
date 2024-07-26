import { memo } from 'react'

import { Drawer, Button } from '@components'

const PermissionList = ({ show, setShow, list }) => (
    <Drawer show={show} setShow={setShow} w='250px'>
        <p className='font-bold'>Allowed Permissions</p>
        <ul className='list-disc px-5 py-2'>
            {list.map(p => (
                <li key={p.id}>{p.name}</li>
            ))}
        </ul>
        <Button label='Cancel' onClick={() => setShow(false)} />
    </Drawer>
)

export default memo(PermissionList)
