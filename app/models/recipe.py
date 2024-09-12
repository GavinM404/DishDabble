from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone
import enum

class RecipeType(enum.Enum):
    SNACK = "snack"
    ENTREE = "entree"
    DESSERT = "dessert"
    LUNCH = "lunch"

class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    instructions = db.Column(db.Text, nullable=False)
    nutritional_info = db.Column(db.JSON, nullable=True)
    cuisine = db.Column(db.String, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    ratings = db.Column(db.Float, nullable=True, default=0.0)  # Average rating
    type = db.Column(db.Enum(RecipeType), nullable=False)  # Type of the recipe (e.g., snack, entree, etc.)
    # Relationship with RecipeIngredient
    ingredients = db.relationship('RecipeIngredient', backref='recipe', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'instructions': self.instructions,
            'nutritional_info': self.nutritional_info,
            'cuisine': self.cuisine,
            'user_id': self.user_id,
            'ingredients': [ingredient.to_dict() for ingredient in self.ingredients],
            'ratings': self.ratings,  # Include ratings
            'type': self.type.value,  # Get the string value of the enum
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
