'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import {usePathname} from "next/navigation";
import classnames from 'classnames';
import {useSession} from "next-auth/react";
import {Box} from "@radix-ui/themes";

const Navbar = () => {

    // To get the current path of the navigation
    const currentPath = usePathname();

    const {status, data: session } = useSession(); // To get the current auth session

    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues/list'},
    ]
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/"><AiFillBug/></Link>
            <ul className='flex space-x-6 '>
                {links.map(link =>
                    <li key={link.href}>
                        <Link
                            className={ classnames({
                            'text-blue-900': link.href === currentPath,
                            'text-gray-500': link.href !== currentPath,
                            'hover:text-zinc-800 transition-colors': true,
                            })}
                            href={link.href}> {link.label}
                        </Link>
                    </li>
                )}
            </ul>
            <Box>
                {status === 'authenticated' && (
                    <Link href={"/api/auth/signout"}>Logout</Link>
                )}
                {status === 'unauthenticated' && (
                    <Link href={"/api/auth/signin"}>Login</Link>
                )}
            </Box>
        </nav>
    )
}
export default Navbar
