'use client';

import React from 'react';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Search() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const [results, setResults] = React.useState([]);
  const [searchPerformed, setSearchPerformed] = React.useState(false); // Creates state variable to track whether a search has occured.

  async function fetchSearchResults(query) {
    const response = await fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(query)}`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  }

  React.useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery)
        .then(data => {
          setResults(data);
          setSearchPerformed(true); // Update status of setSearchPerformed when a search is made.
        })
        .catch(error => console.error("Error fetching search results: ", error));
    }
  }, [searchQuery]);

  return (
    <div>
      <SearchBar defaultValue={searchQuery} />
      <div>
        {searchPerformed ? (    // Checks if searchPerformed is true and an initial search has been made
          results.length > 0 ? (    // Checks if the item that has been searched for exists in the database. If it does, render
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
          ) : (   // This line contains the alternative outcome for the outer ternary operator above
            <div className="text-xl text-red-500 text-center mt-10">
              No results found for your search.
            <div className="text-xl text-slate-600 border border-black-500 hover:bg-black-500 hover:text-teal-400 font-bold text-center mt-10">
            <Link href="/add-recipe">Click here to add a new recipe!</Link>
            </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}