import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { deleteReview } from '../../redux/reviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const Reviews = ({ currentUser, recipeOwnerId, reviews }) => {
    const { setModalContent } = useModal();
    const dispatch = useDispatch();
    const reviewToDeleteRef = useRef(null);

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

    const averageRating = reviewCount > 0
        ? (reviews.reduce((acc, review) => acc + review.stars, 0) / reviewCount).toFixed(1)
        : 'New';

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
                            <h3>{review.username}</h3>
                            <p>{new Date(review.created_at).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                            <p>{review.content}</p>
                            {currentUser && currentUser.id === review.user_id && (
                                <button
                                    onClick={() => handleDeleteReview(review.id)}
                                    className="delete-review-button"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviews;
