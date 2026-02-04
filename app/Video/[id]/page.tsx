import Link from 'next/link';
import { GetVideo } from '@/app/components/Script';
import BackButton from '@/app/components/BackButton';
import VideoPlayer from '@/app/components/VideoPlayer';
import Navbar from '@/app/components/Navbar';

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ reso?: string; index?: string }>;
}) {
  const { id } = await params;
  const { reso, index } = await searchParams;
  const videoData = await GetVideo(id, reso);

  if (!videoData || !videoData.allStream) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Video tidak tersedia
      </div>
    );
  }
  const activeReso = videoData.currentReso; 
  const currentStreams = videoData.allStream.filter((s: any) => s.reso === activeReso && !s.link.includes("download"));
  const activeIndex = index ? parseInt(index) : 0;
  const selectedStream = currentStreams[activeIndex] || currentStreams[0];
  const finalVideoUrl = selectedStream?.link || videoData.videoUrl;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar></Navbar>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        
        {/* PLAYER (Hanya menerima 1 URL final) */}
        <VideoPlayer url={finalVideoUrl} />

        <div className="mt-6 space-y-6">

          {/* 1. PILIH SERVER */}
          {currentStreams.length > 0 && (
            <div className="p-4 bg-gray-800/50 border border-white/5 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 <p className="text-sm font-bold text-gray-300">
                   Pilih Server ({activeReso})
                 </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {currentStreams.map((stream: any, idx: number) => {
                  const isActive = idx === activeIndex;
                  return (
                    <Link
                      key={idx}
                      // Saat diklik, URL berubah -> Page Reload -> Server ganti
                      href={`/Video/${id}?reso=${activeReso}&index=${idx}`}
                      scroll={false}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition border border-white/10 flex items-center gap-2 ${
                        isActive
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Server {idx + 1}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. GANTI RESOLUSI */}
          <div className="p-4 bg-gray-800/50 border border-white/5 rounded-xl">
            <h1 className="text-sm font-bold text-gray-300 mb-3">Ganti Resolusi</h1>
            <div className="flex gap-2 flex-wrap">
              {videoData.resolution && videoData.resolution.map((r: string) => (
                <Link
                  key={r}
                  // Reset index ke 0 saat ganti resolusi
                  href={`/watch/${id}?reso=${r}`}
                  scroll={false}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition border border-white/10 ${
                    activeReso === r 
                      ? 'bg-indigo-600 text-white border-indigo-500' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}>
                  {r}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}