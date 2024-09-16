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
    { ingredient_name: "", quantity: "", unit: "" },
  ]);
  const [type, setType] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [notes, setNotes] = useState([""]);


  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");

  const [cuisine, setCuisine] = useState("");
  const [errors, setErrors] = useState({});

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


    if (instructions.every((instr) => !instr.trim())) {
      errors.instructions = "At least one instruction is required.";
    }


    if (!type) {
      errors.type = "Type is required.";
    }

    if (!cookTime) {
      errors.cookTime = "Cook time is required.";
    } else if (isNaN(cookTime)) {
      errors.cookTime = "Cook time must be a number.";
    }

    if (!prepTime) {
      errors.prepTime = "Prep time is required.";
    } else if (isNaN(prepTime)) {
      errors.prepTime = "Prep time must be a number.";
    }

    ingredients.forEach((ingredient, index) => {
      if (
        !ingredient.ingredient_name ||
        ingredient.ingredient_name.length > 11
      ) {
        errors.ingredients = `Ingredient name must be provided and cannot exceed 11 characters (Ingredient ${
          index + 1
        }).`;
      }
      if (!ingredient.quantity || isNaN(ingredient.quantity)) {
        errors.ingredients = `Ingredient quantity must be a number (Ingredient ${
          index + 1
        }).`;
      }
      if (!ingredient.unit || ingredient.unit.length > 11) {
        errors.ingredients = `Ingredient unit cannot exceed 11 characters (Ingredient ${
          index + 1
        }).`;
      }
    });

    if (calories) {
      if (isNaN(calories) || calories > 9999) {
        errors.calories = "Calories must be a number and no more than 9999.";
      }
    }

    if (protein) {
      if (isNaN(protein) || protein > 9999) {
        errors.protein = "Protein must be a number and no more than 9999.";
      }
    }

    if (fat) {
      if (isNaN(fat) || fat > 9999) {
        errors.fat = "Fat must be a number and no more than 9999.";
      }
    }

    if (carbohydrates) {
      if (isNaN(carbohydrates) || carbohydrates > 9999) {
        errors.carbohydrates =
          "Carbohydrates must be a number and no more than 9999.";
      }
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
        notes: notes,
        nutritional_info: {
          calories,
          protein,
          fat,
          carbohydrates,
        },
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
      { ingredient_name: "", quantity: "", unit: "" },
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
        <label>
          Image URL <span>(Optional)</span>
        </label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="http://example.com/image.jpg"
        />
        {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
      </div>

      <div className="form-section">
        <label>
          Notes <span>(Optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Recipe notes"
        />
        {errors.notes && <p className="error">{errors.notes}</p>}
      </div>

      <div className="form-section">
        <label>
          Cuisine <span>(Optional)</span>
        </label>
        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Cuisine type"
        />
        {errors.cuisine && <p className="error">{errors.cuisine}</p>}
      </div>
      <h3>Ingredients</h3>
      <div className="form-section">
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
      <h3>Instructions</h3>
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
        <label>Steps <span>(Each step is automatically numbered)</span></label>
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

      <h3>Nutritional Information</h3>
      <p>All nutritional information is optional</p>
      <div className="form-section">
        <label>Calories</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Calories"
        />
        {errors.calories && <p className="error">{errors.calories}</p>}
      </div>

      <div className="form-section">
        <label>Protein (grams)</label>
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          placeholder="Protein"
        />
        {errors.protein && <p className="error">{errors.protein}</p>}
      </div>

      <div className="form-section">
        <label>Fat (grams)</label>
        <input
          type="number"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
          placeholder="Fat"
        />
        {errors.fat && <p className="error">{errors.fat}</p>}
      </div>

      <div className="form-section">
        <label>Carbohydrates (grams)</label>
        <input
          type="number"
          value={carbohydrates}
          onChange={(e) => setCarbohydrates(e.target.value)}
          placeholder="Carbohydrates"
        />
        {errors.carbohydrates && (
          <p className="error">{errors.carbohydrates}</p>
        )}
      </div>

      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default CreateRecipeForm;
