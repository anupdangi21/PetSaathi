import React from "react";
import { PawPrint, Search, AlertCircle } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/foot";
import { useNavigate } from "react-router-dom";
import useAuthGuard from "../Context/useAuthGuard.jsx";

const LostFound = () => {
    const withAuth = useAuthGuard();
    const navigate = useNavigate();

    const handleLostPet = () => {
        navigate("/lostfound/lost");
    };

    const handleFoundPet = () => {
        navigate("/lostfound/found");
    };

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center mb-4">
                            <PawPrint className="w-12 h-12 text-orange-500" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Pet Lost & Found</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Helping reunite pets with their families. Choose an option below to either report a lost pet
                            or help a found pet find their way home.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Lost pets div */}
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="p-8 text-center">
                                <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <AlertCircle className="w-10 h-10 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">I Lost My Pet</h2>
                                <p className="text-gray-600 mb-6">
                                    Report your missing pet and let our community help you find them.
                                </p>
                                <button
                                    onClick={handleLostPet}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
                                >
                                    Report Lost Pet
                                </button>
                            </div>
                        </div>

                        {/* Found Pet div */}
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="p-8 text-center">
                                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Search className="w-10 h-10 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">I Found a Pet</h2>
                                <p className="text-gray-600 mb-6">
                                    Help reunite a found pet with their worried family.
                                </p>
                                <button
                                    onClick={withAuth(handleFoundPet)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
                                >
                                    Report Found Pet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default LostFound;
