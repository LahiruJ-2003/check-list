
"use client";
import { Button } from "@/components/ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { Input } from "@/components/ui/input";
import { addTodo } from "../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

  



const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>("");

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = 
    async (e) => {
       e.preventDefault();
       await addTodo({
        id: uuidv4(),
        text: newTaskValue,
       });
       setNewTaskValue("");
       setModalOpen(false);
       router.refresh();
    };
    
    
    return ( 
    <div>
        <Button 
        onClick={() => setModalOpen(true)} 
        className=" w-full bg-orange-600 hover:bg-white hover:text-orange-600 hover:border-solid hover:border-orange-600 hover:border-2"
        >
            Add new task<AiOutlinePlus className="ml-2" size={18}/>
        </Button>

        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <form onSubmit={handleSubmitNewTodo}>
                <h3 className= "font-bold text-lg mb-4" style={{textAlign: 'center', marginBottom: '1rem'}}>Add new task</h3>
                <div className="modal-action flex items-center">
                <Input 
                value={newTaskValue}
                onChange = {(e) => setNewTaskValue(e.target.value)}
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
    </div>
    );
};

export default AddTask;