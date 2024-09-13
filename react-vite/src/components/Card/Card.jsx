import { useNavigate } from "react-router-dom";

function Card({ id, name, src, rating }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipes/${id}`);
    };


    const numericRating = typeof rating === 'number' ? rating : parseFloat(rating);

    const formattedRating = !isNaN(numericRating) ? numericRating.toFixed(1) : 'New!';

    return (
        <div className='card' name={name} onClick={handleClick}>
            <div className='card_info'>
                <div className='card_info-header'>
                    <h2>{`${name}`}</h2>
                    <img src={src} alt='' />
                    <h3>{formattedRating}</h3>
                </div>
            </div>
        </div>
    );
}

export default Card;
