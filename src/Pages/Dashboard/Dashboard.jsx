import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { register, handleSubmit, reset } = useForm();
    const [tasks, setTasks] = useState({
        todo: [],
        ongoing: [],
        completed: [],
    });

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // If no destination, do nothing (dragged outside the list)
        if (!destination) return;

        // If dropped in the same list and position, do nothing
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        // Clone the tasks
        const updatedTasks = { ...tasks };

        // Remove the task from the source list
        const [removedTask] = updatedTasks[source.droppableId].splice(source.index, 1);

        // Add the task to the destination list
        updatedTasks[destination.droppableId].splice(destination.index, 0, removedTask);

        // Update the state with the new task order
        setTasks(updatedTasks);
    };

    const onSubmit = (data) => {
        const { title, description, deadline, priority } = data;

        // Create a new task object
        const newTask = {
            id: `task-${Date.now()}`,
            title,
            description,
            deadline,
            priority,
        };

        // Update the state with the new task in the 'todo' list
        setTasks((prevTasks) => ({
            ...prevTasks,
            todo: [...prevTasks.todo, newTask],
        }));

        // Reset the form after submission
        reset();
    };

    const onDelete = (taskId) => {
        // Create a copy of the tasks
        const updatedTasks = { ...tasks };

        // Loop through each list and remove the task with the matching ID
        for (const key in updatedTasks) {
            updatedTasks[key] = updatedTasks[key].filter((task) => task.id !== taskId);
        }

        // Update the state with the modified tasks
        setTasks(updatedTasks);
    };

    return (
        <div className='pt-36'>
            <h2>Task Management Dashboard</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="card-body w-1/2 bg-gray-300 mx-auto">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Title</span>
                    </label>
                    <input
                        type="text"
                        {...register('title', { required: true })}
                        name="title"
                        placeholder="Your Email"
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
                        placeholder="description"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Description</span>
                    </label>
                    <input
                        type="date"
                        {...register('Deadline', { required: true })}
                        name="Deadline"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Priority</span>
                    </label>
                    <select className='p-3' {...register('priority')}>
                        <option className='bg-[#c0c0c0]' value="low">Low</option>
                        <option className='bg-[#d4af37]' value="moderate">Moderate</option>
                        <option className='bg-[ #5bb9e2,' value="high">High</option>
                    </select>
                </div>

                <div className="form-control mt-6 text-black">
                    <motion.input
                        className={`w-full p-3 bg-blue-800 hover:bg-blue-600 disabled:bg-gray-500 rounded-xl`}
                        type="submit"
                        value="Log In"
                        whileHover={{ scale: 1.0 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    />

                </div>
            </form>

            <DragDropContext onDragEnd={onDragEnd}>
                {Object.keys(tasks).map((status) => (
                    <div key={status} className="dashboard-column">
                        <h3>{status}</h3>
                        <Droppable droppableId={status} key={status}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {tasks[status].map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <div>{task.title}</div>
                                                    <button onClick={() => onDelete(task.id)}>Delete</button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
};

export default Dashboard;
