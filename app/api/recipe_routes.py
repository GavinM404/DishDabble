from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Recipe, RecipeType, RecipeIngredient, Review
from datetime import datetime, timezone

recipe_routes = Blueprint('recipes', __name__)

# Get all recipes
@recipe_routes.route('/', methods=['GET'])
def get_all_recipes():
    """
    Returns all recipes.
    """
    recipes = Recipe.query.all()
    return jsonify({"Recipes": [recipe.to_dict() for recipe in recipes]}), 200

# Create a new recipe
@recipe_routes.route('/', methods=['POST'])
@login_required
def create_recipe():
    """
    Creates a new recipe.
    """
    data = request.get_json()

    # Validate request body
    name = data.get('name')
    description = data.get('description')
    instructions = data.get('instructions')
    ingredients = data.get('ingredients', [])
    type = data.get('type')
    cook_time = data.get('cook_time')
    prep_time = data.get('prep_time')
    user_id = current_user.id

    # Additional fields
    nutritional_info = data.get('nutritional_info')
    cuisine = data.get('cuisine')

    # Check for required fields
    if not name or not instructions or not type or not ingredients:
        return jsonify({"message": "Bad Request", "errors": {"Required Fields": "Name, type, ingredients, and instructions are required"}}), 400

    try:
        # Create the new recipe
        new_recipe = Recipe(
            user_id=user_id,
            name=name,
            description=description,
            instructions=instructions,
            nutritional_info=nutritional_info,
            cuisine=cuisine,
            type=RecipeType(type),  # Convert type to RecipeType Enum
            cook_time=cook_time,
            prep_time=prep_time
        )

        # Add and commit the new recipe to get an ID for it
        db.session.add(new_recipe)
        db.session.flush()  # Get the ID before committing

        # Add ingredients if provided
        for ingredient in ingredients:
            ingredient_name = ingredient.get('ingredient_name')
            quantity = ingredient.get('quantity')
            unit = ingredient.get('unit')

            # Validate ingredient fields
            if not ingredient_name or not quantity or not unit:
                return jsonify({"message": "Bad Request", "errors": {"Ingredient Error": "Each ingredient requires a name, quantity, and unit"}}), 400

            new_ingredient = RecipeIngredient(
                recipe_id=new_recipe.id,
                ingredient_name=ingredient_name,
                quantity=quantity,
                unit=unit
            )
            db.session.add(new_ingredient)

        # Commit the ingredients
        db.session.commit()

        return jsonify(new_recipe.to_dict()), 201

    except Exception as e:
        db.session.rollback()  # Rollback on error
        print(f"Error creating recipe: {e}")  # Log the error for debugging
        return jsonify({"message": "Internal Server Error"}), 500
# Get a specific recipe by ID
@recipe_routes.route('/<int:id>', methods=['GET'])
def get_recipe(id):
    """
    Get a recipe by ID.
    """
    recipe = Recipe.query.get(id)
    if not recipe:
        return jsonify({"message": "Recipe couldn't be found"}), 404

    recipe_data = recipe.to_dict()
    recipe_data['author'] = recipe.user.username

    return jsonify(recipe_data), 200

# Simplified route to get recipes by type
# Get recipes by type
@recipe_routes.route('/type/<recipe_type>', methods=['GET'])
def get_recipes_by_type(recipe_type):
    # Convert the string parameter to lowercase
    recipe_type_lower = recipe_type.lower()

    # Try to find the matching enum value, regardless of case
    try:
        recipe_type_enum = next(rt for rt in RecipeType if rt.value.lower() == recipe_type_lower)
    except StopIteration:
        return jsonify({"error": "Invalid recipe type"}), 400

    # Query the database for recipes of that type
    recipes = Recipe.query.filter_by(type=recipe_type_enum).all()

    if not recipes:
        return jsonify({"message": "No recipes found for the given type"}), 404

    # Serialize the recipes into a list of dictionaries
    recipes_list = [{"id": r.id, "name": r.name, "description": r.description, "type": r.type.value} for r in recipes]

    return jsonify({"recipes": recipes_list}), 200

# Update a recipe by ID
@recipe_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_recipe(id):
    """
    Update a recipe.
    """
    recipe = Recipe.query.get(id)

    if not recipe:
        return jsonify({"message": "Recipe couldn't be found"}), 404
    # Ensure only the recipe owner can update it
    if recipe.user_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    ingredients = data.get('ingredients')
    instructions = data.get('instructions')

    if not name or not ingredients or not instructions:
        return jsonify({"message": "Bad Request", "errors": {"Required Fields": "Name, ingredients, and instructions are required"}}), 400

    recipe.name = name
    recipe.description = description
    recipe.ingredients = ingredients
    recipe.instructions = instructions

    db.session.commit()

    return jsonify(recipe.to_dict()), 200

# Delete a recipe by ID
@recipe_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_recipe(id):
    """
    Delete a recipe.
    """
    recipe = Recipe.query.get(id)

    if not recipe:
        return jsonify({"message": "Recipe couldn't be found"}), 404
    # Ensure only the recipe owner can delete it
    if recipe.user_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    db.session.delete(recipe)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"}), 200

# Get all personal recipes of the current user
@recipe_routes.route('/personal', methods=['GET'])
@login_required
def get_personal_recipes():
    """
    Get all recipes created by the current user.
    """
    personal_recipes = Recipe.query.filter_by(user_id=current_user.id).all()
    return jsonify({"Recipes": [recipe.to_dict() for recipe in personal_recipes]}), 200

@recipe_routes.route('/<int:id>/reviews', methods=['GET'])
def get_reviews(id):
    """
    Get all reviews for a recipe.
    """
    reviews = Review.query.filter_by(recipe_id=id).all()

    if not reviews:
        return jsonify({"message": "No reviews found for this recipe"}), 404

    return jsonify({"Reviews": [review.to_dict() for review in reviews]}), 200
