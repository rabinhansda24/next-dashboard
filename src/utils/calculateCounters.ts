const calculateCounters = (trips: any[]) => {
    const counters = { total: 0, delivered: 0, delayed: 0, inTransit: 0 };

    trips.forEach((trip) => {
        counters.total += 1;
        if (trip.currenStatus === 'Delivered') counters.delivered += 1;
        else if (trip.currenStatus === 'In Transit') counters.inTransit += 1;
        else if (trip.currenStatus === 'Delayed') counters.delayed += 1
    });

    return counters;
}

export default calculateCounters;