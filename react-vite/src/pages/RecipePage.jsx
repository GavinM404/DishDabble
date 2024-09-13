import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchRecipeDetails } from "../redux/recipes";

function RecipePage() {
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const recipe = useSelector(state => state.recipes.currentRecipe);

  useEffect(() => {
    dispatch(fetchRecipeDetails(recipeId));
  }, [dispatch, recipeId]);

  if (!recipe) return <div>Loading...</div>;

  // Function to render instructions as separate lines
  const renderInstructions = (instructions) => {
    return instructions
      .split("\n") // Split by newline
      .filter(step => step.trim()) // Remove empty lines
      .map((step, index) => (
        <li key={index}>{step.trim()}</li> // Trim and render each step
      ));
  };

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h1>{recipe.name || 'Recipe Name'}</h1>
        <h2 className="about-recipe">About Recipe</h2>
        <p>{recipe.description || 'No description available.'}</p>
      </div>

      <div className="recipe-details">
        <p><strong>Author:</strong> {recipe.author || 'Unknown'}</p>
        <div className="time-info">
          <div><strong>Prep Time:</strong> {recipe.prep_time || 'N/A'} min</div>
          <div><strong>Cook Time:</strong> {recipe.cook_time || 'N/A'} min</div>
          <div><strong>Total Time:</strong> { (recipe.prep_time || 0) + (recipe.cook_time || 0) } min</div>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients">
          <h2>Ingredients:</h2>
          <ul>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity || 0} {ingredient.unit || ''} {ingredient.ingredient_name || 'Unknown Ingredient'}
                </li>
              ))
            ) : (
              <li>No ingredients available</li>
            )}
          </ul>
        </div>

        <div className="instructions">
          <h2>Instructions:</h2>
          <ol>
            {recipe.instructions ? renderInstructions(recipe.instructions) : <li>No instructions available</li>}
          </ol>
        </div>

        <div className="notes">
          <h2>Notes:</h2>
          {/* Add notes section here if needed */}
        </div>
      </div>

      <div className="recipe-sidebar">
        <div className="recipe-image">
          <img src={recipe.imageUrl || 'default-image-url.jpg'} alt={recipe.name || 'Recipe Image'} />
        </div>

        <div className="rating">
          <strong>Rating:</strong> {recipe.ratings || 'N/A'} from {recipe.votes || 0} votes
          {/* Add star rating visualization here */}
        </div>

        <div className="meal-plan">
          <button>This Week's Plan</button>
          <button>Next Week's Plan</button>
        </div>

        <div className="nutrition-info">
          <h3>Nutrition Info (per serving):</h3>
          <p>Calories: {recipe.nutritional_info?.calories || 'N/A'}</p>
          <p>Protein: {recipe.nutritional_info?.protein || 'N/A'} g</p>
          <p>Fat: {recipe.nutritional_info?.fat || 'N/A'} g</p>
          <p>Carbohydrates: {recipe.nutritional_info?.carbohydrates || 'N/A'} g</p>
          {/* Include other nutrition data */}
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
