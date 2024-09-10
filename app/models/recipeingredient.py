from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class RecipeIngredient(db.Model):
    __tablename__ = 'recipe_ingredients'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ingredient_name = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'ingredient_name': self.ingredient_name,
            'quantity': self.quantity,
            'unit': self.unit
        }
