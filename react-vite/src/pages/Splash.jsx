import { Link } from 'react-router-dom';
import './Splash.css'

const Splash = () => {
    return (
        <div className='splash-container'>
            <div className='categories-container'>
                <div className='category'>
                    <h2>Entrees</h2>
                    <Link to="/recipes/types/entree">
                        <img src="https://i.ibb.co/bWwV92b/pexels-jdgromov-4663245.jpg" alt="Entree" />
                    </Link>
                </div>
                <div className='category'>
                <h2>Lunches</h2>
                    <Link to="/recipes/types/lunch">
                        <img src="https://i.ibb.co/MRJbPXB/pexels-rajesh-tp-749235-1603901.jpg" alt="Lunch" />
                    </Link>
                </div>
                <div className='category'>
                <h2>Desserts</h2>
                    <Link to="/recipes/types/dessert">
                        <img src="https://i.ibb.co/Mf1gqjd/pexels-gustavoraton-7144269.jpg" alt="Dessert" />
                    </Link>
                </div>
                <div className='category'>
                    <h2>Snacks</h2>
                    <Link to="/recipes/types/snack">
                        <img src="https://i.ibb.co/tHMp54n/pexels-rdne-6004713.jpg" alt="Snack" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Splash;
