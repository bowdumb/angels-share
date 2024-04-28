'use client';

import React from 'react';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  async function fetchSearchResults(query) {
    const response = await fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(query)}`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  }

  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery)
     
   .then(setResults)
        .catch(error => console.error('Error fetching search results:', error));
    }
  }, [searchQuery]);

  return (
    <div>
      <SearchBar defaultValue={searchQuery} />
      <div>
        {results.length > 0 ? (
          results.map(result => (
            <div key={result._id}>
              <h1 className="text-xl font-bold pt-10">{result.name}</h1>
              <h2 className="text-lg font-semibold mt-4">Ingredients:</h2>
              <ul className="list-disc pl-5">
                {result.ingredients.map((ingredient, index) => (
                  <li key={index} className="ml-4">{ingredient}</li>
                ))}
              </ul>
              <h2 className="text-lg font-semibold mt-4">Glassware:</h2>
              <p className="pl-5">{result.glassware}</p>
              <h2 className="text-lg font-semibold mt-4">Instructions:</h2>
              <ol className="list-decimal pl-5">
                {result.instructions.map((instruction, index) => (
                  <li key={index} className="ml-4">{instruction}</li>
                ))}
              </ol>
              {result.optional && (
                <div>
                  <h2 className="text-lg font-semibold mt-4">Optional:</h2>
                  <p className="pl-5">{result.optional}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-xl font-bold ççtext-red-500 text-center mt-10">
            No results found for your search.
          </div>
        )}
      </div>
    </div>
  )};