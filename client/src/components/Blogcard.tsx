import type { Blog } from '../types';

interface BlogCardProps {
  blog: Blog;
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
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
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
      </div>
    </div>
  );
}
