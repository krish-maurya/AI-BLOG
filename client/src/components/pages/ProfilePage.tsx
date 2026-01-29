import { Camera, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        name: 'Admin User',
        email: 'admin@inspier.ai',
        bio: 'Content creator and blog enthusiast',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log('Image uploaded:', file);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 relative overflow-hidden">
            {/* Decorative Background Blurs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-950/30 rounded-full blur-3xl"></div>

            {/* Profile Container */}
            <div className="relative z-10 max-w-4xl mx-auto pt-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                        <span className="text-xs font-semibold text-white uppercase tracking-widest">Profile Settings</span>
                    </div>

                    <h1 className="font-serif text-5xl text-white mb-3 italic">
                        inspier
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Manage your account settings and preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card - Left Side */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
                            <div className="text-center">
                                {/* Profile Picture */}
                                <div className="relative inline-block mb-6">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center text-emerald-950 font-bold text-4xl">
                                        AU
                                    </div>
                                    <label htmlFor="profile-image" className="absolute bottom-0 right-0 w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-lime-500 transition-colors shadow-lg">
                                        <Camera className="w-5 h-5 text-emerald-950" />
                                        <input
                                            id="profile-image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-1">{formData.name}</h2>
                                <p className="text-slate-400 text-sm mb-6">{formData.email}</p>

                                {/* Quick Stats */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                                        <span className="text-slate-400 text-sm">Total Posts</span>
                                        <span className="text-lime-400 font-semibold">42</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                                        <span className="text-slate-400 text-sm">Joined</span>
                                        <span className="text-slate-300 font-semibold text-sm">Jan 2024</span>
                                    </div>
                                </div>

                                {/* Logout Button */}
                                <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/20 transition-all">
                                    <LogOut className="w-4 h-4" />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}