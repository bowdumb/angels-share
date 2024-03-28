import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '../components/searchBar';

export default function Search() {
    const router = useRouter();
    const { searchQuery } = router.query;
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!searchQuery) return;

        const fetchResults = async () => {
            const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setResults(data);
        };

        fetchResults();
    }, [searchQuery]);
    return (
        <div>
            This is the search page.
            <SearchBar defaultValue={searchQuery} />
            {results.length > 0 && (
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>{result.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}