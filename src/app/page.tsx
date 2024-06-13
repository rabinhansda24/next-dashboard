'use client';

import { useState, useEffect } from "react";


export default function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            setLoading(false);
        });
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
        {data.map((item: any) => (
            <div key={item?.id}>{item?.title}</div>
        ))}
        </div>
    );
}