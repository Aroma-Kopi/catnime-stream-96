'use client'; // Wajib karena menggunakan Disclosure (Headless UI)

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';    

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
];
interface NavbarProps {
  searchQuery?: string;
}

export default function Navbar({ searchQuery = '' }: NavbarProps) {
  return (
    <Disclosure as="nav"
        className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
          <div className="w-full px-4 px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
              
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center rounded-full">
                  <img
                    alt="Your Company"
                    src="/WhatsApp Image 2026-01-31 at 01.05.14.jpeg"
                    className="h-10 w-auto rounded-full"
                  />
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
                  
              {/* search */}
              <div className="hidden flex-1 px-2 lg:ml-6 lg:flex lg:justify-end">
                <form action="/" method='GET' className="w-full max-w-xs">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <div className="relative text-gray-400 focus-within:text-gray-200">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="size-5" aria-hidden="true" />
                      </div>
                      <input
                        name="query"
                        defaultValue={searchQuery}
                        placeholder="Cari Anime...  "
                        className="block w-full rounded-md border-0 bg-gray-700/50 py-1.5 pl-10 pr-3 text-white placeholder:text-gray-400 focus:bg-gray-900 focus:ring-1 focus:ring-indigo-500 sm:text-sm sm:leading-6 border-white/10 outline-none"
                      />
                    </div>
                  </div>
                </form>
              </div>
              
            </div>
          </div>
    </Disclosure>
  );
}
