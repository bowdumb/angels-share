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
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} /> 
            </label>
            <label>
                Ingredients: 
                <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} />
            </label>
            <label>
                Instructions:  
                <input type="text" name="instructions" value={formData.instructions} onChange={handleChange} />
            </label>
            <label>
                Optional: 
                <input type="text" name="optional" value={formData.optional} onChange={handleChange} />
            </label>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rouned">Add Recipe</button>
        </form>
    );
}