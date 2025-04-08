import { React, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Aside from "../Components/aside";
import { AppContext } from '../Context/AppContext';

const VendorProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    number: '',
    username: '',
    password: '',
    organizationname: "",
    experience: ""
  });
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AppContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = JSON.parse(localStorage.getItem('user_data'));
      if (!userData?.user?.email) {
        Swal.fire("Error", "Please login first!", "error");
        navigate('/login');
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/registration");
        if (!response.ok) throw new Error('Failed to fetch user data');
        
        const { data } = await response.json();
        const currentUser = data.find(user => 
          user.email === userData.user.email
        );

        if (!currentUser) throw new Error('User data not found');
        
        setFormData({
          organizationname: currentUser.organizationname || "",
          number: currentUser.number || '',
          username: currentUser.username || '',
          password: '',
          experience: currentUser.experience || ""
        });
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('user_data'));

    try {
      const response = await fetch(
        `http://localhost:3000/registration/${encodeURIComponent(userData.user.email)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('userToken')}`
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message);

      // Update local storage
      const updatedUser = { 
        ...userData.user,
        ...result.user
      };
      localStorage.setItem('user_data', JSON.stringify({
        user: updatedUser,
        token: result.token
      }));

      Swal.fire({
        title: "Profile Updated",
        text: "Your profile has been updated successfully. Please login again with your new credentials.",
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          logout();
          navigate('/');
        }
      });

    } catch (error) {
      Swal.fire("Error", error.message, "error");
      console.error("Update error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="bg-gray-50 flex">
      <aside>
        <Aside />
      </aside>
      <main className="flex-1 bg-zinc-100 ml-60 mt-8">
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-8">
          <div className="bg-gradient-to-r from-zinc-300 to-zinc-200 rounded-xl shadow-lg p-8 w-full max-w-md mx-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-800 text-center">
                Update your Profile
              </h1>
              <p className="text-center text-sm text-gray-600 mb-4">
                Note: Email cannot be updated
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Organization name
                  </label>
                  <input
                    type="text"
                    name="organizationname"
                    value={formData.organizationname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                {formData.experience && (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Experience
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/vendordashboard')}
                  className="flex-1 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorProfile;