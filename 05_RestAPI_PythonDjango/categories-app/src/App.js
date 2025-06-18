import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/categories/');
      setCategories(response.data);
      setError(null);
    } catch (err) {
      setError('Помилка завантаження категорій: ' + err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Завантаження категорій...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="container">
          <div className="error">
            <h2>Помилка</h2>
            <p>{error}</p>
            <button onClick={fetchCategories} className="retry-btn">
              Спробувати знову
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📂 Список категорій</h1>
          <p>Дані отримані з Django REST API</p>
        </header>

        {categories.length === 0 ? (
          <div className="empty-state">
            <h3>Категорії не знайдено</h3>
            <p>Схоже, що в базі даних немає категорій або API не повертає дані.</p>
            <button onClick={fetchCategories} className="retry-btn">
              Оновити
            </button>
          </div>
        ) : (
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-header">
                  <h3>{category.name}</h3>
                  <span className="category-slug">/{category.slug}</span>
                </div>
                <div className="category-details">
                  <div className="detail-item">
                    <strong>ID:</strong> {category.id}
                  </div>
                  <div className="detail-item">
                    <strong>Створено:</strong> {formatDate(category.created_at)}
                  </div>
                  <div className="detail-item">
                    <strong>Оновлено:</strong> {formatDate(category.updated_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="footer">
          <p>Всього категорій: {categories.length}</p>
          <button onClick={fetchCategories} className="refresh-btn">
            🔄 Оновити список
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App; 