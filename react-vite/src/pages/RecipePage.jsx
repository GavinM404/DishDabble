import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRecipeDetails } from "../redux/recipes";
import { getReviews } from "../redux/reviews";
import Reviews from "../components/Reviews/Reviews";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import "./RecipePage.css";

function RecipePage() {
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const recipe = useSelector((state) => state.recipes.currentRecipe);
  const reviews = useSelector((state) =>
    state.reviews?.reviews ? Object.values(state.reviews.reviews) : []
  );
  console.log("Reviews from Redux:", reviews);
  const currentUser = useSelector((state) => state.session.user);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipeDetails(recipeId));
    dispatch(getReviews(recipeId)); // Fetch reviews for the recipe
  }, [dispatch, recipeId]);

  if (!recipe) return <div>Loading...</div>;

  console.log("Ingredients:", recipe.ingredients);
  console.log("Instructions:", recipe.instructions);

  const renderInstructions = () => {
    if (recipe.instructions && typeof recipe.instructions === 'string') {
      console.log("Splitting Instructions: ", recipe.instructions.split('\n'));
      return (
        <ol>
          {recipe.instructions.split('\n').map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      );
    } else {
      return <p>No instructions available.</p>;
    }
  };

const renderIngredients = () => {
  if (Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0) {
    return (
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.unit} {ingredient.ingredient_name}
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>No ingredients available.</p>;
  }
};

  const reviewCount = reviews.length;

  const averageRating =
    reviewCount > 0
      ? (
          reviews.reduce((acc, review) => acc + review.stars, 0) / reviewCount
        ).toFixed(1)
      : "New";
      const renderStars = (stars) => {
        return (
            <span className="average-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                        key={star}
                        icon={star <= stars ? solidStar : regularStar}
                        className="star-icon"
                    />
                ))}
            </span>
        );
    };

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h1>{recipe.name || "Recipe Name"}</h1>
        <p className="author-info">
          <strong>Author:</strong> {recipe.author || "Unknown"}
        </p>
        <p>{recipe.description || "No description available."}</p>

      <div className="time-info">
        <span className="prep">
          <strong>Prep Time:</strong> {recipe.prep_time || "N/A"} min
        </span>
        <span className="cook">
          <strong>Cook Time:</strong> {recipe.cook_time || "N/A"} min
        </span>
        <span className="total">
          <strong>Total Time:</strong>{" "}
          {(recipe.prep_time || 0) + (recipe.cook_time || 0)} min
        </span>
      </div>

      <div className="recipe-content">
        <div className="ingredients">
          <h2>Ingredients:</h2>
          {renderIngredients()}
        </div>

        <div className="instructions">
          <h2>Instructions:</h2>
          {renderInstructions()}
        </div>
      </div>

        <div className="notes">
          <h2>Notes:</h2>
        </div>
      </div>

      <div className="recipe-sidebar">
        <div className="recipe-image">
          <img
            src={recipe.image_url || "default-image-url.jpg"}
            alt={recipe.name || "Recipe Image"}
          />
        </div>

        <div className="rating-meal-plan-container">
            <div className="rating">
                <div className="button-stars"><button>Meal Plan</button><div className="stars">{renderStars(Math.round(averageRating))}</div></div>
                <div className="actual-ratings"><strong>Rating: </strong>{averageRating || "N/A"} from {reviewCount}{" "}{reviewCount === 1 ? "Review" : "Reviews"}</div>
            </div>
        </div>

        <div className="nutrition-info">
          <h3>Nutrition Info (per serving):</h3>
          <p>Calories: {recipe.nutritional_info?.calories || "N/A"}</p>
          <p>Protein: {recipe.nutritional_info?.protein || "N/A"} g</p>
          <p>Fat: {recipe.nutritional_info?.fat || "N/A"} g</p>
          <p>
            Carbohydrates: {recipe.nutritional_info?.carbohydrates || "N/A"} g
          </p>
        </div>
      </div>


      <Reviews
        currentUser={currentUser}
        recipeOwnerId={recipe.user_id}
        reviews={reviews}
      />
    </div>
  );
}

export default RecipePage;
