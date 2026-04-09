import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Post } from '../types';

export function CreatePost() {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useLocalStorage<Post[]>('blog-posts', []);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load existing post if editing
  useEffect(() => {
    if (id) {
      const existingPost = posts.find(p => p.id === id);
      if (existingPost) {
        setTitle(existingPost.title);
        setContent(existingPost.content);
        setIsEditing(true);
      }
    }
  }, [id, posts]);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || content.trim() === '<p><br></p>') return;

    if (isEditing && id) {
      const updatedPosts = posts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            title: title.trim(),
            content: content,
            updatedAt: new Date().toISOString()
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } else {
      const newPost: Post = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content,
        createdAt: new Date().toISOString(),
      };
      setPosts([...posts, newPost]);
    }

    navigate('/');
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'code-block'],
      ['clean']
    ],
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-medium text-zinc-400">
          {isEditing ? 'Editing Post' : 'Create New Post'}
        </h1>
      </div>
      <form onSubmit={handlePublish} className="space-y-6">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title..."
            className="w-full bg-transparent text-4xl font-bold tracking-tight text-white placeholder:text-zinc-400 focus:outline-none border-b border-zinc-800 focus:border-indigo-500 pb-4 mb-4 transition-colors"
            autoFocus
          />
        </div>

        <div className="rounded-md ring-1 ring-zinc-800 focus-within:ring-indigo-500 focus-within:ring-2 transition-all bg-zinc-900/50">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Write your thoughts here..."
            className="text-white"
          />
        </div>

        <div className="flex justify-end pt-4 gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-md bg-transparent border border-zinc-700 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim() || !content.trim() || content.trim() === '<p><br></p>'}
            className="px-8 py-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? 'Save Changes' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
