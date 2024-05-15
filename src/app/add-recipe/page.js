'use client';

import React, { useState } from 'react';

export default function addCocktailForm() {
    const [formData, setFormData] = useState({
        name: '',
        ingredients: [''],
        instructions: [''],
        optional: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    ingredients: formData.ingredients.split(',').map(ingredient => ingredient.trim()),
                    instructions: formData.instructions.split('.').map(instruction => instruction.trim()),
                    optional: formData.optional
                })
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Item added successfully:', result);
            } else {
                throw new Error('Failed to add item');
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="flex flex-col">
                <span className="text-white">Name: </span>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded bg-gray-800 text-white" /> 
            </label>
            <label className="flex flex-col">
                <span className="text-white">Ingredients: </span>
                <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} className="text-white w-2/3 mt-1 p-2 border border-gray-300 rounded bg-gray-800" />
            </label>
            <label className="flex flex-col">
                <span className="text-white">Instructions: </span>
                <input type="text" name="instructions" value={formData.instructions} onChange={handleChange} className="text-white w-2/3 mt-1 p-2 border border-gray-300 rounded bg-gray-800" />
            </label>
            <label className="flex flex-col">
                <span className="text-white">Optional: </span>
                <input type="text" name="optional" value={formData.optional} onChange={handleChange} className="text-white w-2/3 mt-1 p-2 border border-gray-300 rounded bg-gray-800" />
            </label>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Recipe</button>
        </form>
    );    
}