// MyTasks.js

import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'react-spinners-css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const MyTasks = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: myTasks = [], isLoading, refetch } = useQuery({
    queryKey: ['myTasks'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks?email=${user?.email}`);
      return res.data;
    },
  });

  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case 'low':
        return 'bg-[#c0c0c0]';
      case 'moderate':
        return 'bg-[#d4af37]';
      case 'high':
        return 'bg-[#5bb9e2]';
      default:
        return '';
    }
  };

  const handleDeleteClick = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/tasks/${taskId}`).then(() => {
          refetch();
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        });
      }
    });
  };

  const Task = ({ task }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'task',
      item: { id: task._id, status: task.state },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        className={`card w-60 h-auto shadow-xl p-4 mb-4 m-auto ${getPriorityColorClass(
          task.priority)} `}
      >
        <div className="text-left">
          <h2 className="card-title text-xl font-bold mb-2 text-black">{task.title}</h2>
          <p className="text-gray-700">{task.description}</p>
          <p className="text-white">Priority: {task.priority}</p>
          <p className="text-red-500 text-md text-bold">Deadline: {task.deadline}</p>

          <div className="flex justify-between mt-4">
            <Link to={`updateTask/${task._id}`}>
              <AiOutlineEdit className="cursor-pointer text-blue-500" />
            </Link>
            <AiOutlineDelete
              className="cursor-pointer text-red-500"
              onClick={() => handleDeleteClick(task._id)}
            />
          </div>
        </div>
      </div>
    );
  };

  const DropContainer = ({ status }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: 'task',
      drop: async (item) => {
        if (item.status !== status) {
          await axiosPublic.put(`/tasks/${item.id}`, { state: status });
          refetch();
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));

    const isActive = canDrop && isOver;

    const backgroundColor = (() => {
      switch (status) {
        case 'To-Do':
          return 'bg-yellow-200';
        case 'Ongoing':
          return 'bg-green-200';
        case 'Completed':
          return 'bg-blue-200';
        default:
          return '';
      }
    })();

    return (
      <div
        ref={drop}
        className={`flex-1 pr-2 border-r-2 ${isActive ? 'bg-gray-200 h-screen' : 'h-screen'
          } mx-auto `}
      >
        <h2 className={`text-lg font-semibold mb-2 text-center ${backgroundColor}`}>
          {status}
        </h2>
        {myTasks
          .filter((task) => task.state === status)
          .map((task) => (
            <Task key={task._id} task={task} />
          ))}
      </div>
    );
  };

  if (!loading) {
    return (
      <div className="text-center">
        <Spinner size={32} color="#00008B" />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner size={32} color="#00008B" />
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-2 md:mx-10">
        <h1 className="text-4xl font-bold text-blue-500 text-center py-6 md:py-10">My To-Do List</h1>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 text-black text-center">
          <DropContainer status="To-Do" />
          <DropContainer status="Ongoing" />
          <DropContainer status="Completed" />
        </div>
      </div>
    </DndProvider>
  );
};

export default MyTasks;
