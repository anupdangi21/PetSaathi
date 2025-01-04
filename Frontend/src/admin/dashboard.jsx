import React from "react";
import Logo from "../Images/logo.png";

const AdminDashboard = () => {
  return (
    <div className="grid gap-10 grid-cols-[14rem_auto_14rem] w-[96%] mx-auto">
      <aside className="h-screen bg-gray-100 shadow-md">
        <div className="flex justify-around items-center bg-white py-4 border-b">
          <div className="flex items-center gap-4">
            <img
              src={Logo}
              alt="Logo"
              className="w-16 h-16 rounded-full object-cover"
            />
            <h2 className="font-bold text-xl text-gray-700">PetSaathi</h2>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col bg-gray-50 h-[80vh] relative mt-4">
          <a
            href="/dashboard"
            className="flex items-center gap-4 text-gray-600 px-6 py-4 hover:bg-gray-200 hover:text-green-500 transition border-l-4 border-transparent hover:border-green-500"
          >
            <h3 className="font-medium text-sm">Admin Dashboard</h3>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 text-gray-600 px-6 py-4 hover:bg-gray-200 hover:text-green-500 transition border-l-4 border-transparent hover:border-green-500"
          >
            <h3 className="font-medium text-sm">Customers</h3>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 text-gray-600 px-6 py-4 hover:bg-gray-200 hover:text-green-500 transition border-l-4 border-transparent hover:border-green-500"
          >
            <h3 className="font-medium text-sm">Services</h3>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 text-gray-600 px-6 py-4 hover:bg-gray-200 hover:text-green-500 transition border-l-4 border-transparent hover:border-green-500"
          >
            <h3 className="font-medium text-sm">Approvals</h3>
          </a>
          <a
            href="/"
            id="log-out"
            className="flex items-center gap-4 text-gray-600 px-6 py-4 absolute bottom-4 w-full hover:bg-gray-200 hover:text-red-500 transition"
          >
            <h3 className="font-medium text-sm">Log out</h3>
          </a>
        </div>
      </aside>

      {/* Main Section */}
      <main className="mt-6">
        <h1 className="font-bold text-2xl text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-4 mt-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition">
            Search
          </button>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {["Total Sales", "Total Expenses", "Total Income"].map((title, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-800 font-bold text-sm">{title}</h3>
                  <h1 className="font-bold text-lg text-gray-700">$20,999</h1>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="absolute top-0 left-0 w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      className={`${
                        i === 0
                          ? "stroke-green-600"
                          : i === 1
                          ? "stroke-red-600"
                          : "stroke-green-400"
                      }`}
                      strokeWidth="5"
                      fill="none"
                    ></circle>
                  </svg>
                  <div className="absolute top-[25%] left-[25%] text-green-600 font-bold">
                    80%
                  </div>
                </div>
              </div>
              <small className="text-gray-500">Last 7 days</small>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="mt-8">
          <h1 className="text-gray-800 font-bold text-lg">Recent Orders</h1>
          <table className="bg-white w-full rounded-2xl p-6 shadow-md hover:shadow-lg transition mt-4 text-center">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Apple", qty: "100KG", price: "20.99$", status: "Delivered" },
                { name: "Banana", qty: "90KG", price: "14.99$", status: "Pending" },
                { name: "Tomato", qty: "25KG", price: "11.99$", status: "Delivered" },
              ].map((order, i) => (
                <tr key={i} className="border-b">
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                  <td>
                    <button
                      className={`py-1 px-3 rounded-md text-sm font-bold ${{
                        Delivered: "bg-green-500 text-white",
                        Pending: "bg-yellow-500 text-white",
                      }[order.status]}`}
                    >
                      {order.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Right Section */}
      <div className="mt-6">
        <div className="flex justify-start gap-8">
          <button id="menu_bar" className="hidden">
            <h3>Menu</h3>
          </button>
        </div>

        {/* Recent Approvals */}
        <div className="mt-12">
          <h2 className="font-bold text-gray-800 text-lg">Recent Approvals</h2>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 mb-4">
                <p className="text-gray-600">
                  <b className="text-gray-800">Name</b> requested for approval
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Analytics */}
        <div className="mt-8">
          <h2 className="font-bold text-gray-800 text-lg">Sales Analytics</h2>
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white flex justify-between items-center p-6 rounded-2xl shadow-md hover:shadow-lg transition mt-4"
            >
              <div>
                <h3 className="text-gray-800 font-bold text-sm">
                  {i === 0 ? "Online Orders" : "In-Store Sales"}
                </h3>
                <small className="text-gray-500">
                  Last seen {i === 0 ? "2 hours" : "15 minutes"} ago
                </small>
              </div>
              <div>
                <h5 className="text-red-600 font-bold text-sm">-17%</h5>
                <h3 className="font-bold text-gray-800">3000</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
