from app.models import db, Recipe,environment, RecipeIngredient, SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text


def seed_recipes():
    recipe1 = Recipe(
        name="Classic Chocolate Cake",
        description="A rich, moist chocolate cake with a creamy chocolate frosting.",
        instructions="1. Preheat oven to 350°F.\n2. Mix the dry ingredients.\n3. Combine wet ingredients and mix with dry. \n4. Bake for 30 minutes.",
        nutritional_info={"calories": 350, "protein": 4, "fat": 12, "carbohydrates": 58},
        cuisine="American",
        user_id=1
    )

    recipe2 = Recipe(
        name="Chicken Caesar Salad",
        description="Grilled chicken served over romaine lettuce with Caesar dressing.",
        instructions="1. Grill the chicken.\n2. Toss the lettuce with Caesar dressing and croutons.\n3. Slice chicken and serve on top.",
        nutritional_info={"calories": 480, "protein": 35, "fat": 30, "carbohydrates": 12},
        cuisine="Italian",
        user_id=1
    )

    recipe3 = Recipe(
        name="Vegetarian Stir-fry",
        description="A healthy and colorful mix of vegetables stir-fried in soy sauce.",
        instructions="1. Heat oil in a pan.\n2. Stir-fry the vegetables for 5-7 minutes.\n3. Add soy sauce and serve with rice.",
        nutritional_info={"calories": 250, "protein": 5, "fat": 10, "carbohydrates": 30},
        cuisine="Chinese",
        user_id=2
    )

    recipe4 = Recipe(
        name="Spaghetti Carbonara",
        description="Classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        instructions="1. Cook spaghetti.\n2. Mix eggs and cheese.\n3. Fry pancetta and combine with pasta and sauce.",
        nutritional_info={"calories": 400, "protein": 15, "fat": 18, "carbohydrates": 50},
        cuisine="Italian",
        user_id=2
    )

    recipe5 = Recipe(
        name="Blueberry Muffins",
        description="Delicious and fluffy muffins bursting with fresh blueberries.",
        instructions="1. Preheat oven to 375°F.\n2. Mix dry and wet ingredients separately.\n3. Combine and fold in blueberries.\n4. Bake for 20 minutes.",
        nutritional_info={"calories": 280, "protein": 4, "fat": 12, "carbohydrates": 40},
        cuisine="American",
        user_id=3
    )

    recipe6 = Recipe(
        name="Beef Tacos",
        description="Ground beef tacos served with salsa, cheese, and lettuce.",
        instructions="1. Cook the beef with taco seasoning.\n2. Assemble tacos with toppings.\n3. Serve with salsa.",
        nutritional_info={"calories": 300, "protein": 20, "fat": 12, "carbohydrates": 25},
        cuisine="Mexican",
        user_id=3
    )

    recipe7 = Recipe(
        name="Garlic Butter Shrimp",
        description="Shrimp sautéed in garlic and butter, served with lemon wedges.",
        instructions="1. Heat butter in a skillet.\n2. Sauté garlic and shrimp for 5-7 minutes.\n3. Serve with lemon slices.",
        nutritional_info={"calories": 200, "protein": 24, "fat": 10, "carbohydrates": 3},
        cuisine="American",
        user_id=1
    )

    recipe8 = Recipe(
        name="Lentil Soup",
        description="A hearty and nutritious soup made with lentils and vegetables.",
        instructions="1. Cook lentils in broth.\n2. Add vegetables and simmer for 20 minutes.\n3. Season and serve hot.",
        nutritional_info={"calories": 180, "protein": 12, "fat": 4, "carbohydrates": 30},
        cuisine="Middle Eastern",
        user_id=1
    )

    recipe9 = Recipe(
        name="Margherita Pizza",
        description="Classic pizza topped with fresh tomatoes, mozzarella, and basil.",
        instructions="1. Roll out pizza dough.\n2. Spread tomato sauce and top with cheese and basil.\n3. Bake at 475°F for 12-15 minutes.",
        nutritional_info={"calories": 320, "protein": 15, "fat": 12, "carbohydrates": 40},
        cuisine="Italian",
        user_id=2
    )

    recipe10 = Recipe(
        name="Oatmeal Raisin Cookies",
        description="Chewy cookies filled with oats and sweet raisins.",
        instructions="1. Preheat oven to 350°F.\n2. Cream butter and sugar.\n3. Add oats, flour, raisins, and mix. \n4. Bake for 12-15 minutes.",
        nutritional_info={"calories": 220, "protein": 3, "fat": 8, "carbohydrates": 35},
        cuisine="American",
        user_id=3
    )

    db.session.add_all([recipe1, recipe2, recipe3, recipe4, recipe5, recipe6, recipe7, recipe8, recipe9, recipe10])
    db.session.commit()

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()
