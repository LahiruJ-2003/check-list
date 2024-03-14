"use client";
import { FormEventHandler, useState } from "react";
import { ITask } from "../../types/tasks";
import { TableCell, TableRow } from "./ui/table";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "./Modal";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "../../api";

interface TaskProps {
    task: ITask
}
const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = 
    async (e) => {
       e.preventDefault();
       await editTodo({
        id: task.id,
        text: taskToEdit,
       });
     setOpenModalEdit(false);
       router.refresh();
    };

    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDeleted(false);
        router.refresh();

    };

    return <TableRow key={task.id}>
    <TableCell className="font-medium w-full">{task.text}</TableCell>
    <TableCell className="text-left flex gap-5">
    <FaRegEdit 
    onClick={() => setOpenModalEdit(true)}
     cursor="pointer" 
     size={15}
     />
    <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
                <h3 className= "font-bold text-lg mb-4" style={{textAlign: 'center', marginBottom: '1rem'}}>Edit task</h3>
                <div className="modal-action flex items-center">
                <Input 
                value={taskToEdit}
                onChange = {(e) => setTaskToEdit(e.target.value)}
                type="text" 
                placeholder="Type here" 
                className="input input-bordered w-full"
                />
                <Button type="submit" className="btn ml-2">
                    Submit
                </Button>
                </div>
            </form>
        </Modal>
    <FaRegTrashCan onClick={() => setOpenModalDeleted(true)}
     cursor="pointer" 
     className="text-orange-600" 
     size={15}/>
    <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
        <h3 className="text-lg">Are you sure, you want to delete this tasks?</h3>
        <div className="modal-action">
            <Button
            onClick={() => handleDeleteTask(task.id)}
            className="btn  bg-orange-600 hover:bg-white hover:text-orange-600 hover:border-solid hover:border-orange-600 hover:border-2"
            >Yes</Button>
        </div>
    </Modal>
    </TableCell>
      
    </TableRow>;
};

export default Task;