import { FileText, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { dashboard_data } from '../../../assets/data';
import type { Blog } from '../../../types';


export default function Dashboard() {

  const [dashboardData, setdashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [] as Blog[],
  })

  const fetchDashboardData = async () => {
    setdashboardData(dashboard_data);
  }

  useEffect(() => {
    fetchDashboardData();
  }, [])
  const stats = [
    { label: "Blogs", value: `${dashboard_data.blogs}`, icon: "📝" },
    { label: "Comments", value: `${dashboard_data.comments}`, icon: "💬" },
    { label: "Drafts", value: `${dashboard_data.drafts}`, icon: "📋" }
  ];
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-lime-400/10 rounded-xl flex items-center justify-center text-2xl">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Blogs Table */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-lime-400" />
            Latest Blogs
          </h2>
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
              {dashboardData.recentBlogs.map((blog, index) => (
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
                    <button className="px-4 py-1.5 mr-6 text-xs font-medium text-slate-400 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
                      { blog.isPublished ? "Unpublish" : "Publish" }
                    </button>
                    <button className="p-1.5 text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-lg hover:text-red-300 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
