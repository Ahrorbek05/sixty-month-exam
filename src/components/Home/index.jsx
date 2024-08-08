import React, { useState } from 'react';
import styles from './index.module.css';

function Home() {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState(() => {
    const storeItems = localStorage.getItem('items');
    return storeItems ? JSON.parse(storeItems) : [];
  });
  const [error, setError] = useState('');

function handleSubmit(event) {
    event.preventDefault();

    if (!name) {
      setError('Name is required.');
      return;
    }

    if (!/^\d{4}$/.test(year)) {
      setError('Year must be a valid 4-digit number.');
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(price) || parseFloat(price) <= 0) {
      setError('Price must be a positive number.');
      return;
    }

    setError('');

    const newItem = { name, year, price };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));

    setName('');
    setYear('');
    setPrice('');
  };

function handleDelete(index) {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      localStorage.setItem('items', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Mashinalar haqida ma'lumot</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Year:</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Save</button>
      </form>

      <h2 className={styles.heading}>Kiritilgan ma'lumotlar</h2>
      <div className={styles.cardContainer}>
        {items.map((item, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.name}</h3>
            <p className={styles.cardText}>Year: {item.year}</p>
            <p className={styles.cardText}>Price: {item.price}</p>
            <button className={styles.deleteButton} onClick={() => handleDelete(index)}><i class="fa-regular fa-trash-can"></i></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
