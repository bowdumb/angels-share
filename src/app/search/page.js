'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '../components/searchBar'; // Adjust the import path as necessary

export default function Search() {
  const router = useRouter();
  const [results, setResults] = useState([]);

  // Use optional chaining to safely access searchQuery
  const searchQuery = router.query?.searchQuery;

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) return; // Exit early if searchQuery is undefined or empty

      // Perform the search using your API route
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data); // Assuming the API returns an array of results
      }
    };

    fetchData();
  }, [searchQuery]); // Dependency array ensures useEffect runs when searchQuery changes

  return (
    <div>
      <SearchBar defaultValue={searchQuery} />
      <div>
        {/* Render your search results here */}
        {results.map(result => (
          <div key={result.name}> {/* Replace result.id with appropriate key */}
            {/* Render each result */}
          </div>
        ))}
      </div>
    </div>
  );
}