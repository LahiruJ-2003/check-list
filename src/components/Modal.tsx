// Modal.tsx

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"
  
interface ModalProps {
  modalOpen: boolean
  setModalOpen: (open : boolean) => boolean | void;
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    return (
     <div className={`modal ${modalOpen ? "modal-open" : ""}`}> 
    <div className="modal-box relative">
  <Dialog>
  <DialogTrigger>Add new task</DialogTrigger>
      <DialogContent onClick={() => setModalOpen(false)}>
        {children}
      {/* <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader> */}
    </DialogContent>
  </Dialog>
  </div>
  </div>
    );
};

export default Modal;
