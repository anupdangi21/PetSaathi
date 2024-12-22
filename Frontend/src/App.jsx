import "./App.css";
import Navbar from "./Navbar"; // Importing Navbar component
import Foot from "./foot"; // Importing foot component
import info from "../images/info-image.png"; 


function App() {
  return (
    <div className="container">
      <header>
        <Navbar />
      </header>

      <main className="main-content">
        <section className="info-section">
          <div className="info-banner">
          Pet adoption is a compassionate act that not only provides a loving home to animals in need but also addresses larger societal and environmental issues. Every year, millions of animals end up in shelters due to abandonment, neglect, or overpopulation. By adopting a pet, you give these animals a second chance at life and reduce the demand for commercial breeding operations, which often prioritize profit over animal welfare.
              <img src={info} alt="info" />
            </div>
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
          <h2>Some more information on adoption</h2>
          <div className="adoption-details">
            <div className="info-box">Info Block 1</div>
            <div className="info-box">Info Block 2</div>
          </div>
        </section>
      </main>
      <footer>
        <Foot />
      </footer> 
    </div>
  );
}

export default App;
