import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchRecipeDetails } from "../redux/recipes";

function RecipePage() {
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const recipe = useSelector(state => state.recipes[recipeId]);

  useEffect(() => {
    dispatch(fetchRecipeDetails(recipeId));
  }, [dispatch, recipeId]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
        <button className="about-recipe">About Recipe</button>
      </div>

      <div className="recipe-details">
        <p><strong>Author:</strong> {recipe.author}</p>
        <div className="time-info">
          <div><strong>Prep Time:</strong> {recipe.prepTime} min</div>
          <div><strong>Cook Time:</strong> {recipe.cookTime} min</div>
          <div><strong>Total Time:</strong> {recipe.prepTime + recipe.cookTime} min</div>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients">
          <h2>Ingredients:</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="instructions">
          <h2>Instructions:</h2>
          <ol>
            {recipe.instructions.split("\n").map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="notes">
          <h2>Notes:</h2>
          {/* Add notes section here if needed */}
        </div>
      </div>

      <div className="recipe-sidebar">
        <div className="recipe-image">
          <img src={recipe.imageUrl} alt={recipe.name} />
        </div>

        <div className="rating">
          <strong>Rating:</strong> {recipe.rating} from {recipe.votes} votes
          {/* Add star rating visualization here */}
        </div>

        <div className="meal-plan">
          <button>This Week's Plan</button>
          <button>Next Week's Plan</button>
        </div>

        <div className="nutrition-info">
          <h3>Nutrition Info (per serving):</h3>
          <p>Calories: {recipe.nutritionalInfo.calories}</p>
          <p>Protein: {recipe.nutritionalInfo.protein} g</p>
          <p>Fat: {recipe.nutritionalInfo.fat} g</p>
          <p>Carbohydrates: {recipe.nutritionalInfo.carbohydrates} g</p>
          {/* Include other nutrition data */}
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
