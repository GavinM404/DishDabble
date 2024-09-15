const GET_REVIEWS = "reviews/getReviews";
const CLEAR_REVIEWS = "reviews/clearReviews";
const POST_REVIEW = "reviews/postReview";
const DELETE_REVIEW = "reviews/deleteReview";
const UPDATE_REVIEW = "reviews/updateReview";

const updateReviewsAction = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
});

const getReviewsAction = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

const clearReviewsAction = () => ({
  type: CLEAR_REVIEWS,
});

const postReviewAction = (review) => ({
  type: POST_REVIEW,
  review,
});

const deleteReviewAction = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

export const getReviews = (recipeId) => async (dispatch) => {
  dispatch(clearReviewsAction());
  const res = await fetch(`/api/recipes/${recipeId}/reviews`);

  if (res.ok) {
    const parsedRes = await res.json();
    dispatch(getReviewsAction(parsedRes.Reviews));
  }
};

export const createReview = (payload) => async (dispatch) => {
  const res = await fetch(`/api/recipes/${payload.recipeId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const review = await res.json();
    dispatch(postReviewAction(review));
  }
};

export const updateReview = (payload) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${payload.id}`, {
    // Updated to use the correct route for update
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const review = await res.json();
    dispatch(updateReviewsAction(review));
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteReviewAction(reviewId));
  }
};

const initialState = {
  reviews: {},
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const newReviews = {};
      action.reviews.forEach((review) => {
        newReviews[review.id] = review;
      });
      return {
        ...state,
        reviews: newReviews,
      };
    }
    case CLEAR_REVIEWS: {
      return {
        ...state,
        reviews: {},
      };
    }
    case UPDATE_REVIEW: {
      const updatedReview = action.payload;
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [updatedReview.id]: updatedReview,
        },
      };
    }
    case POST_REVIEW: {
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.review.id]: action.review,
        },
      };
    }
    case DELETE_REVIEW: {
      const newReviews = { ...state.reviews };
      delete newReviews[action.reviewId];
      return {
        ...state,
        reviews: newReviews,
      };
    }
    default: {
      return state;
    }
  }
};

export default reviewsReducer;
