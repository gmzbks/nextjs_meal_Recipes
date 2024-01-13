'use client'

import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import { Data } from './components/types/types';
import Header from './components/Header';


const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  

  const handleSearch = async (searchTerm: string) => {
    try {
      setLoading(true);
      const res = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm} `);
      if (!res.ok) {
        throw new Error('something went wrong');
      }
      const result = await res.json();
      console.log(result);
      setRecipes(result?.meals);
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('');
  }, []);
  


  return (
    <main className='homepage'>
      <Header handleSearch={handleSearch} handleSearchs={() => {}} setRecipes={setRecipes} recipes={recipes}  />
      <Card recipes={recipes} />
    </main>
  );
};


export default Home;
