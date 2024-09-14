from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review
from datetime import datetime, timezone

review_routes = Blueprint('reviews', __name__)

@review_routes.route('<int:review_id>', methods=['DELETE'])
@login_required
def delete_review( review_id):
    """
    Delete a review.
    """
    review = Review.query.get(review_id)

    if not review:
        return jsonify({"message": "Review couldn't be found"}), 404
    if review.user_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    db.session.delete(review)
    db.session.commit()

    return jsonify({"message": "Review deleted successfully"}), 200
