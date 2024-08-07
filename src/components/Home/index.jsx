import React, { useState } from 'react';
import styles from './index.module.css';

function Home() {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = { name, year, price };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));

    setName('');
    setYear('');
    setPrice('');
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Item Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
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

      <h2 className={styles.heading}>Saved Items</h2>
      <div className={styles.cardContainer}>
        {items.map((item, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.name}</h3>
            <p className={styles.cardText}>Year: {item.year}</p>
            <p className={styles.cardText}>Price: {item.price}</p>
            <button className={styles.deleteButton} onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
