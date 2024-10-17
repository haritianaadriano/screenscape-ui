import { useEffect, useState } from 'react';
import './App.css';
import { Skeleton } from '@mui/material';
import { client } from './provider/client';
import { Movie } from './provider/types/Movie';
import CustomCard from './components/CustomCard';
import emotionOptions from './provider/types/EmotionOptions';
import CustomMovieCard from './components/CustomMovieCard';

function App() {
  const [isLoading, setIsLoading] = useState<Boolean>();
  const [emotion, setEmotion] = useState<string>();
  const [movie, setMovie] = useState<Movie>();
  const [movies, setMovies] = useState<Movie[]>();

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setEmotion(e.currentTarget.value);
    console.log(emotion);
  };

  const handleClick1 = async (emotion: string) => {
    try {
      const data = await client
        .get<Movie[]>(`/movies?emotion=${emotion}`)
        .then((response) => response.data);

      setMovies(data);
      console.log(movies);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick0 = async () => {
    setIsLoading(true);
    try {
      const data = await client
        .get<Movie>('/movies/randomly')
        .then((response) => response);

      setMovie(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pingServer = async () => {
      try {
        client.get('/ping');
      } catch (err) {
        console.log(err);
      }
    };

    pingServer();
  }, []);

  return (
    <>
      <header>
        <div>
          <h1 className='text-3xl md:text-5xl'>Screenscape</h1>
          <h2 className='text-xl md:text-2xl'>Retrieve your movie</h2>
          <p className='mb-2 mt-5'>Your best friend to get randomly movies</p>
        </div>
      </header>

      <div>
        {isLoading ? (
          <Skeleton variant='rounded' width={250} height={200} />
        ) : movie ? (
          <CustomCard handleClick={handleClick0} item={movie} />
        ) : (
          <button
            onClick={handleClick0}
            className='rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400'
          >
            Suggest me
          </button>
        )}
      </div>

      <div className='flex max-w-sm'>
        <div className='mt-4'>
          <label className='mb-2 mt-10 block text-sm font-medium text-gray-900 dark:text-white'>
            We will give you movies for your feeling
          </label>
          <form className='mx-auto max-w-sm'>
            <select
              id='countries'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              onChange={handleChange}
            >
              {emotionOptions.map((emotionOption) => (
                <option value={emotionOption.value}>
                  {emotionOption.label}
                </option>
              ))}
            </select>
          </form>
        </div>

        <div className='ml-5 mt-20'>
          <button
            className='rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400'
            onClick={() => handleClick1(emotion!)}
          >
            List me movies
          </button>
        </div>
      </div>

      <div className='flex flex-wrap'>
        {movies?.map((movie) => <CustomMovieCard item={movie} />)}
      </div>
    </>
  );
}

export default App;
