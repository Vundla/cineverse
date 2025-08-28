// FILE: App.jsx
import './App.css'; // Add this import at the top

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">CINEVERSE</h1>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search for a movie..." 
            className="search-input"
          />
        </div>
        
        <div className="genre-filter">
          <button className="genre-button">Action</button>
          <button className="genre-button">Comedy</button>
          <button className="genre-button">Drama</button>
          <button className="genre-button">Horror</button>
          <button className="genre-button">Sci-Fi</button>
        </div>
      </header>
      
      <div className="movies-grid">
        <div className="movie-card">
          <img src="https://via.placeholder.com/300x450/1e293b/ffffff?text=Movie+Poster" alt="Movie title" className="movie-poster" />
          <div className="movie-info">
            <h3 className="movie-title">Sample Movie</h3>
            <p className="movie-year">2023</p>
          </div>
        </div>
        
        <div className="movie-card">
          <img src="https://via.placeholder.com/300x450/1e293b/ffffff?text=Movie+Poster" alt="Movie title" className="movie-poster" />
          <div className="movie-info">
            <h3 className="movie-title">Another Movie</h3>
            <p className="movie-year">2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 