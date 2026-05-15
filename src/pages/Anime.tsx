import { useJikan } from '../hooks/useJikan';
import type { JikanResponse, JikanAnime } from '../types';
import { Loader2, AlertCircle, Star, Film, RefreshCw } from 'lucide-react';

function AnimeCard({ anime }: { anime: JikanAnime }) {
  return (
    <article className="group relative flex flex-col rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all overflow-hidden">
      <div className="aspect-[3/4] overflow-hidden bg-zinc-800">
        <img
          src={anime.images.webp.image_url}
          alt={anime.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 flex-1">
            {anime.title_english || anime.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-yellow-500 font-bold text-sm">{anime.score}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {anime.genres.slice(0, 3).map((genre) => (
            <span
              key={genre.mal_id}
              className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
            >
              {genre.name}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3 text-xs text-zinc-500">
          {anime.episodes && (
            <span>{anime.episodes} ep.</span>
          )}
          {anime.year && (
            <span>{anime.year}</span>
          )}
          <span className={`ml-auto ${anime.status === 'Currently Airing' ? 'text-green-400' : 'text-zinc-500'}`}>
            {anime.status === 'Currently Airing' ? 'Airing' : anime.status}
          </span>
        </div>
      </div>
    </article>
  );
}

function Preloader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-4" />
      <p className="text-zinc-400 text-sm">Loading top anime...</p>
    </div>
  );
}

export function Anime() {
  const { data, loading, error, refetch } = useJikan<JikanResponse>('/top/anime?limit=6');

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Film className="w-7 h-7 text-indigo-400" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Top Anime</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Highest ranked anime on MyAnimeList</p>
        </div>
      </div>

      {loading && <Preloader />}

      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
          <p className="text-red-400 text-sm font-medium mb-1">Failed to load anime</p>
          <p className="text-zinc-500 text-xs mb-6">{error}</p>
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-5 py-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:text-indigo-400 text-sm transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}
