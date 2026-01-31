import { ArrowLeft, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { blog_data } from '../../assets/data.ts';
import { useAppContext } from '../../context/appContext.tsx';
import type { Blog } from '../../types/index.ts';
import Blogcard from '../Blogcard.tsx';
import { Pagination } from './Pagination.tsx';

interface BlogpageProps {
  setCurrentPage?: (page: string) => void;
}

export default function Blogpage({ setCurrentPage }: BlogpageProps) {
  const { blogs, navigate ,token } = useAppContext();


  const [menu, setMenu] = useState('All');
  const [currentPageBlog, setCurrentPageBlog] = useState(1);
  const [cardperPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');

  const filterBlogs = () => {
    if (searchQuery === '') {
      return blogs
    }
    return blogs.filter((blog: Blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || blog.category.toLocaleLowerCase().includes(searchQuery.toLowerCase()));
  }

  const lastCardIndex = currentPageBlog * cardperPage;
  const firstCardIndex = lastCardIndex - cardperPage;
  const currentCards = filterBlogs().slice(firstCardIndex, lastCardIndex);

  const blogCategories = ['All', 'Technology', 'Lifestyle', 'Business', 'Travel', 'Food'];

  const handelCreateClick = () =>{
    if(token){
      navigate('/addblog')
    }else{
      navigate('/login')
    }
    
  }

  const handleBackClick = () => {
    setCurrentPage?.('home');
  };

  const handleBlogClick = (id: string) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-slate-200 px-6 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <button
            onClick={() => handleBackClick()}
            className="flex some-specific-classitems-center gap-2 text-slate-300 hover:text-lime-400 transition"
          ><ArrowLeft size={18} />
            <span className="text-sm font-semibold tracking-widest uppercase">Back</span>
          </button>

          {/* Search */}
          <div className="flex w-full max-w-xl bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-5 py-3 bg-transparent outline-none text-sm"
            />
            <button className="px-5 text-slate-400 hover:text-lime-400">
              <Search size={18} />
            </button>
          </div>

          {/* Create */}
          <button onClick={() => handelCreateClick ()} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-400 text-emerald-950 font-semibold hover:scale-105 transition">
            <Plus size={18} /> Create Blog
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-3 some-specific-class mt-8 overflow-x-auto justify-center">
          {blogCategories.map((category) => (
            <button
              key={category}
              onClick={() => setMenu(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition whitespace-nowrap ${menu === category
                ? 'bg-lime-400 text-emerald-950 border-lime-400'
                : 'border-slate-700 text-slate-400 hover:border-lime-400 hover:text-lime-400'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-8" />
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {currentCards
          .filter((blog: Blog) =>
            menu === 'All' ? true : blog.category.toLowerCase() === menu.toLowerCase()
          )
          .filter((blog: Blog) =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((blog: Blog) => (
            <Blogcard
              key={blog.id}
              blog={blog}
              onClick={() => handleBlogClick(blog.id)}
            />
          ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalCards={blog_data.length}
        cardperPage={cardperPage}
        setCurrentPageBlog={setCurrentPageBlog}
        currentPageBlog={currentPageBlog}
      />

      {/* Footer */}
      <footer className="mt-20 py-10 text-center border-t border-slate-800">
        <p className="text-xs text-slate-500 tracking-widest uppercase">
          © 2024 Inspire Blog · Crafted with React
        </p>
      </footer>
    </div>
  );
}
