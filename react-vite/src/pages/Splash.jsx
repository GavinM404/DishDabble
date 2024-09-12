import { Link } from 'react-router-dom';

const Splash = () => {
    return (
        <div className='splash-container'>
            {/* Categories Section */}
            <div className='categories-container'>
                <div className='category'>
                    <Link to="/recipes/entree">
                        <img src="https://i.ibb.co/bWwV92b/pexels-jdgromov-4663245.jpg" alt="Entree" />
                        <h2>Entrees</h2>
                    </Link>
                </div>
                <div className='category'>
                    <Link to="/recipes/lunch">
                        <img src="https://i.ibb.co/MRJbPXB/pexels-rajesh-tp-749235-1603901.jpg" alt="Lunch" />
                        <h2>Lunches</h2>
                    </Link>
                </div>
                <div className='category'>
                    <Link to="/recipes/dessert">
                        <img src="https://i.ibb.co/Mf1gqjd/pexels-gustavoraton-7144269.jpg" alt="Dessert" />
                        <h2>Desserts</h2>
                    </Link>
                </div>
                <div className='category'>
                    <Link to="/recipes/snack">
                        <img src="https://i.ibb.co/tHMp54n/pexels-rdne-6004713.jpg" alt="Snack" />
                        <h2>Snacks</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Splash;
