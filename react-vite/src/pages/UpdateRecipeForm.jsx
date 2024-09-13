import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeDetails, updateRecipe } from '../redux/recipes';
import { useParams } from 'react-router-dom';

const UpdateRecipeForm = () => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();

  // Access the recipe details from Redux state
  const recipe = useSelector(state => state.recipes.currentRecipe);

  // Local state for form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState([{ ingredient_name: "", quantity: "", unit: "" }]);
  const [type, setType] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [nutritionalInfo, setNutritionalInfo] = useState('');
  const [cuisine, setCuisine] = useState('');

  const [loading, setLoading] = useState(true);

  // Fetch recipe details when the component mounts
  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeDetails(recipeId));
    }
  }, [dispatch, recipeId]);

  // Set form fields with current recipe details once recipe data is available
  useEffect(() => {
    if (recipe) {
      setName(recipe.name || '');
      setDescription(recipe.description || '');
      setInstructions(recipe.instructions || '');
      setIngredients(recipe.ingredients || [{ ingredient_name: "", quantity: "", unit: "" }]);
      setType(recipe.type || '');
      setCookTime(recipe.cook_time || '');
      setPrepTime(recipe.prep_time || '');
      setNutritionalInfo(recipe.nutritional_info || {});
      setCuisine(recipe.cuisine || '');
      setLoading(false);
    }
  }, [recipe]);

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredient_name: "", quantity: "", unit: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipeData = {
      name,
      description,
      instructions,
      ingredients,
      type,
      cook_time: cookTime,
      prep_time: prepTime,
      nutritional_info: nutritionalInfo,
      cuisine,
    };

    // Dispatch the updateRecipe thunk
    const updatedRecipe = await dispatch(updateRecipe(recipeId, updatedRecipeData));

    if (updatedRecipe) {
      console.log('Recipe updated successfully:', updatedRecipe);
    }
  };
  if (loading) return <div>Loading...</div>; // Add a loading indicator
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
      </div>

      {/* Render the Ingredients */}
      <div>
        <h2>Ingredients</h2>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient.ingredient_name}
              onChange={(e) => handleIngredientChange(index, 'ingredient_name', e.target.value)}
              placeholder="Ingredient name"
            />
            <input
              type="text"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              placeholder="Quantity"
            />
            <input
              type="text"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              placeholder="Unit"
            />
          </div>
        ))}
        <button type="button" onClick={addIngredient}>Add Ingredient</button>
      </div>

      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="entree">Entree</option>
          <option value="lunch">Lunch</option>
          <option value="snack">Snack</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>
      <div>
        <label>Cook Time (minutes)</label>
        <input
          type="number"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
        />
      </div>
      <div>
        <label>Prep Time (minutes)</label>
        <input
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
        />
      </div>
      <div>
        <label>Cuisine</label>
        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />
      </div>
      <div>
        <label>Nutritional Info</label>
        <input
          type="text"
          value={JSON.stringify(nutritionalInfo)}
          onChange={(e) => setNutritionalInfo(JSON.parse(e.target.value) || {})}
        />
      </div>
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default UpdateRecipeForm;
