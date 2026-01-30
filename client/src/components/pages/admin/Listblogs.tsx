import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react';
import type { Blog } from '../../../types';
import { blog_data } from '../../../assets/data';
import { useAppContext } from '../../../context/appContext';
import toast from 'react-hot-toast';

export default function Listblogs() {
  const [blog, setblog] = useState<Blog[]>([])
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs")
      if (data.success) {
        setblog(data.blogs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const deleteBlog = async (blog: Blog) => {
    const confirm = window.confirm("Are you sure you want to delete this blog")
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog.id })
      if (data.success) {
        toast.success(data.message)
        await fetchBlogs();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const toggelPublished = async (blog: Blog) => {
    try {
      const { data } = await axios.post("/api/blog/toggle-published", { id: blog.id })
      if (data.success) {
        toast.success(data.message)
        await fetchBlogs();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-white">All Blog Posts</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">#</th>
              <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">BLOG TITLE</th>
              <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">DATE</th>
              <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">STATUS</th>
              <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {blog.map((blog, index) => (
              <tr
                key={blog.id}
                className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-4 text-slate-400 text-sm">{index + 1}</td>
                <td className="px-6 py-4 text-slate-300 text-sm">{blog.title}</td>
                <td className="px-6 py-4 text-slate-400 text-sm">{new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 ${blog.isPublished ? "text-emerald-400 border border-emerald-500/20" : "text-orange-400 border border-slate-700/20"}`}>
                    {blog.isPublished ? "Published" : "Unpublished"}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <button onClick={ ()=>toggelPublished(blog)} className="px-4 py-1.5 text-xs font-medium text-slate-400 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
                    {blog.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => deleteBlog(blog)} className="ml-auto p-1.5 text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-lg hover:text-red-300 transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
