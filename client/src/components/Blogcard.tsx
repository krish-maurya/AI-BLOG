import { ThumbsUp, Bookmark } from 'lucide-react';

interface BlogCardProps {
  blog: any;
  onClick: () => void;
}

export default function Blogcard({ blog, onClick }: BlogCardProps) {
  const { title, description, image } = blog;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-lime-400 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-serif text-white mb-2 line-clamp-2">
          {title}
        </h3>
        <p
          className="text-sm text-slate-400 leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:border-lime-400 hover:text-lime-400 transition"
          >
            <ThumbsUp size={16} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:border-lime-400 hover:text-lime-400 transition"
          >
            <Bookmark size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
