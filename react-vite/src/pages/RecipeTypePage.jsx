import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipesType } from "../redux/recipes";
import Card from "../components/Card/Card";
import { useParams } from "react-router-dom";
import './RecipeTypePage.css'

const RecipeTypePage = () => {
    const { recipeType } = useParams();
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes.allRecipes);

    useEffect(() => {
        if (recipeType) {
            dispatch(getRecipesType(recipeType));
        }
    }, [dispatch, recipeType]);

    const formattedRecipeType = recipeType ? recipeType.charAt(0).toUpperCase() + recipeType.slice(1) : 'Recipes';

    const recipesArray = Object.values(allRecipes);

    return (
        <div className='recipe-type-page'>
            <h1>{formattedRecipeType}</h1>
            <div className='recipes-container'>
                {recipesArray.length > 0 ? (
                    recipesArray.map((recipe) => (
                        <Card
                            key={recipe.id}
                            id={recipe.id}
                            name={recipe.name}
                            src={recipe.image}
                            rating={recipe.rating}
                        />
                    ))
                ) : (
                    <p>No recipes found for this type.</p>
                )}
            </div>
        </div>
    );
};

export default RecipeTypePage;
