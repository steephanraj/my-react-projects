export default function ProductReview({ reviews }) {

    return (
        <div class="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map((review, index) => (
                <div key={index} class="review-card my-3">
                    <div class="rating-outer">
                        <div class="rating-inner" style={{ width: `${review.rating / 5 * 100}%` }}></div>
                    </div>
                    <p class="review_user">by {review.rating}</p>
                    <p class="review_comment">{review.comment}</p>
                    <hr />
                </div>
            ))
            }

        </div>
    )
}