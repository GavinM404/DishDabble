import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../redux/recipes"; // Adjust import path as necessary

const CreateRecipeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient_name: "", quantity: "", unit: "" },
  ]);
  const [type, setType] = useState(""); // Assuming type is a string, adjust if needed
  const [cookTime, setCookTime] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [nutritionalInfo, setNutritionalInfo] = useState({});
  const [cuisine, setCuisine] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
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

    // Basic validation
    const validationErrors = {};
    if (!name) validationErrors.name = "Name is required";
    if (!instructions)
      validationErrors.instructions = "Instructions are required";
    if (!type) validationErrors.type = "Type is required";
    if (
      ingredients.length === 0 ||
      ingredients.some(
        (ingredient) =>
          !ingredient.ingredient_name ||
          !ingredient.quantity ||
          !ingredient.unit
      )
    ) {
      validationErrors.ingredients =
        "Each ingredient must include a name, quantity, and unit";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Dispatch the createRecipe thunk and wait for it to resolve
        const createdRecipe = await dispatch(createRecipe(newRecipe));

        // Check if the response has an ID
        if (createdRecipe && createdRecipe.id) {
          navigate(`/recipes/${createdRecipe.id}`); // Redirect after creation
        } else {
          console.error("Created recipe does not have an ID");
        }
      } catch (err) {
        console.error("Failed to create recipe", err);
      }
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { ingredient_name: "", quantity: "", unit: "" },
    ]);
  };

  return (
    <form className="create-recipe-form" onSubmit={handleSubmit}>
      <h1>Create a New Recipe</h1>

      <div className="form-section">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Recipe name"
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="form-section">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe description"
        />
      </div>

      <div className="form-section">
        <label>Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Recipe instructions"
        />
        {errors.instructions && <p className="error">{errors.instructions}</p>}
      </div>

      <div className="form-section">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select recipe type</option>
          <option value="entree">Entree</option>
          <option value="lunch">Lunch</option>
          <option value="snack">Snack</option>
          <option value="dessert">Dessert</option>
        </select>
        {errors.type && <p className="error">{errors.type}</p>}
      </div>
      <div className="form-section">
        <label>Cook Time (minutes)</label>
        <input
          type="number"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
          placeholder="Cook time in minutes"
        />
      </div>

      <div className="form-section">
        <label>Prep Time (minutes)</label>
        <input
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          placeholder="Prep time in minutes"
        />
      </div>

      <div className="form-section">
        <label>Cuisine</label>
        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Cuisine type"
        />
      </div>

      <div className="form-section">
        <label>Nutritional Info</label>
        <input
          type="text"
          value={JSON.stringify(nutritionalInfo)}
          onChange={(e) => setNutritionalInfo(JSON.parse(e.target.value) || {})}
          placeholder='{"calories": 200, "protein": 5, "fat": 7, "carbohydrates": 30}'
        />
      </div>

      <div className="form-section">
        <h2>Ingredients</h2>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient">
            <input
              type="text"
              value={ingredient.ingredient_name}
              onChange={(e) =>
                handleIngredientChange(index, "ingredient_name", e.target.value)
              }
              placeholder="Ingredient name"
            />
            <input
              type="text"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              placeholder="Quantity"
            />
            <input
              type="text"
              value={ingredient.unit}
              onChange={(e) =>
                handleIngredientChange(index, "unit", e.target.value)
              }
              placeholder="Unit"
            />
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
        {errors.ingredients && <p className="error">{errors.ingredients}</p>}
      </div>

      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default CreateRecipeForm;
