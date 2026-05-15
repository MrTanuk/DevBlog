import { Link, Outlet } from 'react-router-dom';
import { PenSquare, Terminal, Film } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" />
            <span className="font-semibold text-lg tracking-tight text-white">DevBlog</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/anime"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:text-indigo-400 text-sm transition-all"
            >
              <Film className="w-4 h-4" />
              <span>Top Anime</span>
            </Link>
            <Link
              to="/create"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:text-indigo-400 text-sm transition-all"
            >
              <PenSquare className="w-4 h-4" />
              <span>New Post</span>
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
