import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { deleteReview } from '../../redux/reviews';
import ReviewForm from '../ReviewForm/ReviewForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import './Reviews.css';

const Reviews = ({ currentUser, recipeOwnerId, reviews, recipeId, onSubmit }) => {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const reviewToDeleteRef = useRef(null);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const handleDeleteReview = (reviewId) => {
    reviewToDeleteRef.current = reviewId;
    setModalContent(
      <DeleteConfirmationModal
        thing="review"
        onDelete={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    );
  };

  const handleConfirmDelete = () => {
    const reviewId = reviewToDeleteRef.current;
    if (reviewId !== null) {
      dispatch(deleteReview(reviewId));
      reviewToDeleteRef.current = null;
    } else {
      console.error("Review ID to delete is null.");
    }
  };

  const handleCancelDelete = () => {
    reviewToDeleteRef.current = null;
  };

  const reviewCount = reviews.length;
//   const averageRating = reviewCount > 0
//     ? (reviews.reduce((acc, review) => acc + review.stars, 0) / reviewCount).toFixed(1)
//     : 'New';

  const handleEditClick = (reviewId) => {
    setEditingReviewId(reviewId);
  };

  const handleReviewSubmit = () => {
    setEditingReviewId(null);
    onSubmit();
  };

  const renderStars = (stars) => {
    return (
      <span className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={star <= stars ? solidStar : regularStar}
            className="star-icon"
          />
        ))}
      </span>
    );
  };

  return (
    <div className='reviews'>
      <div className='reviews-heading'>
        <h2>Reviews</h2>
      </div>

      <div className='reviews-list'>
        {reviewCount === 0 ? (
          currentUser && currentUser.id !== recipeOwnerId && (
            <p>Be the first to post a review!</p>
          )
        ) : (
          reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(review => (
            <div key={review.id} className='review'>
              {editingReviewId !== review.id ? (
                <>
                  <div className="review-header">
                    <h3>{review.username}</h3>
                    <div className="stars-rating">
                      {renderStars(review.stars)}
                      <span className="stars-number">{review.stars} stars</span>
                    </div>
                  </div>
                  <p className="review-date">{new Date(review.created_at).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                  <p className="review-content">{review.content}</p>


                  {currentUser && currentUser.id === review.user_id && (
                    <div className="review-actions">
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="delete-review-button"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditClick(review.id)}
                        className="edit-review-button"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </>
              ) : (

                <ReviewForm
                  recipeId={recipeId}
                  existingReview={review}
                  onSubmit={handleReviewSubmit}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
