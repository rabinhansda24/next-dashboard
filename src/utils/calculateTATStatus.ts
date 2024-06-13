const calculateTATStatus = (trip: any) => {
    const etaDays = trip.etaDays;
    const tripStartTime = new Date(trip.tripStartTime);
    const tripEndTime = trip.tripEndTime ? new Date(trip.tripEndTime) : new Date(trip.lastPingTime);
    const timeTaken = (Number(tripEndTime) - Number(tripStartTime)) / (1000 * 60 * 60 * 24);
    if (etaDays <= 0) {
        return 'Other';
    } else if (etaDays >= timeTaken) {
        return 'On Time';
    } else {
        return 'Delayed';
    }
}

const calculateTATStatusForTrips = (trips: any[]) => {
    return trips.map((trip) => ({
        ...trip,
        tatStatus: calculateTATStatus(trip)
    }))
}

export default calculateTATStatusForTrips;