import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { ITask } from "../../types/tasks";
import React from "react";
import Task from "./Task";
interface TodoListProps {
  tasks: ITask[]
}
  const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
   
    return  (
        <div className="overflow-x-auto">
    <Table className="table w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="bg-gray-300 text-black">Task</TableHead>
          <TableHead className="bg-gray-300 text-black">Actions</TableHead> 
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
        <Task key={task.id} task={task}/> 
        ))}
       
          </TableBody>
     </Table>
      </div>
);
};

export default TodoList;