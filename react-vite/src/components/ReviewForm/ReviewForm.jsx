import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReview, updateReview } from '../../redux/reviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './ReviewForm.css';

const ReviewForm = ({ recipeId, existingReview = null, onSubmit }) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(existingReview ? existingReview.stars : 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState(existingReview ? existingReview.content : '');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (existingReview) {
            setRating(existingReview.stars);
            setReviewText(existingReview.content);
        }
    }, [existingReview]);

    const validateForm = () => {
        const validationErrors = {};
        if (!rating) validationErrors.rating = "Please provide a rating.";
        if (!reviewText.trim()) validationErrors.reviewText = "Review cannot be empty.";
        return validationErrors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        const reviewData = {
          stars: rating,
          content: reviewText,
          recipeId,
          id: existingReview ? existingReview.id : null,
        };

        if (existingReview) {
          await dispatch(updateReview(reviewData));
        } else {
          await dispatch(createReview(reviewData));
        }

        onSubmit();
      };

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleStarMouseEnter = (selectedRating) => {
        setHoverRating(selectedRating);
    };

    const handleStarMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="review-form-container">
            <form className="review-form" onSubmit={handleSubmit}>
                <h2>{existingReview ? "Update your review" : "Leave a Review"}</h2>

                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className="star"
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => handleStarMouseEnter(star)}
                            onMouseLeave={handleStarMouseLeave}
                        >
                            <FontAwesomeIcon
                                icon={star <= (hoverRating || rating) ? solidStar : regularStar}
                                className="star-icon"
                            />
                        </span>
                    ))}
                </div>
                {errors.rating && <p className="error">{errors.rating}</p>}

                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review..."
                    required
                />
                {errors.reviewText && <p className="error">{errors.reviewText}</p>}

                <button type="submit">{existingReview ? "Update Review" : "Submit Review"}</button>
            </form>
        </div>
    );
};

export default ReviewForm;
