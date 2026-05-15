import { useState, useEffect, useRef, useCallback } from 'react';
import { useJikan } from '../hooks/useJikan';
import type { JikanResponse, JikanAnime } from '../types';
import {
  Search,
  X,
  Star,
  Film,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Calendar,
  Tv,
  Hash,
  Trophy,
} from 'lucide-react';

function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-zinc-900/40 border border-zinc-800/50 overflow-hidden animate-pulse"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="aspect-[3/4] bg-zinc-800/60" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-zinc-800/60 rounded w-3/4" />
            <div className="h-3 bg-zinc-800/60 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-5 bg-zinc-800/60 rounded-full w-14" />
              <div className="h-5 bg-zinc-800/60 rounded-full w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AnimeCard({
  anime,
  index,
  onClick,
}: {
  anime: JikanAnime;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:border-indigo-500/40 transition-all duration-300 overflow-hidden text-left animate-fade-in-up focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="aspect-[3/4] overflow-hidden bg-zinc-800/60">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-950/70 backdrop-blur-sm border border-zinc-800/50">
        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
        <span className="text-yellow-500 font-bold text-xs">{anime.score}</span>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2">
          {anime.title_english || anime.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {anime.genres.slice(0, 2).map((genre) => (
            <span
              key={genre.mal_id}
              className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
            >
              {genre.name}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3 text-xs text-zinc-500 pt-1">
          {anime.episodes && (
            <span className="flex items-center gap-1">
              <Tv className="w-3 h-3" />
              {anime.episodes} ep.
            </span>
          )}
          {anime.year && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {anime.year}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function AnimeModal({
  anime,
  onClose,
}: {
  anime: JikanAnime;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative max-w-lg w-full max-h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 animate-fade-in-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shrink-0">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full aspect-[16/9] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-zinc-950/70 backdrop-blur-sm border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-xl font-bold text-white leading-tight">
              {anime.title_english || anime.title}
            </h2>
            {anime.title_english && anime.title !== anime.title_english && (
              <p className="text-sm text-zinc-400 mt-0.5">{anime.title}</p>
            )}
          </div>
        </div>

        <div className="overflow-y-auto p-5 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
              <Star className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500">Score</p>
                <p className="text-sm font-semibold text-white">{anime.score}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
              <Trophy className="w-4 h-4 text-indigo-400" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500">Rank</p>
                <p className="text-sm font-semibold text-white">#{anime.rank}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
              <Tv className="w-4 h-4 text-zinc-400" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500">Type</p>
                <p className="text-sm font-semibold text-white capitalize">{anime.type.toLowerCase()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
              <Hash className="w-4 h-4 text-zinc-400" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500">Episodes</p>
                <p className="text-sm font-semibold text-white">{anime.episodes ?? '??'}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-zinc-400" />
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Synopsis</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed line-clamp-6">
              {anime.synopsis || 'No synopsis available.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {anime.genres.map((genre) => (
              <span
                key={genre.mal_id}
                className="text-[11px] uppercase tracking-wider font-medium px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-zinc-500 pt-1 border-t border-zinc-800">
            {anime.status && (
              <span className={`flex items-center gap-1 ${anime.status === 'Currently Airing' ? 'text-green-400' : ''}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${anime.status === 'Currently Airing' ? 'bg-green-400 animate-pulse' : 'bg-zinc-500'}`} />
                {anime.status}
              </span>
            )}
            {anime.year && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {anime.year}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Anime() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnime, setSelectedAnime] = useState<JikanAnime | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const endpoint = searchTerm
    ? `/anime?q=${encodeURIComponent(searchTerm)}&limit=6&order_by=score&sort=desc&sfw`
    : '/top/anime?limit=6';

  const { data, loading, error, refetch } = useJikan<JikanResponse>(endpoint);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed && trimmed !== searchTerm) {
        setSearchTerm(trimmed);
      }
    },
    [query, searchTerm],
  );

  const clearSearch = useCallback(() => {
    setQuery('');
    setSearchTerm('');
    inputRef.current?.focus();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Film className="w-7 h-7 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Anime</h1>
            <p className="text-zinc-500 text-sm mt-0.5">
              {searchTerm
                ? `Search results for "${searchTerm}"`
                : 'Top anime on MyAnimeList'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anime..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-sm shadow-indigo-500/20 active:scale-95"
          >
            Search
          </button>
        </form>
      </div>

      {searchTerm && (
        <div className="flex items-center gap-2 mb-6 text-sm text-zinc-400">
          <span>
            Showing results for: <span className="text-white font-medium">"{searchTerm}"</span>
          </span>
          <button
            onClick={clearSearch}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-xs transition-all"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        </div>
      )}

      {loading && <SkeletonGrid />}

      {error && (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
          <AlertCircle className="w-12 h-12 text-red-400/80 mb-4" />
          <p className="text-red-400 font-medium mb-1">Failed to load anime</p>
          <p className="text-zinc-500 text-sm mb-6">{error}</p>
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:text-indigo-400 text-sm transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      )}

      {!loading && !error && data && data.data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
          <Search className="w-12 h-12 text-zinc-600 mb-4" />
          <p className="text-white font-medium mb-1">No results found</p>
          <p className="text-zinc-500 text-sm mb-6">
            No anime matches "{searchTerm}". Try a different search.
          </p>
          <button
            onClick={clearSearch}
            className="px-5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:text-indigo-400 text-sm transition-all"
          >
            Back to Top Anime
          </button>
        </div>
      )}

      {!loading && !error && data && data.data.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((anime, i) => (
            <AnimeCard
              key={anime.mal_id}
              anime={anime}
              index={i}
              onClick={() => setSelectedAnime(anime)}
            />
          ))}
        </div>
      )}

      {selectedAnime && (
        <AnimeModal
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
        />
      )}
    </div>
  );
}
