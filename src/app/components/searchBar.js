'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ defaultValue = '' }) {
    const [searchQuery, setSearchQuery] = useState(defaultValue);
    const router = useRouter();

    useEffect(() => {
        console.log('searchQuery state updated:', searchQuery); // Log changes in searchQuery state
    }, [searchQuery]);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        const path = `/search?query=${encodeURIComponent(searchQuery.trim())}`;
        console.log('Submit path:', path); // Log the path being pushed
        router.push(path);
    };

    return (
        <form onSubmit={handleSearchSubmit}>
            <input
                id="searchQuery"
                name="searchQuery"
                type="text"
                className="text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a cocktail..."
            />
            <button type="submit">Search</button>
        </form>
    );
}