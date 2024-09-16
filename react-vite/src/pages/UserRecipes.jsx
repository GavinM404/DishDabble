import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card/Card";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal/DeleteConfirmationModal";
import { useModal } from "../context/Modal";
import { fetchUserRecipes, deleteRecipe } from "../redux/recipes";
import "./UserRecipes.css"

function UserRecipes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes.allRecipes); // Update selector to match state structure
  const { setModalContent } = useModal();
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchUserRecipes());
  }, [dispatch, recipeToDelete]);

  const handleDelete = (recipeId) => {
    setRecipeToDelete(recipeId);
    setModalContent(
      <DeleteConfirmationModal
        thing="recipe"
        onDelete={() => handleConfirmDelete(recipeId)}
        onCancel={() => setRecipeToDelete(null)}
      />
    );
  };

  const handleConfirmDelete = async (recipeId) => {
    await dispatch(deleteRecipe(recipeId));
    setRecipeToDelete(null);
    await dispatch(fetchUserRecipes());
  };

  const handleUpdate = (recipeId) => {
    navigate(`/recipes/${recipeId}/edit`);
  };

  const userRecipes = Object.values(allRecipes);

  if (userRecipes.length === 0) {
    return (
      <div className="user-recipes-page">
        <h1>Manage Recipes</h1>
        <div className="no-recipes">
          <p>No recipes posted yet.</p>
          <div>
            <NavLink to="/recipes/new">
              <button>Create a New Recipe</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-recipes-page">
      <h1>Manage Recipes</h1>
      <div>
        <NavLink to="/recipes/new">
          <button>Create a New Recipe</button>
        </NavLink>
      </div>
      <div className="card-container">
        {userRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Card
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              src={recipe.image_url}
            />
            <div className="recipe-actions">
              <button onClick={() => handleUpdate(recipe.id)}>Update</button>
              <button onClick={() => handleDelete(recipe.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRecipes;
