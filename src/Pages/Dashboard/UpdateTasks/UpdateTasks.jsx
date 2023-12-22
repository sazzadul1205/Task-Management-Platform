import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';

const UpdateTasks = () => {
    const { register, handleSubmit, setValue } = useForm();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const taskId = useLoaderData()._id;

    const [selectedPriority, setSelectedPriority] = useState('low');
    const [taskState, setTaskState] = useState('');
    const [taskTime, setTaskTime] = useState('');

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const res = await axiosPublic.get(`/tasks/${taskId}`);
                const taskData = res.data;

                setValue('title', taskData.title);
                setValue('description', taskData.description);
                setValue('deadline', taskData.deadline);
                setValue('priority', taskData.priority);

                setTaskState(taskData.state);
                setTaskTime(taskData.subDate);
            } catch (error) {
                console.error('Error fetching task data:', error);
            }
        };

        fetchTaskData();
    }, [axiosPublic, taskId, setValue]);

    const onSubmit = (data) => {
        const updatedTask = {
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority,
            email: user?.email,
            subDate: taskTime,
            state: taskState,
        };

        axiosPublic
            .put(`/tasks/${taskId}`, updatedTask)
            .then(() => {
                showSuccessAlert();
            })
            .catch((error) => {
                console.error('Error updating task:', error);
                showErrorAlert('Failed to update the task. Please try again.');
            });
    };

    const handlePriorityChange = (event) => {
        setSelectedPriority(event.target.value);
    };

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Task Updated Successfully!',
            text: 'Your task has been updated successfully.',
        });
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Failed to Update Task',
            text: errorMessage,
        });
    };
    return (
        <div>
            <div>
                <h1 className='text-center text-5xl text-blue-500 text-bold p-10'>Update Task</h1>
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
                            value='Update Task'
                            whileHover={{ scale: 1.0 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTasks;
