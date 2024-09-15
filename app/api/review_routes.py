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

@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    """
    Update a review.
    """
    review = Review.query.get(review_id)

    if not review:
        return jsonify({"message": "Review couldn't be found"}), 404
    if review.user_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    data = request.get_json()
    content = data.get('content')
    stars = data.get('stars')

    if not stars or not (1 <= stars <= 5):
        return jsonify({"message": "Bad Request", "errors": {"Stars": "Stars must be between 1 and 5."}}), 400

    try:
        review.content = content
        review.stars = stars
        review.updated_at = datetime.now(timezone.utc)

        db.session.commit()

        return jsonify(review.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error updating review: {e}")
        return jsonify({"message": "Internal Server Error"}), 500
