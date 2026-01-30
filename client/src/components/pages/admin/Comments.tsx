import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../../../context/appContext';
import type { Comment } from '../../../types';
export default function Comments() {
    const [comments, setComments] = useState<Comment[]>([]);

    const { axios } = useAppContext();

    const fetchComments = async () => {
        try {
            const { data } = await axios.get("/api/admin/comments")
            if (data.success) {
                setComments(data.comments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    const approveComment=async(comment : Comment)=>{
        try {
            const { data } = await axios.post("/api/admin/approve-comment",{id : comment.id})
            if (data.success) {
                toast.success(data.message)
                await fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

     const deleteComment=async(comment : Comment)=>{
        try {
            const confirm = window.confirm("Are you sure you want to delete this comment")
            if(!confirm) return;
            const { data } = await axios.post("/api/admin/delete-comment",{id : comment.id})
            if (data.success) {
                toast.success(data.message)
                await fetchComments()
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
        fetchComments();
    }, [])

    return (
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-serif text-white mb-6">Recent Comments</h2>
            <div className="space-y-4">
                {comments.map((comment, i) => (
                    <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                                <div className="w-10 h-10 bg-lime-400/10 rounded-full flex items-center justify-center text-lime-400 font-bold shrink-0">
                                    {comment.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-white font-semibold">{comment.name}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-lime-400/80 text-xs">
                                            on <span className="font-medium">{comment.blog.title}</span>
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => approveComment(comment)} className={`px-3 py-1.5 text-xs font-medium ${comment.isApproved ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : "text-red-400 bg-red-500/10 border border-red-500/20"} rounded-lg hover:bg-emerald-500/20 transition-all`}>
                                    {comment.isApproved ? "Approve" : "Not Approved"}
                                </button>
                                <button onClick={()=>deleteComment(comment)} className="p-1.5 text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-lg hover:text-red-300 transition-all">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
