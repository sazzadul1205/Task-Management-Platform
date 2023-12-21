import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Swal from "sweetalert2";
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { motion } from "framer-motion";

const SignUp = () => {
    const { createUser, updateUser } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const onSubmit = (data) => {
        const UserData = {
            name: data.name,
            email: data.email,
            role: 'member',
            creationTime: formattedDateTime,
        }
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                updateUser(data.name, data.photoURL)
                    .then(() => {
                        axiosPublic.post('/users', UserData)
                            .then(res => {
                                if (res.data.insertedId) {
                                    showSuccessAlert()
                                    reset();
                                    navigate('/');
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                showErrorAlert('Failed to update user profile.');
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        showErrorAlert('Failed to update user profile.');
                    });
            })
            .catch(error => {
                console.log(error);
                showErrorAlert(error.message);
            });
    };

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Sign Up Successful!',
            text: 'You are now a user Welcome.',
        });
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Sign Up Failed',
            text: errorMessage,
        });
    };

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col md:flex-row-reverse mt-20 ">
                    <div className="text-center md:w-1/2 lg:text-left ml-10 text-blue-500">
                        <h1 className="text-5xl font-bold">Join Task Manager</h1>
                        <p className="py-6">
                            Elevate your productivity with Task Compiler! Sign up now to access personalized task management,
                            expert guidance, and join a supportive community to streamline your workflow.
                        </p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100 opacity-90">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body text-white">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('name', { required: true })}
                                    name="name"
                                    placeholder="Your Name"
                                    className="input input-bordered"
                                />
                                {errors.name && (
                                    <span className="text-red-600">Name is required</span>
                                )}
                            </div>
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
                                {errors.email && (
                                    <span className="text-red-600">Email is required</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Photo URL</span>
                                </label>
                                <input
                                    type="url"
                                    {...register('photoURL', { required: true })}
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                />
                                {errors.photoURL && (
                                    <span className="text-red-600">Photo URL is required</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register('password', {
                                        required: true,
                                        maxLength: 20,
                                        minLength: 8,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                    })}
                                    name="password"
                                    placeholder="Your Password"
                                    className="input input-bordered"
                                    required
                                />
                                {errors.password?.type === 'required' && (
                                    <p className="text-red-600" role="alert">
                                        Password is required
                                    </p>
                                )}
                                {errors.password?.type === 'minLength' && (
                                    <p className="text-red-600" role="alert">
                                        Password must be 8 characters
                                    </p>
                                )}
                                {errors.password?.type === 'maxLength' && (
                                    <p className="text-red-600" role="alert">
                                        Password must be below 20 characters
                                    </p>
                                )}
                                {errors.password?.type === 'pattern' && (
                                    <p className="text-red-600" role="alert">
                                        Password must have at least one upper case, one lower case, special characters, and a number
                                    </p>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text text-white-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control">
                                <motion.input
                                    className={`w-full p-3 bg-blue-800 hover:bg-blue-600 text-white disabled:bg-gray-500 rounded-xl`}
                                    type="submit"
                                    value="Sign Up"
                                    whileHover={{ scale: 1.0 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                />
                                <h1 className="font-normal text-sm mt-2">
                                    Already have an account?{' '}
                                    <span className="text-blue-500">
                                        <Link to={'/login'}>Log In</Link>
                                    </span>
                                </h1>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <div className='mx-auto'>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
