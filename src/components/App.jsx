import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { getAPI } from '../pixabay-api';
import styles from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchImages(search, page);
    })();
    return () => {};
  }, [search, page]);

  const fetchImages = async (search, page) => {
    try {
      setIsLoading(true);

      const fetchedImages = await getAPI(search, page);

      const { hits, totalHits } = fetchedImages;

      if (search === '') return;

      if (hits.length === 0) {
        toast.error(
          'Sorry there are no images matching your search query. Please try again.'
        );
        setIsLoading(false);
        return;
      }
      if (page === 1) {
        toast.success(`Hooray! we found ${totalHits} images!`);
      }
      if (page * 12 >= totalHits) {
        setIsEnd(true);
        toast("We're sorry, but you've reached the end of search results.", {
          icon: '😔',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }

      setImages(prevImage => [...prevImage, ...hits]);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const newSearch = e.target.search.value.trim().toLowerCase();

    if (newSearch !== search) {
      setSearch(newSearch);
      setPage(1);
      setImages([]);
    }
  };
  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSubmit} />
      {images.length >= 1 && <ImageGallery photos={images} />}
      {images.length >= 2 && !isEnd && <Button onClick={handleClick} />}
      {isLoading && <Loader />}
      {isError &&
        toast.error('Oops, something went wrong! Reloading this page!')}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};
