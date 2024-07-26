import { memo, useState } from 'react'
import { Link } from 'react-router-dom'

import { menuItems } from '@constants/layout'
import { OpenSubMenuIcon } from '@icons'
import { can } from '@/utils/helpers'

const SidebarItems = ({ close }) => {
    const [subMenu, setSubMenu] = useState({ jobs: false, management: false })
    const handleSubMenu = key => setSubMenu({ ...subMenu, [key]: !subMenu[key] })

    return (
        menuItems?.length > 0 &&
        menuItems?.map(item =>
            can(item?.perms) ? (
                <div key={item.label}>
                    <div
                        className='flex items-center justify-between text-[#003C40] rounded border-2 hover:text-[#003C40] border-solid border-[#EDFFFB] hover:border-2 hover:border-solid hover:border-[#048C8C] active:border-2 active:border-solid active:border-[#048C8C] cursor-pointer'
                        onClick={() => {
                            handleSubMenu(item.key)
                            if (!item?.subItems) close()
                        }}
                    >
                        <Link
                            to={item.link}
                            className='flex items-center text-md p-4'
                            onClick={item?.subItems ? null : close}
                        >
                            {item.svg}
                            <span className='ml-3'>{item.label}</span>
                        </Link>
                        {item?.subItems && <span className='mr-2'>{OpenSubMenuIcon}</span>}
                    </div>
                    {item?.subItems &&
                        subMenu[item.key] &&
                        item?.subItems.map(subItem =>
                            can(subItem?.perms) ? (
                                <Link
                                    key={subItem.label}
                                    to={subItem.link}
                                    className='flex items-center text-sm p-4 ml-2 text-[#003C40] rounded border-2 hover:text-[#003C40] border-solid border-[#EDFFFB] hover:border-2 hover:border-solid hover:border-[#048C8C] active:border-2 active:border-solid active:border-[#048C8C]'
                                    onClick={close}
                                >
                                    {subItem.svg}
                                    <span className='ml-3'>{subItem.label}</span>
                                </Link>
                            ) : null
                        )}
                </div>
            ) : null
        )
    )
}

export default memo(SidebarItems)
