'use client';

import { useState, useEffect } from "react";

import calculateCounters from "@/utils/calculateCounters";
import calculateTATStatusForTrips from "@/utils/calculateTATStatus";
import handleSort from "@/utils/handleSort";

import Loading from "./loading";

const statusClass: { [key: string]: string } = {
  'Delayed': 'status-delayed',
  'Booked': 'status-booked',
  'In Transit': 'status-in-transit',
  'Reached Destination': 'status-reached',
  'On Time': 'status-on-time',
  'Other': 'status-other',
}


export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState<any[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: "asc" });
  const [counterValues, setCounterValues] = useState({ total: 0, delivered: 0, delayed: 0, inTransit: 0 });


  function fetchTrips() {
    fetch("/api/trips")
      .then((res) => res.json())
      .then((data) => {
        const filtered = calculateTATStatusForTrips(data.data);
        setTrips(data.data)
        setFilteredTrips(filtered)
        setCounterValues(calculateCounters(data.data))
        setLoading(false)
      });
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleSortClick = (key: string) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    setFilteredTrips(handleSort(filteredTrips, key, direction))
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto my-4">
      <div className="mt-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-gray-600">Total trips</h2>
            <p className="text-2xl font-semibold">18,033</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-gray-600">Delivered</h2>
            <p className="text-2xl font-semibold">18,033</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-gray-600">Delayed</h2>
              <p className="text-2xl font-semibold">18,033</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-500 text-xl font-semibold">80%</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-gray-600">In transit</h2>
            <p className="text-2xl font-semibold">18,033</p>
          </div>
        </div>
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Trip List</h2>
            <div className="flex space-x-4">
              <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">Update Status</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Trip</button>
            </div>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">
                  <input type="checkbox" />
                </th>
                <th className="py-2 px-4 border-b border-gray-200">Trip id</th>
                <th className="py-2 px-4 border-b border-gray-200">Transporter</th>
                <th className="py-2 px-4 border-b border-gray-200">Source</th>
                <th className="py-2 px-4 border-b border-gray-200">Destination</th>
                <th className="py-2 px-4 border-b border-gray-200">Phone</th>
                <th className="py-2 px-4 border-b border-gray-200">ETA</th>
                <th className="py-2 px-4 border-b border-gray-200">Distance remaining</th>
                <th className="py-2 px-4 border-b border-gray-200">Trip status</th>
                <th className="py-2 px-4 border-b border-gray-200">TAT status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map((trip, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <input type="checkbox" />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-blue-500">{trip?.tripId}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{trip?.transporter}</td>
                  <td className="py-2 px-4 border-b border-gray-200">Venkatanarasimhraju</td>
                  <td className="py-2 px-4 border-b border-gray-200">Thiruvananthapuram</td>
                  <td className="py-2 px-4 border-b border-gray-200">9876543210</td>
                  <td className="py-2 px-4 border-b border-gray-200">01/01/24, 12:05am</td>
                  <td className="py-2 px-4 border-b border-gray-200">12</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <span className={`px-2 py-1 rounded ${index % 2 === 0 ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'}`}>
                      {index % 2 === 0 ? 'Delayed' : 'Booked'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <span className={`px-2 py-1 rounded ${index % 2 === 0 ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-500'}`}>
                      {index % 2 === 0 ? 'On time' : 'Other'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}