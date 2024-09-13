const GET_BY_TYPE = 'recipes/LOADTYPE';
const GET = 'recipes/LOAD';
const CREATE_RECIPE = 'recipes/createRecipe';
const GET_USER_RECIPES = 'recipes/GET_USER_RECIPES';
const DELETE_RECIPE = 'recipes/DELETE_RECIPE';
const UPDATE_RECIPE = 'recipes/UPDATE_RECIPE';

// Action Creators
const getUserRecipes = (recipes) => ({
    type: GET_USER_RECIPES,
    recipes,
});

const deleteRecipeAction = (recipeId) => ({
    type: DELETE_RECIPE,
    recipeId,
});

const getRecipeByType = (recipes) => ({
    type: GET_BY_TYPE,
    recipes,
});

const getRecipeDetails = (recipe) => ({
    type: GET,
    recipe,
});

const createRecipeAction = (recipe) => ({
    type: CREATE_RECIPE,
    recipe,
});

const updateRecipeAction = (recipe) => ({
    type: UPDATE_RECIPE,
    recipe,
});

// Thunks

export const fetchUserRecipes = () => async (dispatch) => {
    const response = await fetch('/api/recipes/personal');
    if (response.ok) {
        const data = await response.json();
        dispatch(getUserRecipes(data.Recipes));
    } else {
        console.error('Failed to fetch user recipes');
    }
};

export const updateRecipe = (recipeId, recipeData) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
    });

    if (response.ok) {
        const updatedRecipe = await response.json();
        dispatch(updateRecipeAction(updatedRecipe));
        return updatedRecipe;
    } else {
        console.error('Failed to update recipe');
    }
};

export const deleteRecipe = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteRecipeAction(recipeId));
    } else {
        console.error('Failed to delete recipe');
    }
};

export const getRecipesType = (recipeType) => async (dispatch) => {
    const response = await fetch(`/api/recipes/type/${recipeType}`);
    if (response.ok) {
        const allRecipes = await response.json();
        dispatch(getRecipeByType(allRecipes.recipes));
    } else {
        console.error('Failed to fetch recipes');
    }
};

export const fetchRecipeDetails = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`);
    if (response.ok) {
        const recipe = await response.json();
        dispatch(getRecipeDetails(recipe));
    } else {
        console.error('Failed to fetch recipe details');
    }
};

export const createRecipe = (recipeData) => async (dispatch) => {
    const response = await fetch(`/api/recipes/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
    });
    if (response.ok) {
        const newRecipe = await response.json(); // Await the JSON response
        dispatch(createRecipeAction(newRecipe));
        return newRecipe;
    } else {
        console.error('Failed to create recipe');
    }
};
// Initial State + Reducer
const initialState = { allRecipes: {}, currentRecipe: {} };

const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_RECIPE: {
            return {
                ...state,
                allRecipes: {
                    ...state.allRecipes,
                    [action.recipe.id]: action.recipe,
                },
                currentRecipe: { ...action.recipe },
            };
        }
        case GET_USER_RECIPES: {
            const allRecipes = {};
            action.recipes.forEach((recipe) => {
                allRecipes[recipe.id] = recipe;
            });
            return {
                ...state,
                allRecipes: { ...allRecipes },
            };
        }
        case DELETE_RECIPE: {
            const { [action.recipeId]: deletedRecipe, ...remainingRecipes } = state.allRecipes;
            return {
                ...state,
                allRecipes: remainingRecipes,
            };
        }
        case GET: {
            return {
                ...state,
                currentRecipe: { ...action.recipe },
            };
        }
        case GET_BY_TYPE: {
            const allRecipes = {};
            action.recipes.forEach((recipe) => {
                allRecipes[recipe.id] = recipe;
            });
            return {
                ...state,
                allRecipes: { ...allRecipes },
            };
        }
        case CREATE_RECIPE: {
            // Add the new recipe to the allRecipes state
            return {
                ...state,
                allRecipes: {
                    ...state.allRecipes,
                    [action.recipe.id]: action.recipe,
                },
            };
        }
        default:
            return state;
    }
};

export default recipeReducer;
