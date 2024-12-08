import React from 'react'
import Link from 'next/link'
import { InstagramLogo, navItems, SettingsIcon } from '@/lib/helper'
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/themes/ModeToggle';

const SideBar = () => {

    const pathname = usePathname();

    return (
        <div>
            {/* left-sidebar */}
            <div className='max-md:hidden fixed left-0 top-0 px-4 py-7 h-screen border border-input'>
                <div className='flex flex-col items-center justify-between h-full'>
                    <Link href="/" className="rounded-lg p-2 hover:bg-input">
                        <InstagramLogo />
                    </Link>
                    <div className='flex flex-col gap-7 items-center'>
                        {navItems.map((item) => (
                            <Link className='relative' href={item.href} key={item.href}>
                                <div className='rounded-lg p-2 hover:bg-input'>
                                    {pathname === item.href ? item.activeIcon : item.inactiveIcon}
                                </div>
                            </Link>
                        ))}
                        {/* <ModeToggle /> */}
                        <Link href={`/profile`}>
                            <div className='rounded-full w-6 h-6 bg-gray-300'></div>
                        </Link>
                    </div>
                    <div className='cursor-pointer rounded-lg p-2 hover:bg-input'>
                        <SettingsIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar