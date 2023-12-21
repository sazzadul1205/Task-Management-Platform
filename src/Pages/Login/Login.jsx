import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        console.log(data);
        signIn(data.email, data.password)
            .then(res => {
                const user = res.user
                console.log(user);
                showSuccessLogInAlert();
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
                showFailedLogInAlert(error.message);
            });
    }

    const showSuccessLogInAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You are now logged in.',
        });
    };

    const showFailedLogInAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: errorMessage,
        });
    };

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col md:flex-row mt-20 text-white">
                <div className="text-center md:w-1/2 lg:text-left ml-10 text-blue-500">
                    <h1 className="text-5xl font-bold">Welcome Back to Task Compiler</h1>
                    <p className="py-6">
                        Log in to manage your tasks efficiently with our Task Compiler platform! Enjoy personalized task lists,
                        expert guidance, and connect with a supportive community to enhance your productivity.
                    </p>
                </div>
                <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100 opacity-90">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                name="email"
                                placeholder="Your Email"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: true,
                                })}
                                name="password"
                                placeholder="Your Password"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control mt-6 text-white">
                            <motion.input
                                className={`w-full p-3 bg-blue-800 hover:bg-blue-600 disabled:bg-gray-500 rounded-xl`}
                                type="submit"
                                value="Log In"
                                whileHover={{ scale: 1.0 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            />
                            <h1 className="font-normal text-sm mt-2">
                                Don`t have an account?{' '}
                                <span className="text-blue-600">
                                    <Link to={'/signUp'}>Sign Up</Link>
                                </span>
                            </h1>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="mx-auto">
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
