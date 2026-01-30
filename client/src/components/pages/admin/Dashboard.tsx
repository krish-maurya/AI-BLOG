import { FileText, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Book, MessageSquareText, PencilLine } from 'lucide-react'
import type { Blog } from '../../../types';
import { useAppContext } from '../../../context/appContext';
import toast from 'react-hot-toast';
import Listblogs from './Listblogs';



export default function Dashboard() {
  const { axios } = useAppContext();
  const [dashboardData, setdashboardData] = useState({
    blogs: 0,
    comments: 0,
    draft: 0,
    recentBlogs: [] as Blog[],
  })

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard")
      if (data.success) {
        setdashboardData(data.dashboardData)
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
    fetchDashboardData();
  }, [])
  const stats = [
    { label: "Blogs", value: `${dashboardData.blogs}`, icon: <Book /> },
    { label: "Comments", value: `${dashboardData.comments}`, icon: <MessageSquareText /> },
    { label: "Drafts", value: `${dashboardData.draft}`, icon: <PencilLine /> }
  ];
  console.log(stats)
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
              <div className="w-12 h-12 bg-lime-400/10  text-lime-400 rounded-xl flex items-center justify-center text-2xl">
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

      <Listblogs/>
    </div>
  )
}
