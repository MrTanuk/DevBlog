import { Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Post } from '../types';
import { Edit3, Trash2 } from 'lucide-react';

export function Home() {
  const [posts, setPosts] = useLocalStorage<Post[]>('blog-posts', []);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-medium text-white mb-2">No posts yet</h2>
        <p className="text-zinc-400 mb-6 text-sm">Be the first to share your thoughts.</p>
        <Link 
          to="/create" 
          className="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors text-sm font-medium shadow-sm shadow-indigo-500/20"
        >
          Write a post
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((post) => (
        <article key={post.id} className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group relative">
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button
               onClick={() => navigate(`/edit/${post.id}`)}
               className="p-2 rounded-md bg-zinc-800 text-zinc-300 hover:text-indigo-400 hover:bg-zinc-700 transition-colors"
               title="Edit Post"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
               onClick={() => handleDelete(post.id)}
               className="p-2 rounded-md bg-zinc-800 text-zinc-300 hover:text-red-400 hover:bg-zinc-700 transition-colors"
               title="Delete Post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <header className="mb-4 pr-12">
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-indigo-400 transition-colors">
              {post.title}
            </h2>
            <div className="flex gap-3 items-center text-xs tracking-widest uppercase text-zinc-500 font-medium">
               <time>
                 {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
               </time>
            </div>
          </header>
          
          <div 
            className="text-zinc-300 leading-relaxed line-clamp-3 overflow-hidden text-ellipsis mb-4"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} 
          />
          
          {/* Edited Tag positioned at bottom right */}
          {post.updatedAt && (
             <div className="text-right mt-4">
                <span className="text-xs text-indigo-400/70 italic bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20">
                  Edited: {new Date(post.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
             </div>
          )}
        </article>
      ))}
    </div>
  );
}
