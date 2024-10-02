import { useEffect, useState } from 'react';
import './App.css';
import { Skeleton } from '@mui/material';
import { client } from './provider/client';
import { Movie } from './provider/types/Movie';
import CustomCard from './components/CustomCard';

function App() {
  const [isLoading, setIsLoading] = useState<Boolean>();
  const [movie, setMovie] = useState<Movie>();

  const handleClick = async () => {
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
          <h1 className='text-2xl md:text-4xl'>Screenscape</h1>
          <h3>Retrieve your movie</h3>
        </div>
      </header>
      <div>
        {isLoading ? (
          <Skeleton variant='rounded' width={250} height={200} />
        ) : movie ? (
          <CustomCard handleClick={handleClick} item={movie} />
        ) : (
          <button
            onClick={handleClick}
            className='rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400'
          >
            Suggest me
          </button>
        )}
      </div>
    </>
  );
}

export default App;
