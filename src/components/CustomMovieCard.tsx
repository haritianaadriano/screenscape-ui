import { Movie } from '../provider/types/Movie';

export default function CustomMovieCard({ item }: { item: Movie }) {
  return (
    <div className='m-20 max-w-sm flex-1 rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
      <img className='rounded-t-lg' src={item.poster} alt='' />
      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {item.title}
        </h5>

        <a
          href={item.streamingLink}
          className='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Read more
          <svg
            className='ms-2 h-3.5 w-3.5 rtl:rotate-180'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M1 5h12m0 0L9 1m4 4L9 9'
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
