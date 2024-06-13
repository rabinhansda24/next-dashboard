'use client';

import { useState, useEffect } from "react";

import calculateCounters from "@/utils/calculateCounters";
import calculateTATStatusForTrips from "@/utils/calculateTATStatus";
import handleSort from "@/utils/handleSort";

import Loading from "./loading";


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
      <h1 className="text-2xl font-bold text-center mb-4">Trips Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-xl font-bold">Total Trips</h2>
          <p className="text-3xl font-bold text-center">{counterValues.total}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-xl font-bold">Trips Delivered</h2>
          <p className="text-3xl font-bold text-center">{counterValues.delivered}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-xl font-bold">Trips Delayed</h2>
          <p className="text-3xl font-bold text-center">{counterValues.delayed}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-xl font-bold">Trips In Transit</h2>
          <p className="text-3xl font-bold text-center">{counterValues.inTransit}</p>
        </div>
      </div>
      <div className="mt-4">
        <table className="min-wfull bg-white">
          <thead>
            <tr>
              <th onClick={() => handleSortClick('tripId')} className="py-2 px-4 border-b">Trip id</th>
              <th onClick={() => handleSortClick('transporter')} className="py-2 px-4 border-b">Transporter</th>
              <th onClick={() => handleSortClick('source')} className="py-2 px-4 border-b">Source</th>
              <th onClick={() => handleSortClick('dest')} className="py-2 px-4 border-b">Destination</th>
              <th onClick={() => handleSortClick('phoneNumber')} className="py-2 px-4 border-b">Phone</th>
              <th onClick={() => handleSortClick('etaDays')} className="py-2 px-4 border-b">ETA</th>
              <th onClick={() => handleSortClick('distanceRemaining')} className="py-2 px-4 border-b">Distance remaining</th>
              <th onClick={() => handleSortClick('currenStatus')} className="py-2 px-4 border-b">trip status</th>
              <th onClick={() => handleSortClick('tatStatus')} className="py-2 px-4 border-b">TAT status</th>
            </tr>
          </thead>
          <tbody>
          {filteredTrips.map((trip: any) => (
              <tr key={trip._id}>
                <td className="py-2 px-4 border-b">{trip.tripId}</td>
                <td className="py-2 px-4 border-b">{trip.transporter}</td>
                <td className="py-2 px-4 border-b">{trip.source}</td>
                <td className="py-2 px-4 border-b">{trip.dest}</td>
                <td className="py-2 px-4 border-b">{trip.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{trip.etaDays}</td>
                <td className="py-2 px-4 border-b">{trip.distanceRemaining}</td>
                <td className="py-2 px-4 border-b">{trip.currenStatus}</td>
                <td className="py-2 px-4 border-b">{trip.tatStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}