
interface PaginationProps {
  totalCards: number;
  cardperPage: number;
  setCurrentPageBlog: (page: number) => void;
  currentPageBlog: number;
}

export const Pagination = ({ totalCards, cardperPage, setCurrentPageBlog, currentPageBlog }: PaginationProps) => {
  const totalPages = Math.ceil(totalCards / cardperPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-10 mb-12 flex-wrap">
      {/* Previous */}
      <button
        onClick={() => setCurrentPageBlog(Math.max(1, currentPageBlog - 1))}
        disabled={currentPageBlog === 1}
        className="px-4 py-2 rounded-full border border-slate-700 text-slate-300 hover:border-lime-400 hover:text-lime-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = currentPageBlog === page;

        return (
          <button
            key={page}
            onClick={() => setCurrentPageBlog(page)}
            className={`w-10 h-10 rounded-full text-sm font-semibold transition border ${
              isActive
                ? 'bg-lime-400 text-emerald-950 border-lime-400 shadow-md shadow-lime-400/30'
                : 'border-slate-700 text-slate-400 hover:border-lime-400 hover:text-lime-400'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => setCurrentPageBlog(Math.min(totalPages, currentPageBlog + 1))}
        disabled={currentPageBlog === totalPages}
        className="px-4 py-2 rounded-full border border-slate-700 text-slate-300 hover:border-lime-400 hover:text-lime-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};
