'use client'
import React, { useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { Data } from './types/types'

interface HeaderProps {
  handleSearch: (searchTerm: string) => void;

  handleSearchs: () => void
  setRecipes: React.Dispatch<React.SetStateAction<Data[]>>
  recipes: Data[];

}
/*************************************************************************** */

const Header: React.FC<HeaderProps> = ({ handleSearch, recipes, setRecipes }) => {


  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredMeals, setFilteredMeals] = useState<Data[]>([]);

  const handleChange = (event: any) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.trim() !== '') {
      filterMeals(term);
      setShowResults(true);
    } else {
      setShowResults(false);
     
    }
  };

  const handleSearchs = () => {
    handleSearch(searchTerm);
    setFilteredMeals([]); 
  };

  const filterMeals = (term: string) => {
    if (recipes) {
      const filtered = recipes.filter((meal) => meal.strMeal.toLowerCase().includes(term.toLowerCase()));
      setFilteredMeals(filtered);
    }
  };

  const categoryItem = recipes ? [...new Set(recipes.map((meal) => meal.strCategory))] : [];

  const areaItem = recipes ? [...new Set(recipes.map((meal) => meal.strArea))] : [];

  const filterCategory = (cat: string) => {
    if (recipes) {
      const newItems = recipes.filter((newVal) => newVal.strCategory === cat);
      setRecipes(newItems);
      setFilteredMeals(newItems);
    }
  };

  const filterArea = (term: string) => {
    if (recipes) {
      const filtered = recipes.filter((meal) => meal.strArea.toLowerCase().includes(term.toLowerCase()));
      setRecipes(filtered);
      setFilteredMeals(filtered);

    }
  };

  return (
    <div className='nav ml-10 mt-4'>
      <div className='flex flex-1 items-center gap-3 border p-3 rounded-lg'>
        <div className='bg-amber-600 rounded-lg p-3 text-2xl font-bold'>Meal App</div>
        <div className='flex flex-1 items-center gap-3 border   bg-gray-100 rounded-lg'>
          <input
            placeholder='Search'
            className='outline-none bg-gray-100 p-3 flex-1'
            type="text"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchs()
              }
            }}
          />
          <BiSearch size={25} onClick={handleSearch} /></div>

      </div>

      <div className='side-bar'>
        <div className='p-3 my-3 rounded-lg'>
          <div>
            <h1 className='font-bold p-2 bg-amber-600'>Categories</h1>
            <ul className='flex'>
              {categoryItem.map((meal) =>
                <li key={meal}>
                  <button className='rounded-lg bg bg-gray-100 p-2 w-23 m-1' onClick={() => filterCategory(meal)}>{meal}</button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className='p-3 my-3 rounded-lg ' >
          <div>
            <h1 className='font-bold p-2 bg-amber-600'> Choose Area</h1>
            <ul className='flex'>
              {areaItem.map((meal) =>
                <li key={meal}>
                  <button className='rounded-lg bg bg-gray-100 p-2 w-23 m-1' onClick={() => filterArea(meal)}>{meal}</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Header;




