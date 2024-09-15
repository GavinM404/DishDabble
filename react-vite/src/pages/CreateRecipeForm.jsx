import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../redux/recipes";
import "./CreateRecipeForm.css";

const CreateRecipeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState([""]);
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient_name: "", quantity: "", unit: "" }
  ]);
  const [type, setType] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [nutritionalInfo, setNutritionalInfo] = useState("{}");
  const [cuisine, setCuisine] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required.";
    if (instructions.every(instr => !instr.trim())) errors.instructions = "At least one instruction is required.";
    if (!type) errors.type = "Type is required.";
    if (!cookTime) errors.cookTime = "Cook time is required.";
    if (!prepTime) errors.prepTime = "Prep time is required.";
    if (ingredients.some(ing => !ing.ingredient_name || !ing.quantity || !ing.unit))
      errors.ingredients = "All ingredients must include name, quantity, and unit.";
    try {
      JSON.parse(nutritionalInfo);
    } catch {
      errors.nutritionalInfo = "Nutritional information must be valid JSON.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newRecipe = {
        name,
        description,
        instructions: instructions.join("\n"),
        ingredients,
        type,
        cook_time: cookTime,
        prep_time: prepTime,
        nutritional_info: JSON.parse(nutritionalInfo),
        cuisine,
        image_url: imageUrl,
      };

      try {
        const createdRecipe = await dispatch(createRecipe(newRecipe));
        if (createdRecipe && createdRecipe.id) {
          navigate(`/recipes/${createdRecipe.id}`);
        }
      } catch (error) {
        console.error("Failed to create recipe", error);
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
      { ingredient_name: "", quantity: "", unit: "" }
    ]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, idx) => idx !== index);
      setIngredients(newIngredients);
    }
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      const newInstructions = instructions.filter((_, idx) => idx !== index);
      setInstructions(newInstructions);
    }
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
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      <div className="form-section">
        <label>Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="http://example.com/image.jpg"
        />
        {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
      </div>

      <div className="form-section">
        <label>Instructions</label>
        {instructions.map((instruction, index) => (
          <div key={index} className="instruction">
            <textarea
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              placeholder="Instruction step"
            />
            {index > 0 && (
              <button type="button" onClick={() => removeInstruction(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addInstruction}>
          Add Instruction
        </button>
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
        {errors.cookTime && <p className="error">{errors.cookTime}</p>}
      </div>

      <div className="form-section">
        <label>Prep Time (minutes)</label>
        <input
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          placeholder="Prep time in minutes"
        />
        {errors.prepTime && <p className="error">{errors.prepTime}</p>}
      </div>

      <div className="form-section">
        <label>Cuisine</label>
        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Cuisine type"
        />
        {errors.cuisine && <p className="error">{errors.cuisine}</p>}
      </div>

      <div className="form-section">
        <label>Nutritional Info</label>
        <input
          type="text"
          value={nutritionalInfo}
          onChange={(e) =>
            setNutritionalInfo(JSON.parse(e.target.value) || {})
          }
          placeholder='{"calories": 200, "protein": 5, "fat": 7, "carbohydrates": 30}'
        />
        {errors.nutritionalInfo && <p className="error">{errors.nutritionalInfo}</p>}
      </div>

      <div className="form-section">
        <label>Ingredients</label>
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
            {index > 0 && (
              <button type="button" onClick={() => removeIngredient(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
      </div>

      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default CreateRecipeForm;
