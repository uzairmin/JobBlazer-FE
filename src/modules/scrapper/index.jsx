import { memo, useState } from 'react'

import { Button } from '@components'

import {
    CronjobSetting,
    ScrappingGroup,
    JobSourceLinks,
    ScraperStatus,
    GroupLinks,
    Logs,
    Accounts,
    RestrictedKeywords,
} from '@modules/scrapper/components'

import {
    JobSourceLinkIcon,
    CronjobSettingIcon,
    RunningScrapperIcon,
    LogsIcon,
    RestrictedKeywordsIcon,
    UsersIcon,
} from '@icons'

const Profile = () => {
    const [activeTab, setActiveTab] = useState({
        setting: true,
        links: false,
        status: false,
        logs: false,
        grouplinks: false,
        accounts: false,
        restricted: false,
    })

    const handleClick = key => {
        Object.keys(activeTab).forEach(k => (activeTab[k] = false))
        activeTab[key] = true
        setActiveTab({ ...activeTab })
    }

    return (
        <div className='p-2'>
            <div className='p-4 rounded-lg shadow-md'>
                <div className='flex flex-col mb-4'>
                    <div className='flex flex-wrap gap-2 md:gap-4'>
                        <Button
                            label='Cronjob Settings'
                            fit
                            fill={activeTab.setting}
                            icon={CronjobSettingIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.setting && 'border-gray-200'}`}
                            onClick={() => handleClick('setting')}
                        />
                        <Button
                            label='Job Source Links / URLs'
                            fit
                            fill={activeTab.links}
                            icon={JobSourceLinkIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.links && 'border-gray-200'}`}
                            onClick={() => handleClick('links')}
                        />
                        <Button
                            label='Group Setting'
                            fit
                            fill={activeTab.group}
                            icon={CronjobSettingIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.group && 'border-gray-200'}`}
                            onClick={() => handleClick('group')}
                        />
                        <Button
                            label='Group Source Links / URLs'
                            fit
                            fill={activeTab.grouplinks}
                            icon={JobSourceLinkIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.grouplinks && 'border-gray-200'}`}
                            onClick={() => handleClick('grouplinks')}
                        />
                        <Button
                            label='Running Scrapers'
                            fit
                            fill={activeTab.status}
                            icon={RunningScrapperIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.status && 'border-gray-200'}`}
                            onClick={() => handleClick('status')}
                        />
                        <Button
                            label='Logs'
                            fit
                            fill={activeTab.logs}
                            icon={LogsIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.logs && 'border-gray-200'}`}
                            onClick={() => handleClick('logs')}
                        />
                        <Button
                            label='Accounts Management'
                            fit
                            fill={activeTab.accounts}
                            icon={UsersIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.accounts && 'border-gray-200'}`}
                            onClick={() => handleClick('accounts')}
                        />
                        <Button
                            label='Restricted Keywords'
                            fit
                            fill={activeTab.restricted}
                            icon={RestrictedKeywordsIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.restricted && 'border-gray-200'}`}
                            onClick={() => handleClick('restricted')}
                        />
                    </div>
                    {activeTab.setting && (
                        <div className='mt-5'>
                            <CronjobSetting />
                        </div>
                    )}
                    {activeTab.group && (
                        <div className='mt-5'>
                            <ScrappingGroup />
                        </div>
                    )}
                    {activeTab.links && (
                        <div className='mt-5'>
                            <JobSourceLinks />
                        </div>
                    )}
                    {activeTab.grouplinks && (
                        <div className='mt-5'>
                            <GroupLinks />
                        </div>
                    )}
                    {activeTab.status && (
                        <div className='mt-5'>
                            <ScraperStatus />
                        </div>
                    )}
                    {activeTab.logs && (
                        <div className='mt-5'>
                            <Logs />
                        </div>
                    )}
                    {activeTab.accounts && (
                        <div className='mt-5'>
                            <Accounts />
                        </div>
                    )}
                    {activeTab.restricted && (
                        <div className='mt-5'>
                            <RestrictedKeywords />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(Profile)
