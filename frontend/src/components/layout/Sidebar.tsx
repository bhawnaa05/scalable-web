'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    X,
    Home,
    ClipboardList,
    Settings,
    Users,
    BarChart3,
    Calendar,
    Folder,
    HelpCircle,
    Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Tasks', href: '/dashboard/tasks', icon: ClipboardList },
    { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
    { name: 'Projects', href: '/dashboard/projects', icon: Folder },
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen
}: {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}) {
    const pathname = usePathname();

    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50 lg:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button
                                            type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <X className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <Link href="/" className="flex items-center gap-x-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2]">
                                                <Sparkles className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Notionary</span>
                                        </Link>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {navigation.map((item) => {
                                                        const isActive = pathname === item.href;
                                                        return (
                                                            <li key={item.name}>
                                                                <Link
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        isActive
                                                                            ? 'bg-primary-50 text-primary-600'
                                                                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium'
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className={classNames(
                                                                            isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600',
                                                                            'h-6 w-6 shrink-0'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <Link href="/" className="flex items-center gap-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2]">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Notionary</span>
                        </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={classNames(
                                                        isActive
                                                            ? 'bg-primary-50 text-primary-600'
                                                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600',
                                                            'h-6 w-6 shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
