import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeDetails, updateRecipe } from "../redux/recipes";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdatedRecipeForm.css";

const UpdateRecipeForm = () => {
  const { recipeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recipe = useSelector((state) => state.recipes.currentRecipe);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState([""]);
  const [ingredients, setIngredients] = useState([
    { ingredient_name: "", quantity: "", unit: "" },
  ]);
  const [type, setType] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [notes, setNotes] = useState("");

  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");

  const [cuisine, setCuisine] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeDetails(recipeId));
    }
  }, [dispatch, recipeId]);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name || "");
      setDescription(recipe.description || "");
      setInstructions(
        recipe.instructions ? recipe.instructions.split("\n") : [""]
      );
      setIngredients(
        recipe.ingredients || [{ ingredient_name: "", quantity: "", unit: "" }]
      );
      setType(recipe.type || "");
      setCookTime(recipe.cook_time || "");
      setPrepTime(recipe.prep_time || "");
      setNotes(recipe.notes || "");

      setCalories(recipe.nutritional_info?.calories || "");
      setProtein(recipe.nutritional_info?.protein || "");
      setFat(recipe.nutritional_info?.fat || "");
      setCarbohydrates(recipe.nutritional_info?.carbohydrates || "");
      setCuisine(recipe.cuisine || "");
      setImageUrl(recipe.image_url || "");
      setLoading(false);
    }
  }, [recipe]);
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

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
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
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required.";
    } else if (name.length > 24) {
      errors.name = "Name cannot exceed 24 characters.";
    }

    if (!description.trim()) {
      errors.description = "Description is required.";
    } else if (description.length > 150) {
      errors.description = "Description cannot exceed 150 characters.";
    }

    if (instructions.every(instr => !instr.trim())) {
      errors.instructions = "At least one instruction is required.";
    }

    if (!type) {
      errors.type = "Type is required.";
    }

    if (!cookTime) {
      errors.cookTime = "Cook time is required.";
    } else if (isNaN(cookTime) || cookTime <= 0) {
      errors.cookTime = "Cook time must be a positive number.";
    }

    if (!prepTime) {
      errors.prepTime = "Prep time is required.";
    } else if (isNaN(prepTime) || prepTime <= 0) {
      errors.prepTime = "Prep time must be a positive number.";
    }

    ingredients.forEach((ingredient, index) => {
      if (!ingredient.ingredient_name || ingredient.ingredient_name.length > 25) {
        errors.ingredients = `Ingredient name must be provided and cannot exceed 11 characters (Ingredient ${index + 1}).`;
      }
      if (!ingredient.quantity || isNaN(ingredient.quantity) || ingredient.quantity <= 0) {
        errors.ingredients = `Ingredient quantity must be a positive number (Ingredient ${index + 1}).`;
      }
      if (!ingredient.unit || ingredient.unit.length > 11) {
        errors.ingredients = `Ingredient unit cannot exceed 11 characters (Ingredient ${index + 1}).`;
      }
    });

    if (calories) {
      if (isNaN(calories) || calories > 9999 || calories <= 0) {
        errors.calories = "Calories must be a positive number and no more than 9999.";
      }
    }

    if (protein) {
      if (isNaN(protein) || protein > 9999 || protein <= 0) {
        errors.protein = "Protein must be a positive number and no more than 9999.";
      }
    }

    if (fat) {
      if (isNaN(fat) || fat > 9999 || fat <= 0) {
        errors.fat = "Fat must be a positive number and no more than 9999.";
      }
    }

    if (carbohydrates) {
      if (isNaN(carbohydrates) || carbohydrates > 9999 || carbohydrates <= 0) {
        errors.carbohydrates = "Carbohydrates must be a positive number and no more than 9999.";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const updatedRecipeData = {
        name,
        description,
        instructions: instructions.join("\n"),
        ingredients,
        type,
        cook_time: cookTime,
        prep_time: prepTime,
        notes,
        nutritional_info: {
          calories,
          protein,
          fat,
          carbohydrates,
        },
        cuisine,
        image_url: imageUrl,
      };
      const updatedRecipe = await dispatch(
        updateRecipe(recipeId, updatedRecipeData)
      );

      if (updatedRecipe) {
        navigate(`/recipes/${recipeId}`);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="update-recipe-form">
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
        <label>Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="http://example.com/image.jpg"
        />
      </div>

      <div>
        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
        />
      </div>

      <h3>Instructions</h3>
      <div>
        {instructions.map((instruction, index) => (
          <div key={index}>
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
      <h3>Ingredients</h3>
      <div>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
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

      <h3>Nutritional Information</h3>

      <div>
        <label>Calories</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        {errors.calories && <p className="error">{errors.calories}</p>}
      </div>

      <div>
        <label>Protein (grams)</label>
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
        {errors.protein && <p className="error">{errors.protein}</p>}
      </div>

      <div>
        <label>Fat (grams)</label>
        <input
          type="number"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
        />
        {errors.fat && <p className="error">{errors.fat}</p>}
      </div>

      <div>
        <label>Carbohydrates (grams)</label>
        <input
          type="number"
          value={carbohydrates}
          onChange={(e) => setCarbohydrates(e.target.value)}
        />
        {errors.carbohydrates && (
          <p className="error">{errors.carbohydrates}</p>
        )}
      </div>

      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default UpdateRecipeForm;
