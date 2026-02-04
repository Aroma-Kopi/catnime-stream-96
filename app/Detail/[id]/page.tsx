import Link from 'next/link';
import { ChevronLeftIcon, PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import {GetDetail} from '@/app/components/Script';
import Episode from '@/app/components/Episode';
import Navbar from '@/app/components/Navbar';

export default async function DetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const anime = await GetDetail(id);

  if (!anime) return <div className="text-white text-center py-20">Anime tidak ditemukan...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <Navbar></Navbar>
      <div className="container mx-auto px-4 mt-4">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          
          {/* Bagian Poster (Sama seperti kodemu) */}
          <div className="w-full md:w-80 shrink-0">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src={anime.poster}
                className="w-full h-full object-cover"
                alt={anime.title}
              />
            </div>
          </div>

          {/* Bagian Informasi */}
          <div className="flex-grow">
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{anime.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-8 items-center">
               {/* ... Rating, Status, dll ... */}
               <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20 font-bold">
                <StarIcon className="w-4 h-4" />
                {anime.rating}
              </div>
              <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm border border-green-500/20">{anime.status}</span>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3 text-indigo-400">Sinopsis</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {anime.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 text-indigo-400">Genre</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genre.map((genre: any) => (
                  <span key={genre} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm border border-white/5 transition cursor-default">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <Episode episode={anime.episodes} />
            
          </div>
        </div>
      </div>
    </div>
  );
}