import "./App.css";
import Navbar from "./Navbar"; // Import Navbar component

function App() {
  return (
    <div className="container">
      <header className="header">
        <Navbar />
      </header>

      <main className="main-content">
        <section className="info-section">
          <div className="info-banner">Some information on pet adoption</div>
        </section>

        <section className="recent-pets">
          <h2>Recently uploaded pets</h2>
          <div className="pet-cards">
            <div className="pet-card">Pet 1</div>
            <div className="pet-card">Pet 2</div>
            <div className="pet-card">Pet 3</div>
            <div className="pet-card">Pet 4</div>
          </div>
          <button className="arrow-btn">→</button>
        </section>

        <section className="adoption-info">
          <h2>Some information on adoption</h2>
          <div className="adoption-details">
            <div className="info-box">Info Block 1</div>
            <div className="info-box">Info Block 2</div>
          </div>
        </section>
      </main>

      <footer className="footer">
        Footer
      </footer>
    </div>
  );
}

export default App;
