from app.models import db, Recipe,environment, RecipeIngredient, SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text

def seed_recipe_ingredients():
    ingredients = [
        RecipeIngredient(ingredient_name="Flour", quantity=2, unit="cups", recipe_id=1),
        RecipeIngredient(ingredient_name="Sugar", quantity=1.5, unit="cups", recipe_id=1),
        RecipeIngredient(ingredient_name="Cocoa Powder", quantity=0.75, unit="cups", recipe_id=1),
        RecipeIngredient(ingredient_name="Eggs", quantity=2, unit="large", recipe_id=1),

        RecipeIngredient(ingredient_name="Chicken Breast", quantity=2, unit="pieces", recipe_id=2),
        RecipeIngredient(ingredient_name="Romaine Lettuce", quantity=1, unit="head", recipe_id=2),
        RecipeIngredient(ingredient_name="Caesar Dressing", quantity=0.5, unit="cups", recipe_id=2),

        RecipeIngredient(ingredient_name="Broccoli", quantity=1, unit="cup", recipe_id=3),
        RecipeIngredient(ingredient_name="Carrots", quantity=1, unit="cup", recipe_id=3),
        RecipeIngredient(ingredient_name="Soy Sauce", quantity=2, unit="tbsp", recipe_id=3),

        RecipeIngredient(ingredient_name="Spaghetti", quantity=200, unit="grams", recipe_id=4),
        RecipeIngredient(ingredient_name="Eggs", quantity=2, unit="large", recipe_id=4),
        RecipeIngredient(ingredient_name="Pancetta", quantity=100, unit="grams", recipe_id=4),

        RecipeIngredient(ingredient_name="Blueberries", quantity=1, unit="cup", recipe_id=5),
        RecipeIngredient(ingredient_name="Flour", quantity=2, unit="cups", recipe_id=5),
        RecipeIngredient(ingredient_name="Sugar", quantity=1, unit="cup", recipe_id=5),

        # Additional Ingredients for other recipes
        RecipeIngredient(ingredient_name="Ground Beef", quantity=300, unit="grams", recipe_id=6),
        RecipeIngredient(ingredient_name="Taco Seasoning", quantity=2, unit="tbsp", recipe_id=6),

        RecipeIngredient(ingredient_name="Shrimp", quantity=300, unit="grams", recipe_id=7),
        RecipeIngredient(ingredient_name="Garlic", quantity=2, unit="cloves", recipe_id=7),

        RecipeIngredient(ingredient_name="Lentils", quantity=1, unit="cup", recipe_id=8),
        RecipeIngredient(ingredient_name="Vegetable Broth", quantity=4, unit="cups", recipe_id=8),

        RecipeIngredient(ingredient_name="Pizza Dough", quantity=1, unit="piece", recipe_id=9),
        RecipeIngredient(ingredient_name="Tomato Sauce", quantity=0.5, unit="cups", recipe_id=9),

        RecipeIngredient(ingredient_name="Oats", quantity=2, unit="cups", recipe_id=10),
        RecipeIngredient(ingredient_name="Raisins", quantity=1, unit="cup", recipe_id=10),
    ]

    db.session.add_all(ingredients)
    db.session.commit()

def undo_recipe_ingredients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipe_ingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipe_ingredients"))

    db.session.commit()
