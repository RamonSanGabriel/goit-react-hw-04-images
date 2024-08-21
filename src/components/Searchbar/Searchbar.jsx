import { FaSearch } from 'react-icons/fa';
import styles from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={styles.searchBar}>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <FaSearch />
          <span className={styles.searchFormButtonLabel}> Search </span>
        </button>
        <input
          className={styles.searchFormInput}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          name="search"
        />
      </form>
    </header>
  );
};
