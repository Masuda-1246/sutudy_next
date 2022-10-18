import Link from 'next/link';

const Pagination = ({ pages, current_page = 1 }) => {
  return (
    <div class="flex items-center space-x-1 mt-8">
      {pages.map((page) => (
        <Link href={`/page/${page}`} key={page}>
          <a
            className={`px-4 py-2 border hover:bg-black hover:text-white ${
              current_page == page && 'bg-black text-white'
            }`}
          >
            {page}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;