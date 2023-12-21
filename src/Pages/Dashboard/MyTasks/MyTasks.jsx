import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'react-spinners-css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const MyTasks = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: myTasks = [], isLoading, refetch } = useQuery({
    queryKey: ['myTasks'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(myTasks);

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner size={32} color="#00008B" />
      </div>
    );
  }

  const handleDrop = async (taskId, newStatus) => {
    // Update the server with the new task status
    await axiosPublic.patch(`/tasks/${taskId}`, { state: newStatus });
    // Refetch the data to update the UI
    refetch();
  };

  const renderTasks = (status) => (
    myTasks
      .filter((task) => task.state === status)
      .map((task) => (
        <TaskCard key={task._id} task={task} onDrop={(newStatus) => handleDrop(task._id, newStatus)} />
      ))
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-10">
        <h1 className="text-4xl font-bold text-blue-500 text-center py-10">My To-Do List</h1>

        <div className="flex space-x-4 text-black text-center">
          <DropZone status="To-Do" onDrop={(newStatus) => handleDrop(newStatus)}>{renderTasks('To-Do')}</DropZone>
          <DropZone status="Ongoing" onDrop={(newStatus) => handleDrop(newStatus)}>{renderTasks('Ongoing')}</DropZone>
          <DropZone status="Completed" onDrop={(newStatus) => handleDrop(newStatus)}>{renderTasks('Completed')}</DropZone>

        </div>
      </div>
    </DndProvider>
  );
};

const TaskCard = ({ task, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { taskId: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: () => onDrop(task.state),
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`card w-60 h-auto shadow-xl p-4 mb-4 ${getPriorityColorClass(task.priority)} shadow-md shadow-black`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: isActive ? '2px solid #000' : 'none',
      }}
    >
      <div className="text-left">
        <h2 className="card-title text-xl font-bold mb-2 text-black">{task.title}</h2>
        <p className="text-gray-700">{task.description}</p>
        <p className="text-red-500 text-bold">Deadline: {task.deadline}</p>
      </div>
    </div>
  );
};
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
}
const DropZone = ({ status, onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: () => onDrop(status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className={`flex-1 border-r-2 ${isOver ? 'border-dashed border-blue-500' : ''}`}>
      <h2 className="text-lg font-semibold mb-2 ">{status}</h2>
      <div ref={drop}>{children}</div>
    </div>
  );
};

export default MyTasks;
