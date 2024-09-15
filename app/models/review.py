from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)
    content = db.Column(db.Text, nullable=True)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    user = db.relationship('User', back_populates='reviews')
    recipe = db.relationship('Recipe', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.user.username,
            'recipe_id': self.recipe_id,
            'content': self.content,
            'stars': self.stars,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
