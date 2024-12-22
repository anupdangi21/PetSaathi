import React from 'react';
import './admin.css'; 

const AdminDashboard = () => {
  return (
    <div className="container">
      <aside>
        <div className="top">
          <div className='logo'>
          <img src="/Images/logo.png" alt="Logo" />
          <h2>
                PetSaathi
          </h2>
        </div>
        </div>
        {/* Sidebar */}
        <div className="sidebar">
          <a href="admin" className="active">
            <h3>Admin Dashboard</h3>
          </a>
          <a href="customers">
            <h3>Customers</h3>
          </a>
          <a href="services">
            <h3>Services</h3>
          </a>
          <a href="approval.html">
            <h3>Approvals</h3>
          </a>
          <a href="#" id="log-out">
            <h3>Log out</h3>
          </a>
        </div>
      </aside>

      {/* Main Section */}
      <main>
        <h1>Dashboard</h1>
        <div className="search">
          <div className="search-box">
            <input type="text" placeholder="Search for products.." />
          </div>
          <div className="button">
            <input type="submit" value="Search" />
          </div>
        </div>

        {/* Insights */}
        <div className="insights">
          <div className="sales">
            <div className="middle">
              <div className="left">
                <h3>Total Sales</h3>
                <h1>$20,999</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle r="30" cy="50" cx="50"></circle>
                </svg>
                <div className="number">80%</div>
              </div>
            </div>
            <small>Last 7 days</small>
          </div>

          <div className="expenses">
            <div className="middle">
              <div className="left">
                <h3>Total Expenses</h3>
                <h1>$20,999</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle r="30" cy="50" cx="50"></circle>
                </svg>
                <div className="number">80%</div>
              </div>
            </div>
            <small>Last 7 days</small>
          </div>

          <div className="income">
            <div className="middle">
              <div className="left">
                <h3>Total Income</h3>
                <h1>$20,999</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle r="30" cy="50" cx="50"></circle>
                </svg>
                <div className="number">80%</div>
              </div>
            </div>
            <small>Last 7 days</small>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="Recent_order">
          <h1>Recent Orders</h1>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Apple</td>
                <td>100KG</td>
                <td>20.99$</td>
                <td>
                  <button className="btn btn-success">Delivered</button>
                </td>
              </tr>
              <tr>
                <td>Banana</td>
                <td>90KG</td>
                <td>14.99$</td>
                <td>
                  <button className="btn btn-success">Pending</button>
                </td>
              </tr>
              <tr>
                <td>Tomato</td>
                <td>25KG</td>
                <td>11.99$</td>
                <td>
                  <button className="btn btn-success">Delivered</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* Right Section */}
      <div className="right">
        <div className="top">
          <button id="menu_bar">
            <h3>Menu</h3>
          </button>
        </div>

        <div className="recent_updates">
          <h2>Recents Approvals</h2>
          <div className="updates">
            {[...Array(3)].map((_, i) => (
              <div className="update" key={i}>
                <div className="message">
                  <p>
                    <b>Name</b> Requested for approval
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sales_analytics">
          <h2>Sales Analytics</h2>
          {[...Array(2)].map((_, i) => (
            <div className="item" key={i}>
              <div className="right_text">
                <div className="info">
                  <h3>Online Orders</h3>
                  <small className="text-muted">
                    Last seen {i === 0 ? '2 hours' : '15 minutes'} ago
                  </small>
                </div>
                <h5 className="negative">-17%</h5>
                <h3>3000</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
