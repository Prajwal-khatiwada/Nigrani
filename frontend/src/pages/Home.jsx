import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [recentSuspects, setRecentSuspects] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/suspects")
      .then((res) => {
        // Get last 3 suspects and reverse to show newest first
        const sorted = res.data.reverse().slice(0, 3);
        setRecentSuspects(sorted);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex w-full h-screen overflow-y-hidden bg-gray-50">
      <div className="w-[18%]">
        <Sidebar />
      </div>
      <div className="w-[82%] h-full overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
            <p className="text-gray-600">Welcome to NIGRANI Surveillance System</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">System Status</p>
            <p className="text-green-600 font-semibold mb-2">● Online</p>
            <button
              onClick={handleLogout}
              className="text-xs text-red-600 hover:text-red-800 font-medium underline"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-900">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Suspects Detected</h2>
            <Link to="/suspects" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All Suspects &rarr;
            </Link>
          </div>

          {recentSuspects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentSuspects.map((suspect, index) => {
                    // Parse filename for date/time
                    // Format: YYYYMMDD/HHMMSS.jpg
                    const parts = suspect.file_name.split('/');
                    const datePart = parts[0]; // YYYYMMDD
                    const timePart = parts[1].split('.')[0]; // HHMMSS

                    const year = datePart.slice(0, 4);
                    const month = datePart.slice(4, 6);
                    const day = datePart.slice(6, 8);

                    const hour = timePart.slice(0, 2);
                    const min = timePart.slice(2, 4);

                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={`http://127.0.0.1:5000/images/${suspect.file_name}`}
                            alt="Suspect"
                            className="h-16 w-24 object-cover rounded-md border border-gray-200"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{year}-{month}-{day}</div>
                          <div className="text-sm text-gray-500">{hour}:{min}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {suspect.location}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No recent suspects detected.
            </div>
          )}
        </div>

        {/* Quick Actions or Other Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/tool" className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Access Surveillance Tool
              </Link>
              <div className="p-4 bg-green-50 rounded-md border border-green-200">
                <h4 className="font-semibold text-green-800 mb-1">Mission: Clean City</h4>
                <p className="text-xs text-green-700">
                  Our objective is to maintain a waste-free environment through active surveillance and rapid response.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Info</h3>
            <p className="text-sm text-gray-600 mb-2"><strong>Version:</strong> 1.0.0</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Last Update:</strong> Nov 20, 2025</p>
            <p className="text-sm text-gray-600"><strong>Support:</strong> contact@nigrani.gov.np</p>
          </div>
        </div>

        <div className="mt-8 mb-4 text-center text-gray-500 text-sm">
          Developed by: Prajwal Khatiwada
        </div>
      </div>
    </div >
  );
};

export default Home;
