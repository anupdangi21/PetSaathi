import "./App.css";
import Navbar from "./Navbar"; // Importing Navbar component
import Foot from "./foot"; // Importing foot component
import Info from "../images/info-image.png"; 


function App() {
  return (
    <div className="container">
      <header>
        <Navbar />
      </header>

      <main className="main-content">
        <section className="info-section">
          <div className="info-banner">
          <h2>Pet adoption is a compassionate act that not only provides a loving home to animals in need but also addresses larger societal and environmental issues. Every year, millions of animals end up in shelters due to abandonment, neglect, or overpopulation. By adopting a pet, you give these animals a second chance at life and reduce the demand for commercial breeding operations, which often prioritize profit over animal welfare.</h2>
              <img src={Info} alt="info" />
            </div>
        </section>

        <section className="recent-pets">
          <h2>Recently uploaded pets</h2>
          <div className="pet-cards">
            <div className="pet-card">
            <img src="/Images/Dog.png" alt="Logo" />
            <button className="view-details">View Details</button>
            </div>
            <div className="pet-card">
            <img src="/Images/cat.jpg" alt="Logo" />
              <button className="view-details">View Details</button>
            </div>
            <div className="pet-card">
              <button className="view-details">View Details</button>
            </div>
            <div className="pet-card">
              <button className="view-details">View Details</button>
            </div>
            <div className="pet-card">
              <button className="view-details">View Details</button>
            </div>
            

          </div>
          <button className="arrow-btn">View All</button>
        </section>
      </main>
      <footer>
        <Foot />
      </footer> 
    </div>
  );
}

export default App;
