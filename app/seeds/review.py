from app.models import db, Review, environment, SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text

def seed_reviews():
    reviews = [
        Review(
            user_id=1,
            recipe_id=1,
            content="Absolutely delicious and moist! The frosting was the perfect complement to the cake.",
            stars=5,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=2,
            recipe_id=1,
            content="Great cake, but a bit too sweet for my taste.",
            stars=4,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=3,
            recipe_id=1,
            content="The cake was okay, but I had trouble with the baking time.",
            stars=3,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=1,
            recipe_id=2,
            content="Perfectly grilled chicken and the Caesar dressing was spot on!",
            stars=5,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=3,
            recipe_id=2,
            content="Delicious and refreshing. Just what I needed for lunch.",
            stars=4,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=2,
            recipe_id=2,
            content="Good, but I would prefer a bit more seasoning on the chicken.",
            stars=3,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=2,
            recipe_id=3,
            content="Healthy and tasty, but a bit too simple for my liking.",
            stars=4,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=3,
            recipe_id=3,
            content="Great for a quick meal. Loved the soy sauce flavor!",
            stars=5,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=1,
            recipe_id=3,
            content="A bit bland, needed more seasoning. Will try again with some tweaks.",
            stars=3,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=2,
            recipe_id=4,
            content="Classic carbonara. Rich and creamy, loved it!",
            stars=5,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=3,
            recipe_id=4,
            content="Good pasta, but the pancetta was a bit too fatty for my taste.",
            stars=4,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=1,
            recipe_id=4,
            content="Nice recipe, but it took longer to cook than expected.",
            stars=3,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=3,
            recipe_id=5,
            content="Fluffy and full of blueberries. Perfect for breakfast!",
            stars=5,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=2,
            recipe_id=5,
            content="Good muffins, but they were a bit dry. Maybe needed more moisture.",
            stars=4,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=1,
            recipe_id=5,
            content="Decent muffins, but not the best I’ve had.",
            stars=3,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=1,
            recipe_id=6,
            content="Delicious tacos! The seasoning was just right.",
            stars=5,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=2,
            recipe_id=6,
            content="Tasty tacos, but I felt they were a bit greasy.",
            stars=4,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=3,
            recipe_id=6,
            content="Good recipe, but I would add more vegetables next time.",
            stars=3,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=1,
            recipe_id=7,
            content="Garlic butter shrimp was fantastic! Loved the lemon slices.",
            stars=5,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=2,
            recipe_id=7,
            content="Shrimp was well-cooked but the garlic flavor was a bit overpowering.",
            stars=4,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=3,
            recipe_id=7,
            content="Good recipe, but the cooking time was a bit off.",
            stars=3,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=2,
            recipe_id=8,
            content="Hearty and flavorful soup. Perfect for a cold day.",
            stars=5,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=3,
            recipe_id=8,
            content="Nice soup, but I would like it a bit spicier.",
            stars=4,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=1,
            recipe_id=8,
            content="The soup was good, but it could use more vegetables.",
            stars=3,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=3,
            recipe_id=9,
            content="Fantastic pizza with fresh ingredients. Loved the basil!",
            stars=5,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=1,
            recipe_id=9,
            content="Great pizza, but I think the crust could be a bit crispier.",
            stars=4,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=2,
            recipe_id=9,
            content="Decent pizza, but I found it a bit too cheesy for my taste.",
            stars=3,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=2,
            recipe_id=10,
            content="Love these cookies! Chewy and full of raisins.",
            stars=5,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=1,
            recipe_id=10,
            content="Good cookies, but they could use a bit more sweetness.",
            stars=4,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Review(
            user_id=3,
            recipe_id=10,
            content="Cookies were fine, but I found them a bit dry.",
            stars=3,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
    ]

    db.session.add_all(reviews)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
