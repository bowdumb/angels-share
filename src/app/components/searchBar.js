'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ defaultValue = '' }) {
    const [searchQuery, setSearchQuery] = useState(defaultValue);
    const router = useRouter();

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        const path = `/search?searchQuery=${encodeURIComponent(searchQuery.trim())}`;
        console.log(typeof path, path);
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