import { memo } from 'react'

import { Drawer } from '@components'
import { Logo, Logout, SidebarItems, TermsOfService } from '@modules/layout/components'

const Overlay = ({ show, setShow }) => (
    <Drawer show={show} dir='left' setShow={setShow} w='70%' classes='bg-[#EDFFFB] flex flex-col justify-between'>
        <div className='h-[91vh] overflow-y-auto'>
            <Logo />
            <hr className='w-50 h-0.5 bg-[#048C8C] my-4 border-0 rounded' />
            <SidebarItems close={() => setShow(false)} />
            <Logout />
            <hr className='w-50 h-0.5 bg-[#048C8C] my-4 border-0 rounded' />
        </div>
        <TermsOfService />
    </Drawer>
)

export default memo(Overlay)
