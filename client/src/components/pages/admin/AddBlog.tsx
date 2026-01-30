import { Sparkles, X } from 'lucide-react';
import { parse } from 'marked';
import Quill from 'quill';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../../../context/appContext';

export default function AddBlog() {
  const { axios, navigate } = useAppContext();
  const [isadding, setIsadding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const editorRef = useRef(null);
  const quillRef = useRef<Quill | null>(null);
  const [image, setimage] = useState<File | boolean>(false);
  const [author, setAuthor] = useState('')
  const [title, settitle] = useState('');
  const [subtitle, setsubtitle] = useState('');
  const [category, setcategory] = useState('Startup');
  const [isPublished, setisPublished] = useState(false);

  const generatewithai = async () => {
    if (!title) return toast.error("Please Enter the title");
    try {
      setIsLoading(true);
      const baseURL = (import.meta as any).env.VITE_BASE_URL;
      
      const response = await fetch(`${baseURL}/api/blog/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // NO Authorization header at all
        },
        body: JSON.stringify({ prompt: title })
      });
      
      const data = await response.json();
      console.log(data)
      
      if (data.success) {
        if (data.content && quillRef.current) {
          const parsedContent = await parse(data.content);
          quillRef.current.root.innerHTML = parsedContent;
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handelSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsadding(true);
      if (!quillRef.current) {
        return
      }
      const blog = {
        title,
        subTitle: subtitle,
        description: quillRef.current.root.innerHTML,
        category,
        author,
        ispublished: isPublished,
      }

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog))
      if (image instanceof File) {
        formData.append('image', image);
      }

      const { data } = await axios.post("/api/blog/add", formData);
      if (data.success) {
        toast.success(data.message);
        setimage(false)
        settitle('')
        setAuthor('')
        setsubtitle('')
        quillRef.current.root.innerHTML = ''
        setcategory('StartUp')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) { toast.error(error.message); }
    } finally {
      setIsadding(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setimage(file);
    console.log(file);
  };

  useEffect(() => {
    // Initialize Quill editor only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }

  }, []);

  return (
    <form onSubmit={handelSubmit} className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-white">
              Create New Blog Post
            </h2>

            <button
              onClick={() => navigate(-1)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="space-y-6">
            {/* Blog Title */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Author <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter author name..."
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                required
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              />
            </div>

            {/* Blog Title */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Blog Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter an engaging blog title..."
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                required
                onChange={(e) => settitle(e.target.value)}
                value={title}
              />
            </div>

            {/* subTitle */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                subTitle <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Add a compelling subTitle"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                required
                onChange={(e) => setsubtitle(e.target.value)}
                value={subtitle}
              />
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Thumbnail Image <span className="text-red-400">*</span>
              </label>

              {/* Clickable upload area */}
              <label
                htmlFor="image"
                className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center
               hover:border-lime-400 transition-all cursor-pointer bg-slate-800/30
               flex flex-col items-center gap-3"
              >
                {!image ? (
                  <>
                    <div className="w-16 h-16 bg-lime-400/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-lime-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-white font-medium mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-slate-500 text-sm">
                        PNG, JPG or WEBP (max. 2MB)
                      </p>
                    </div>
                  </>
                ) : (
                  <img
                    src={URL.createObjectURL(image as File)}
                    alt="preview"
                    className="  object-cover w-full h-48 rounded-md"
                  />
                )}
              </label>

              {/* Actual file input */}
              <input
                id="image"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                onChange={handleFileChange}
                required
              />
            </div>


            {/* Category */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Blog Category <span className="text-red-400">*</span>
              </label>
              <select onChange={(e) => setcategory(e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all appearance-none cursor-pointer" required>
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="business">Business</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
              </select>
            </div>

            {/* Content Editor with AI Button */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Blog Content <span className="text-red-400">*</span>
              </label>


              {/* Styled Editor Div with AI Button Inside */}
              <div className="relative">
                <div
                  ref={editorRef}
                  contentEditable
                  className="ql"
                  data-placeholder="Write your blog content here... Use the toolbar above for formatting or click 'Generate with AI' to create content automatically."
                  style={{
                    caretColor: 'white'
                  }}
                />

                {/* AI Generation Button - Bottom Right */}
                {isLoading && (<div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
                  <div className='w-8 h-8 rounded-full border-2 border-t-lime-400 animate-spin'></div>
                </div>)}
                <button
                  disabled={isLoading}
                  onClick={generatewithai}
                  type="button"
                  className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 bg-linear-to-r from-lime-400 to-emerald-400 text-emerald-950 rounded-lg font-semibold text-sm hover:from-lime-500 hover:to-emerald-500 transition-all shadow-lg shadow-lime-400/20 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate with AI
                </button>
              </div>
            </div>

            {/* Publish Now Checkbox */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setisPublished(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-lime-400 focus:ring-2 focus:ring-lime-400 focus:ring-offset-0 cursor-pointer"
                />
                <div>
                  <span className="text-white font-medium group-hover:text-lime-400 transition-colors">
                    Publish Immediately
                  </span>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Make this blog post live immediately after creation
                  </p>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button disabled={isadding} type='submit' className="px-8 py-3 bg-lime-400 text-emerald-950 font-bold rounded-xl hover:bg-lime-500 active:scale-95 transition-all shadow-lg shadow-lime-400/20">
                {isadding ? "Adding ..." : "Add Blog"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
