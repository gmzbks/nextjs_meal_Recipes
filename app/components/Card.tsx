import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Recipe {
  idMeal: number;
  strMealThumb: string;
  strMeal: string;
}

interface CardProps {
  recipes: Recipe[] | null;
}

const Card: React.FC<CardProps> = ({ recipes }) => {
    if (!recipes) {
        return <div>food is not found</div>; 
      }

  return (
    <div className='flex items-center justify-center p-10 ml-10'>
      <div className='flex flex-wrap flex-col lg:flex-row items-center gap-5'>
        {recipes.map((recipe) => (
          <Link key={recipe.idMeal} href={`/recipe/${recipe.idMeal}`} >
            
              <div className='max-w-sm border-2 border-gray-300 cursor-pointer hover:border-black'>
                <Image src={recipe.strMealThumb} width={350} height={250} alt="meal image"/>
                <h1 className='bg-white py-4 text-gray-500 font-semibold text-2xl text-center'>{recipe.strMeal}</h1>
              </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Card;

