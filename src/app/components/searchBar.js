'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ defaultValue = '' }) {
    const [searchQuery, setSearchQuery] = useState(defaultValue);
    const router = useRouter();

    const handleSearchSubmit = aysnc (e) => {
        e.preventDefault();
        router.push(`http://localhost:3000/search?searchQuery=${encodeURIComponent(searchQuery.trim())}`);
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