import React from 'react'
import Image from 'next/image'
import { MealData, PageProps } from '../../components/types/types'
import Link from 'next/link';

const IngredientsList: React.FC<{ data: MealData['meals'][0] }> = ({ data }) => {
  
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    const ingredient = (data as any)[ingredientKey];
    const measure = (data as any)[measureKey];

    if (ingredient && measure) {
      ingredients.push(
        <h4 key={i}>
          {ingredient} : {measure}
        </h4>
      );
    }
  }

  return <>{ingredients}</>;
};



const getData = async (id: number): Promise<MealData> => {

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  if (!res.ok) {
    throw new Error('something went wrong')
  }
  return res.json()

}



const page: React.FC<PageProps> = async ({ params }: { params: { id: number } }) => {
  const { id } = params

  const data = await getData(id)
  return (
    <div className='container mx-auto my-20'>
      <div className='flex border-2 border-gray-300 cursor-pointer p-4 '>
        <div className='relative w-[50%] h-[500px] mr-8'>
          <Image src={data?.meals[0]?.strMealThumb} layout='fill' objectFit='cover' alt='meal image' />
        </div>

        <div className='relative w-[50%]'>
          <div>
            <h1 className='py-4 text-black font-semibold text-2xl text-center mb-1'>{data?.meals[0]?.strMeal}</h1>
          </div>
          <div className='py-4 text-black font-semibold text-l  mb-1'>
            <h2 className='py-4 text-black font-semibold text-xl  mb-1'>Ingredients</h2>
            <IngredientsList data={data?.meals[0]} />

          </div>
          <div>
            <h1 className='py-4 text-black font-semibold text-xl mb-1'>{data?.meals[0]?.strInstructions}</h1>
          </div>
          <Link href='/' className='rounded-lg bg bg-gray-100 p-2 w-23 m-1 font-bold float-right'>
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page
