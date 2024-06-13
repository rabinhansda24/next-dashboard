const handleSort = (trips: any[], key: string, direction: string) => {
    return [...trips].sort((a,b) => {
        if (a[key] < b[key]) {
            return direction === "asc" ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return direction === "asc" ? 1 : -1;
        }
        return 0;
    })
}

export default handleSort;