// Actions
const GET_BY_TYPE = 'recipes/LOADTYPE';
const GET = 'recipes/LOAD'

// Action Creator
const getRecipeByType = (recipes) => {
    return {
        type: GET_BY_TYPE,
        recipes,
    };
};

const getRecipeDetails = (recipe) => ({
    type: GET,
    recipe,
})

// Thunks
export const getRecipesType = (recipeType) => async (dispatch) => {
    const response = await fetch(`/api/recipes/type/${recipeType}`);
    if (response.ok) {
        const allRecipes = await response.json();
        dispatch(getRecipeByType(allRecipes.recipes));
    } else {
        console.error('Failed to fetch recipes');
    }
};

export const fetchRecipeDetails = (recipeId) => async(dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`)
    if (response.ok) {
        const recipe = await response.json();
        dispatch(getRecipeDetails(recipe))
    }
}

// Initial State + Reducer
const initialState = { allRecipes: {}, currentRecipe: {} };

const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET: {
            return {
                ...state,
                currentRecipe: {...action.recipe}
            }
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
        default:
            return state;
    }
};

export default recipeReducer;
