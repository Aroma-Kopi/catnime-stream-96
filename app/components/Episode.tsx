'use client'; // Wajib, agar tombol bisa diklik
import { useState } from 'react';
import Link from 'next/link';

// Definisikan tipe data sesuai hasil mapping di Script.js
type EpisodeProps = {
  episode: {
    chapterTitle: string;
    chapterUrl: string;
    href: string;
  }[];
};

export default function Episode({ episode }: EpisodeProps) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 10; // Menampilkan 10 episode per halaman

  // Hitung total halaman
  const totalPages = Math.ceil(episode.length / itemsPerPage);
  
  // Ambil data episode sesuai halaman saat ini (Logic Slice)
  const currentEpisodes = episode.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
          <h3 className="text-2xl font-bold text-white">Daftar Episode</h3>
        </div>

        {/* Navigasi Panah */}
        <div className="flex items-center gap-2">
          {/* Tombol Kiri */}
          <button 
            onClick={handlePrev}
            disabled={page === 0}
            className="p-2 rounded-lg bg-gray-800 border border-white/5 text-gray-400 hover:text-white hover:bg-gray-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Indikator Angka (Dinamis) */}
          <span className="text-sm font-medium text-gray-400 px-2 min-w-[60px] text-center">
            {page * itemsPerPage + 1} - {Math.min((page + 1) * itemsPerPage, episode.length)}
          </span>

          {/* Tombol Kanan */}
          <button 
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            className="p-2 rounded-lg bg-gray-800 border border-white/5 text-gray-400 hover:text-white hover:bg-gray-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid Episode */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 transition-all duration-500">
        {currentEpisodes.map((ep, index) => (
          <Link
            key={index}
            href={ep.href} // Link ke player
            className="group relative flex items-center justify-center aspect-square rounded-lg bg-gray-800 border border-white/5 hover:bg-indigo-600 hover:border-indigo-400 transition-all duration-200"
          >
            <span className="text-sm md:text-lg font-bold text-gray-300 group-hover:text-white">
              {ep.chapterTitle.replace("Episode ", "").replace(" (End)", "")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}