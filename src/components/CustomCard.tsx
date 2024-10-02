import { Movie } from '../provider/types/Movie';

export default function CustomCard({ item }: { item: Movie }) {
  return (
    <div className='overflow-hidden rounded shadow-lg w-250 h-200'>
      <div className='relative'>
        <a href={item.streamingLink}>
          <img className='w-full' src={item.poster} alt='' />
        </a>
      </div>
      <div className='px-6 py-4'>
        <a
          href={item.streamingLink}
          className='inline-block text-lg font-semibold transition duration-500 ease-in-out'
        >
          {item.title}
        </a>
      </div>
    </div>
  );
}
