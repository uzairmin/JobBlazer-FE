import { memo, useState } from 'react'

import { Item } from '@modules/layout/components'

import { menuItems } from '@constants/layout'

import { OpenSidebarIcon } from '@icons'
import logo from '@images/signin-logo.svg'
import smallLogo from '@images/signin-small-logo.svg'

const SideBar = ({ toggle, setToggle }) => {
    const [subMenu, setSubMenu] = useState({ jobs: false, management: false })

    return (
        <aside
            className={`sm:flex hidden ${
                toggle ? 'w-auto xl:w-[15%]' : 'w-fit'
            } flex-col space-y-2 border-2 py-2 sm:px-2 my-2 ml-2  text-[#048C8C] bg-[#EDFFFB] rounded-lg h-screen overflow-scroll hide_scrollbar`}
        >
            <div className={`p-2 flex justify-center md:justify-${toggle ? 'center' : 'between'}`}>
                <span className='hidden lg:block '>
                    {toggle ? (
                        <img src={logo} alt='' width='120' height='59' />
                    ) : (
                        <img src={smallLogo} alt='' width='25' height='25' />
                    )}
                </span>
                <span className='block lg:hidden'>
                    <img src={smallLogo} alt='' width='25' height='25' />
                </span>
            </div>
            <hr className='my-4 border border-[#048C8C] border-opacity-60' />
            {menuItems?.length > 0 &&
                menuItems?.map(item => (
                    <Item item={item} subMenu={subMenu} setSubMenu={setSubMenu} show={toggle} key={item.label} />
                ))}
            <hr className='my-4 border border-[#048C8C] border-opacity-60' />
            <div className='flex flex-col justify-end h-[100%]'>
                <div className='h-100 flex flex-col justify-end items-center'>
                    <span className='cursor-pointer p-2 flex mb-1' onClick={() => setToggle(!toggle)}>
                        {OpenSidebarIcon}
                        {toggle && <span className='hidden lg:flex ml-1'>Toggle Sidebar</span>}
                    </span>
                </div>
                {toggle && (
                    <button className='hidden lg:flex w-full p-2.5 bg-[#048C8C] rounded-xl self-end my-2'>
                        <p align='justify' className='text-white float-left text-xs'>
                            &copy; 2023 Octagon.inc <br />
                            Terms Of Service - Privacy Policy
                        </p>
                    </button>
                )}
            </div>
        </aside>
    )
}

export default memo(SideBar)
