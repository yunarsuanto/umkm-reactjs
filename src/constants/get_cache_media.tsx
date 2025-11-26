// constants/get_cache_media.ts
const getCachedMediaUrl = async function (url: string) {
  if (typeof window === "undefined" || !("caches" in window)) {
    return url; // cache tidak tersedia → fallback ke URL asli
  }

  try {
    const cache = await caches.open("media-cache");
    const cached = await cache.match(url);

    if (!cached) {
      // fetch dan simpan ke cache
      const response = await fetch(url, { mode: "cors" });
      if (response.ok) {
        cache.put(url, response.clone());
      }
      return url;
    }

    const blob = await cached.blob();
    return URL.createObjectURL(blob);
  } catch (err) {
    console.warn("Cache API error:", err);
    return url; // fallback
  }
};

export default getCachedMediaUrl;
