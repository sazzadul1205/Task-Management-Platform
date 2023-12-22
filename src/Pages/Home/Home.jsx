import { Link } from 'react-router-dom';
import "./Home.css"
import Audience from '../Audience/Audience';

const Home = () => {
    return (
        <div>
            <div className="container mx-auto pt-32 pb-5">
                <div className='Home-background relative w-full h-[700px] bg-fixed'>
                    <div className='absolute inset-0 flex flex-col justify-center items-center text-black text-center bg-white  bg-opacity-75 py-20'>
                        <h1 className="text-4xl font-bold mb-4">Welcome to SCC Technovision Inc.</h1>
                        <p className="text-lg mb-8">
                            We are dedicated to providing an innovative task management platform to enhance and improve your productivity.
                        </p>
                        <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Let’s Explore
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <Audience></Audience>
            </div>
        </div>
    );
};

export default Home;
