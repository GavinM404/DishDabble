import { useNavigate } from "react-router-dom";
import "./Card.css"

function Card({ id, name, src, rating }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipes/${id}`);
    };

    const numericRating = typeof rating === 'number' ? rating : parseFloat(rating);
    const formattedRating = !isNaN(numericRating) ? numericRating.toFixed(1) : 'New!';

    return (
        <div className='card' onClick={handleClick}>
            <img src={src} alt={name} />
            <div className='card_info'>
                <h2>{name}</h2>
                <h3>{formattedRating}</h3>
            </div>
        </div>
    );
}

export default Card;
