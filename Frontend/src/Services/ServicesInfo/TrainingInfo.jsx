import React from 'react';
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/foot";
import Obidence from "../../Images/obidence.jpg";
import Clicker from "../../Images/clicker.jpg";
import Socializating from "../../Images/socialization-training-dog-training.webp";
import Positive from "../../Images/positive-reinforcement-dog-training.jpg";
import Protection from "../../Images/belgian-malinois-dog-doing-bite-protection-training-defense-work-police-handler-360045906.webp";
import Relation from "../../Images/relationship-based-dog-training-Be-Patient-and-Kind.webp";

import { useNavigate } from 'react-router-dom';

const TrainingInfo = () => {
  const navigate = useNavigate();

  const trainingPrograms = [
    {
      title: "Obedience Training",
      image: Obidence,
      content: "Fundamental training to teach basic commands like sit, stay, come, and heel. Focuses on establishing clear communication between owner and dog.",
      reverse: false
    },
    {
      title: "Clicker Training",
      image: Clicker,
      content: "Positive reinforcement method using a clicker device to mark desired behaviors. Effective for precise timing in reward-based training.",
      reverse: true
    },
    {
      title: "Socialization Training",
      image: Socializating,
      content: "Helps dogs become comfortable with various environments, people, and animals. Crucial for developing confidence and preventing behavioral issues.",
      reverse: false
    },
    {
      title: "Positive Reinforcement Training",
      image: Positive,
      content: "Reward-based approach using treats, praise, or play to encourage good behavior. Focuses on reinforcing desired actions rather than punishing mistakes.",
      reverse: true
    },
    {
      title: "Protection Training",
      image: Protection,
      content: "Specialized training for guard dogs, teaching controlled protection skills and proper threat assessment. Requires professional guidance.",
      reverse: false
    },
    {
      title: "Relationship-based Training",
      image: Relation,
      content: "Focuses on strengthening the bond between dog and owner through mutual understanding and trust-building exercises.",
      reverse: true
    }
  ];

  const backBtn = () => {
    navigate("/services/training");
  };

  return (
    <div className="min-h-screen bg-orange-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={backBtn}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            BACK
          </button>
        </div>
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Dog Training Programs
        </h1>

        {trainingPrograms.map((program, index) => (
          <section 
            key={index}
            className={`flex flex-col md:flex-row ${program.reverse ? 'md:flex-row-reverse' : ''} 
            items-center gap-8 mb-20 p-6 rounded-lg shadow-sm`}
          >
            <div className="w-full md:w-1/2">
              <img
                src={program.image}
                alt={program.title}
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                {program.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {program.content}
              </p>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default TrainingInfo;
