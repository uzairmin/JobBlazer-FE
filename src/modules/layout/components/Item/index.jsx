import { memo } from 'react'
import { Tooltip } from 'react-tooltip'
import { Link, useLocation } from 'react-router-dom'

import { can } from '@utils/helpers'

import { OpenSubMenuIcon, ClosedSubMenuIcon } from '@icons'

const Item = ({ item, setSubMenu, show, subMenu }) => {
    const handleSubMenu = key => setSubMenu({ ...subMenu, [key]: !subMenu[key] })
    const handleHover = key => !show && setSubMenu({ ...subMenu, [key]: true })
    const location = useLocation()

    return can(item?.perms) ? (
        <>
            <div
                className={`flex items-center justify-between text-[#003C40] border-[#048C8C] rounded ${
                    location.pathname === item.link ? 'border-opacity-100' : 'border-opacity-0'
                }  hover:text-[#003C40] border-2 hover:border-[#048C8C] cursor-pointer`}
                onClick={() => handleSubMenu(item.key)}
                onMouseEnter={() => handleHover(item.key)}
            >
                <Link key={item.label} to={item.link} className='flex items-center text-md p-2 w-full'>
                    <span
                        className='shadow-xl border border-[#b2f0f0] rounded-xl bg-white p-2'
                        id={item?.label?.replace(/ /g, '_')}
                    >
                        {item.svg}
                    </span>
                    {show ? <span className='ml-3 hidden lg:block'>{item.label}</span> : ''}
                </Link>
                {show && item?.subItems && (
                    <span className='hidden lg:block mr-2'>
                        {subMenu[item.key] ? OpenSubMenuIcon : ClosedSubMenuIcon}
                    </span>
                )}
            </div>
            {!show && (
                <Tooltip
                    anchorSelect={`#${item?.label?.replace(/ /g, '_')}`}
                    content={item.label}
                    place='left'
                    delayShow={0}
                    offset={25}
                    className='z-50 tracking-wider !text-lg !bg-[#048c8c] hidden lg:block'
                />
            )}
            {item?.subItems && (
                <div className='hidden lg:block'>
                    {subMenu[item.key] && (
                        <div className='rounded bg-[#00bd8e1a] pl-2'>
                            {item?.subItems.map(subItem =>
                                can(subItem?.perms) ? (
                                    <Link
                                        key={subItem.label}
                                        to={subItem.link}
                                        className={`flex items-center text-sm p-2 border-[#048C8C] my-1 ${
                                            location.pathname === subItem.link
                                                ? 'border-opacity-100'
                                                : 'border-opacity-0'
                                        } text-[#003C40] rounded hover:text-[#003C40] border-2 hover:border-[#048C8C] cursor-pointer`}
                                    >
                                        <span
                                            className='shadow-xl border border-[#b2f0f0] rounded-xl bg-white p-2'
                                            id={subItem?.label?.replace(/ /g, '_')}
                                        >
                                            {subItem.svg}
                                        </span>
                                        {show ? (
                                            <span className='ml-3 hidden lg:inline-flex lg:items-center'>
                                                {subItem.label}
                                                {subItem?.new && (
                                                    <strong className='text-xs ml-2 bg-[#048C8C] rounded text-white px-1.5'>
                                                        new
                                                    </strong>
                                                )}
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                        {!show && (
                                            <Tooltip
                                                anchorSelect={`#${subItem?.label?.replace(/ /g, '_')}`}
                                                content={subItem.label}
                                                place='left'
                                                delayShow={0}
                                                offset={10}
                                                className='ml-3 z-50 tracking-wider !text-lg !bg-[#048c8c] hidden lg:block'
                                            />
                                        )}
                                    </Link>
                                ) : null
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    ) : null
}
export default memo(Item)
