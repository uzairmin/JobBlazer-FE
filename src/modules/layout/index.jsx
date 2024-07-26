import { memo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import SideBar from '@modules/layout/sidebar'
import Navbar from '@modules/layout/navbar'
import Overlay from '@modules/layout/overlay'
import RolesSidebar from '@modules/layout/rolesSidebar'

const layout = memo(({ children, title }) => {
    const location = useLocation()
    if (location?.state?.title) {
        title = location.state.title
    }
    const [toggle, setToggle] = useState(true)
    const [show, setShow] = useState(false)
    const [switching, setSwitching] = useState(false)

    return (
        <main className='flex h-screen hide_scrollbar'>
            <RolesSidebar set={setSwitching} />
            {!switching && <SideBar toggle={toggle} setToggle={setToggle} />}
            <Overlay show={show} setShow={setShow} />
            <div className='w-[85%] flex-1'>
                <div className='flex flex-col space-y-1 h-screen'>
                    <div className='h-100'>
                        <Navbar setShow={setShow} title={title} />
                    </div>
                    <div className='h-screen overflow-scroll hide_scrollbar'>{children}</div>
                </div>
            </div>
        </main>
    )
})

export default layout
