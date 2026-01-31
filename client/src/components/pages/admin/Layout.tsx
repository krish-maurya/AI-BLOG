import { LayoutDashboard, List, LogOut, Menu, MessageSquare, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../../../context/appContext';
import AddBlog from './AddBlog';
import Comments from './Comments';
import Dashboard from './Dashboard';
import Listblogs from './Listblogs';

export default function Layout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { navigate, axios, setToken } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null)
    localStorage.removeItem('currentPage')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center shadow-lg shadow-lime-400/20">
              <span className="text-emerald-950 text-xl font-bold">i</span>
            </div>
            <span className="font-serif text-xl text-white italic">inspier</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard'
                    ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('addBlogs')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'addBlogs'
                    ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add blogs</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('blogsList')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'blogsList'
                    ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                <List className="w-5 h-5" />
                <span className="font-medium">Blogs list</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('comments')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'comments'
                    ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Comments</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-xl font-semibold text-white">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'addBlogs' && 'Add New Blog'}
                {activeTab === 'blogsList' && 'Blogs List'}
                {activeTab === 'comments' && 'Comments'}
              </h1>
            </div>
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-lime-400 text-emerald-950 rounded-xl font-medium hover:bg-lime-500 transition-all">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && (
            <Dashboard />
          )}

          {activeTab === 'addBlogs' && (
            <AddBlog />
          )}

          {activeTab === 'blogsList' && (
            <Listblogs />
          )}

          {activeTab === 'comments' && (
            <Comments />
          )}
        </main>
      </div>
    </div>
  );
}