from app.models import db, Recipe, RecipeType, environment, SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text

def seed_recipes():
    recipe1 = Recipe(
        name="Classic Chocolate Cake",
        description="A rich, moist chocolate cake with a creamy chocolate frosting.",
        instructions="Preheat oven to 350°F.\nMix the dry ingredients.\nCombine wet ingredients and mix with dry. \nBake for 30 minutes.",
        nutritional_info={"calories": 350, "protein": 4, "fat": 12, "carbohydrates": 58},
        cuisine="American",
        user_id=1,
        type=RecipeType.DESSERT,
        cook_time=20,
        prep_time= 4,
    )

    recipe2 = Recipe(
        name="Chicken Caesar Salad",
        description="Grilled chicken served over romaine lettuce with Caesar dressing.",
        instructions="Grill the chicken.\nToss the lettuce with Caesar dressing and croutons.\nSlice chicken and serve on top.",
        nutritional_info={"calories": 480, "protein": 35, "fat": 30, "carbohydrates": 12},
        cuisine="Italian",
        user_id=1,
        type=RecipeType.LUNCH,
        cook_time=15,
        prep_time= 5,
    )

    recipe3 = Recipe(
        name="Vegetarian Stir-fry",
        description="A healthy and colorful mix of vegetables stir-fried in soy sauce.",
        instructions="Heat oil in a pan.\nStir-fry the vegetables for 5-7 minutes.\nAdd soy sauce and serve with rice.",
        nutritional_info={"calories": 250, "protein": 5, "fat": 10, "carbohydrates": 30},
        cuisine="Chinese",
        user_id=2,
        type=RecipeType.ENTREE,
        cook_time=115,
        prep_time= 2,
    )

    recipe4 = Recipe(
        name="Spaghetti Carbonara",
        description="Classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        instructions="Cook spaghetti.\nMix eggs and cheese.\nFry pancetta and combine with pasta and sauce.",
        nutritional_info={"calories": 400, "protein": 15, "fat": 18, "carbohydrates": 50},
        cuisine="Italian",
        user_id=2,
        type=RecipeType.ENTREE,
        cook_time=25,
        prep_time= 3,
    )

    recipe5 = Recipe(
        name="Blueberry Muffins",
        description="Delicious and fluffy muffins bursting with fresh blueberries.",
        instructions="Preheat oven to 375°F.\nMix dry and wet ingredients separately.\nCombine and fold in blueberries.\nBake for 20 minutes.",
        nutritional_info={"calories": 280, "protein": 4, "fat": 12, "carbohydrates": 40},
        cuisine="American",
        user_id=3,
        type=RecipeType.SNACK,
        cook_time=11,
        prep_time= 9,
    )

    recipe6 = Recipe(
        name="Beef Tacos",
        description="Ground beef tacos served with salsa, cheese, and lettuce.",
        instructions="Cook the beef with taco seasoning.\nAssemble tacos with toppings.\nServe with salsa.",
        nutritional_info={"calories": 300, "protein": 20, "fat": 12, "carbohydrates": 25},
        cuisine="Mexican",
        user_id=3,
        type=RecipeType.ENTREE,
        cook_time=56,
        prep_time= 2,
    )

    recipe7 = Recipe(
        name="Garlic Butter Shrimp",
        description="Shrimp sautéed in garlic and butter, served with lemon wedges.",
        instructions="Heat butter in a skillet.\nSauté garlic and shrimp for 5-7 minutes.\nServe with lemon slices.",
        nutritional_info={"calories": 200, "protein": 24, "fat": 10, "carbohydrates": 3},
        cuisine="American",
        user_id=1,
        type=RecipeType.ENTREE,
        cook_time=15,
        prep_time= 100,
    )

    recipe8 = Recipe(
        name="Lentil Soup",
        description="A hearty and nutritious soup made with lentils and vegetables.",
        instructions="Cook lentils in broth.\nAdd vegetables and simmer for 20 minutes.\nSeason and serve hot.",
        nutritional_info={"calories": 180, "protein": 12, "fat": 4, "carbohydrates": 30},
        cuisine="Middle Eastern",
        user_id=1,
        type=RecipeType.LUNCH,
        cook_time=14,
        prep_time= 6,
    )

    recipe9 = Recipe(
        name="Margherita Pizza",
        description="Classic pizza topped with fresh tomatoes, mozzarella, and basil.",
        instructions="Roll out pizza dough.\nSpread tomato sauce and top with cheese and basil.\nBake at 475°F for 12-15 minutes.",
        nutritional_info={"calories": 320, "protein": 15, "fat": 12, "carbohydrates": 40},
        cuisine="Italian",
        user_id=2,
        type=RecipeType.ENTREE,
        cook_time=15,
        prep_time= 5,
    )

    recipe10 = Recipe(
        name="Oatmeal Raisin Cookies",
        description="Chewy cookies filled with oats and sweet raisins.",
        instructions="Preheat oven to 350°F.\nCream butter and sugar.\nAdd oats, flour, raisins, and mix. \nBake for 12-15 minutes.",
        nutritional_info={"calories": 220, "protein": 3, "fat": 8, "carbohydrates": 35},
        cuisine="American",
        user_id=3,
        type=RecipeType.DESSERT,
        cook_time=15,
        prep_time= 5,
    )

    db.session.add_all([recipe1, recipe2, recipe3, recipe4, recipe5, recipe6, recipe7, recipe8, recipe9, recipe10])
    db.session.commit()

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()
