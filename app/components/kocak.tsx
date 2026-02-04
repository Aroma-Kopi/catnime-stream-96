'use client'; 

import React, { useEffect, useState } from 'react';

interface StreamData {
  link: string;
  reso: string;
}

export default function VideoPlayer({ 
  initialUrl, 
  serverList 
}: { 
  initialUrl: string; 
  serverList: StreamData[] | null; 
}) {
  
  // State untuk menyimpan URL video yang sedang diputar saat ini
  const [currentUrl, setCurrentUrl] = useState(initialUrl);

  // Jika parent (halaman) mengganti episode/resolusi, reset player ke URL awal baru
  useEffect(() => {
    setCurrentUrl(initialUrl);
  }, [initialUrl]);

  // Cek tipe file (Video Native vs Iframe)
  const isNativeVideo = currentUrl.endsWith('.mp4') || currentUrl.includes('.mkv');

  return (
    <div className="flex flex-col gap-4">
      
      {/* --- 1. AREA PLAYER --- */}
      <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 relative">
        {isNativeVideo ? (
          <video 
            key={currentUrl} // Key berubah = Player reload otomatis
            controls 
            autoPlay 
            className="w-full h-full object-contain"
            poster="https://via.placeholder.com/1280x720?text=Loading+Video..."
          >
            <source src={currentUrl} type="video/mp4" />
            Browser Anda tidak mendukung tag video.
          </video>
        ) : (
          <iframe 
            key={currentUrl}
            src={currentUrl}
            className="w-full h-full border-none"
            allowFullScreen
            allow="autoplay; encrypted-media"
            title="Video Stream"
          />
        )}
      </div>

      {/* --- 2. AREA PILIH SERVER --- */}
      {serverList && serverList.length > 0 && (
        <div className="bg-gray-800/50 p-4 rounded-xl border border-white/5">
          
          {/* Teks Instruksi */}
          <p className="text-sm text-gray-400 mb-3">
            Silahkan Pilih Server lain jika server yang dipilih Lag.
          </p>

          {/* List Tombol Server */}
          <div className="flex flex-wrap gap-2">
            {serverList.map((stream, index) => {
              
              // Cek apakah tombol ini adalah link yang sedang diputar
              const isActive = stream.link === currentUrl;

              return (
                <button
                  key={index}
                  onClick={() => setCurrentUrl(stream.link)} // Ganti sumber video saat diklik
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition border border-white/10 flex items-center gap-2 ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20' // Style Aktif (Biru Terang)
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white' // Style Tidak Aktif
                  }`}
                >
                  {/* Indikator Titik Putih (Opsional, pemanis visual) */}
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  )}
                  Server {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}