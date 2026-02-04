import Link from 'next/link';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import {GetFilm} from '@/app/components/Script';
import Navbar from '@/app/components/Navbar';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{page?: string, query?: string}>
}) {
  const {page, query} = await searchParams;
  const currentPage = Number(page) || 1;
  const searchQuery = query || "";
  let getAnime = [];
  let isSearchMode = false;
  if (searchQuery) {
    isSearchMode = true;
    getAnime = await GetFilm(1, searchQuery)
  } else {
    isSearchMode = false;
    getAnime = await GetFilm(currentPage)
  }
  
  return (
    <body>
      {/* navbar */}
      <Navbar>
      </Navbar>

<div className="container mx-auto px-4 py-10">
        {/* Judul Status Pencarian */}
        {searchQuery && (
          <h2 className="text-xl text-white mb-6">
            Hasil pencarian untuk: <span className="text-indigo-400">"{searchQuery}"</span>
          </h2>
        )}

        {(!getAnime || getAnime.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20">
             <h2 className="text-white">Anime tidak ditemukan...</h2>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center">
            {getAnime.map((item: any) => (
              <Link key={item.id} href={item.href} className="group w-full flex flex-col space-y-3 cursor-pointer"> 

              <div key={item.id} className="group w-full flex flex-col space-y-3 cursor-pointer">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-white/5 shadow-lg transition duration-300 group-hover:scale-95 group-hover:ring-2 group-hover:ring-indigo-500">
                    <img src={item.poster} className="h-full w-full object-cover" />
                    <div className='absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center'>
                      <Link href={item.href} className='rounded-full bg-indigo-600 p-3 text-white shadow-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                      </Link>
                    </div>
                </div>
                
                <div className='px-1'>
                  <h3 className="text-sm font-medium text-gray-200 line-clamp-2 leading-snug group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className='text-xs text-gray-500 mt-1'>Jumlah Episode {item.episode}</p>
                </div>
              </div>

              </Link>
            ))}
          </div>
        )}
      </div>
    
    </body>
  );
}