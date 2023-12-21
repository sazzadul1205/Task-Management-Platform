import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const NewTasks = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
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

    const [selectedPriority, setSelectedPriority] = useState('low'); // Default priority

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Task Added Successfully!',
            text: 'Your new task has been added successfully.',
        });
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Failed to Add Task',
            text: errorMessage,
        });
    };

    const onSubmit = (data) => {
        const { title, description, deadline, priority } = data;
        const newTask = {
            title,
            description,
            deadline,
            priority,
            email: user?.email,
            subDate: formattedDateTime,
            state: 'To-Do'
        };

        axiosPublic
            .post('/tasks', newTask)
            .then((res) => {
                if (res.data.insertedId) {
                    showSuccessAlert();
                    reset();
                }
            })
            .catch((error) => {
                console.log(error);
                showErrorAlert('Failed to add the task. Please try again.');
            });
    };

    const handlePriorityChange = (event) => {
        setSelectedPriority(event.target.value);
    };

    return (
        <div>
            <h1 className='text-center text-5xl text-blue-500 text-bold p-10'>Add New Tasks</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body w-1/2 bg-gray-300 mx-auto">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Title</span>
                    </label>
                    <input
                        type="text"
                        {...register('title', { required: true })}
                        name="title"
                        placeholder="Title"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Description</span>
                    </label>
                    <input
                        type="text"
                        {...register('description', { required: true })}
                        name="description"
                        placeholder="Description"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Deadline</span>
                    </label>
                    <input
                        type="date"
                        {...register('deadline', { required: true })}
                        name="deadline"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Priority</span>
                    </label>
                    <select
                        className={`p-3 ${selectedPriority === 'low'
                            ? 'bg-[#c0c0c0] text-black'
                            : selectedPriority === 'moderate'
                                ? 'bg-[#d4af37] text-black'
                                : 'bg-[#5bb9e2] text-black'
                            }`}
                        {...register('priority')}
                        onChange={handlePriorityChange}
                    >
                        <option className='bg-[#c0c0c0]' value="low">Low</option>
                        <option className='bg-[#d4af37]' value="moderate">Moderate</option>
                        <option className='bg-[#5bb9e2]' value="high">High</option>
                    </select>
                </div>

                <div className='form-control mt-6 text-black'>
                    <motion.input
                        className={`w-full p-3 bg-blue-800 hover:bg-blue-600 text-white rounded-xl`}
                        type='submit'
                        value='Add Task'
                        whileHover={{ scale: 1.0 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    />
                </div>
            </form>
        </div>
    );
};

export default NewTasks;
