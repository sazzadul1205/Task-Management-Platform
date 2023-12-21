import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const googleUser = result.user; // Use result.user directly

                // Check if the user already exists in your database
                axiosPublic.get(`/users?email=${googleUser.email}`)
                    .then(response => {
                        const { exists, user } = response.data;

                        if (exists) {
                            // User already exists, log in
                            showSuccessAlert();
                            navigate('/');
                        } else {
                            // User doesn't exist, create a new entry in the database
                            const userData = {
                                name: googleUser.displayName,
                                email: googleUser.email,
                                role: 'user',
                                creationTime: formattedDateTime,
                            };

                            axiosPublic.post('/users', userData)
                                .then(res => {
                                    console.log(res.data);
                                    showSuccessAlert();
                                    navigate('/');
                                })
                                .catch(error => {
                                    console.log(error.response); // Log the complete error response
                                    showErrorAlert(`Error creating user: ${error.message}`);
                                });
                        }
                    })
                    .catch(error => {
                        console.log(error.response); // Log the complete error response
                        showErrorAlert(`Error checking user: ${error.message}`);
                    });
            })
            .catch(error => {
                console.log(error);
                showErrorAlert(`Error signing in with Google: ${error.message}`);
            });
    };

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Sign Up Successful!',
            text: 'You can now log in with your credentials.',
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
            <button onClick={handleGoogleSignIn} className="btn btn-ghost hover:bg-blue-200 text-white hover:text-black border-blue-500 w-72 mb-5">
                <FcGoogle className="text-xl" />
                Google
            </button>
        </div>
    );
};

export default SocialLogin;
