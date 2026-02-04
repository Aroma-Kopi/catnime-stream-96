import { headers } from "next/headers";
import { cache } from "react";

export const navigation = [
  { name: 'Dashboard', href: '/', current: true },
];

export const GetFilm = async (page = 1, query = "") => {
  try {
    const url = query 
      ? `https://api.sansekai.my.id/api/anime/search?query=${query}`
      : `https://api.sansekai.my.id/api/anime/recommended?page=${page}`;

    const response = await fetch(url);
    const data = await response.json();

    let listAnime = [];

    if (query) {
      listAnime = data?.data?.[0]?.result || [];
    } else {
      listAnime = Array.isArray(data) ? data : (data?.data || []);
    }

    return listAnime.map((item) => ({
      id: item.id,
      url: item.url,
      title: item.judul,
      poster: item.cover,
      episode: item.total_episode || "?",
      href: `/Detail/${item.url}`,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Jika gagal, kembalikan array kosong
  }
};

export const GetDetail = async (urlId) => {
  try {
    let url = (`https://api.sansekai.my.id/api/anime/detail?urlId=${urlId}`);
    let response = await fetch(url);
    let json = await response.json();

    if ((!json.data || json.data.length === 0) && !urlId.endsWith("/")){
      console.log(`Data kosong untuk ${urlId}, mencoba menambahkan trailing slash (/) ...`);
      url = `https://api.sansekai.my.id/api/anime/detail?urlId=${urlId}/`;
      response = await fetch(url);
      json = await response.json();
    }
    if (!json.data || json.data.length === 0) return null;
    const detail = json.data[0];

    return {
      id: detail.id,
      poster: detail.cover,
      title: detail.judul,
      rating: detail.rating,
      status: detail.status,
      published: detail.published,
      genre: detail.genre,
      description: detail.sinopsis,
      episodes: detail.chapter.reverse().map((item) => ({
        chapterTitle: item.ch,
        chapterUrl: item.url,
        href: `/Video/${item.url}`,
      }))
    }
  } catch(error) {
    console.log(`Gagal mengambil data anime: ${error}`);
    return null;
  }
}

export const GetVideo = async (chapterUrl, resolution = "") => {
  try {
    const resoParam = resolution ? `&reso=${resolution}` : "";
    let safeId = encodeURIComponent(chapterUrl);
    const fetchOption = {headers, cache: `no-store`};

    let url = (`https://api.sansekai.my.id/api/anime/getvideo?chapterUrlId=${safeId}${resoParam}`)
    let response = await fetch(url, fetchOption, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
      }
    });
    let json = await response.json();

    let receivedReso = (json.data && json.data.length > 0) ? json.data[0].stream[0].reso : null;
    const dataEmpty = !json.data || json.data.length === 0;
    const wrongReso = resolution && receivedReso && receivedReso !== resolution;

    if ((dataEmpty || wrongReso === 0) && !chapterUrl.endsWith("/")){
      console.log(`Data kosong untuk ${chapterUrl}, mencoba menambahkan trailing slash (/) ...`);

      let idWithSlash = `${chapterUrl}/`;
      let safeIdWithSlash = encodeURIComponent(idWithSlash);

      url = `https://api.sansekai.my.id/api/anime/getvideo?chapterUrlId=${safeIdWithSlash}${resoParam}`;
      response = await fetch(url, fetchOption);
      json = await response.json();
    }

    if (!json.data || json.data.length === 0) return null;
    const videoData = json.data[0];
    const firstStream = videoData.stream[0];

    return {
      videoUrl: firstStream?.link,
      currentReso: firstStream?.reso,
      resolution: videoData.reso,
      allStream: videoData.stream || []
    }
  } catch (error) {
    console.log(`gagal mengambil video: ${error}`);
    return null;
  }
};