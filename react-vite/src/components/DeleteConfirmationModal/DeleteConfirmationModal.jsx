import { useModal } from '../../context/Modal';
import './DeleteConfirmationModal.css'

const DeleteConfirmationModal = ({ thing, onDelete, onCancel }) => {
  const { setModalContent } = useModal();

  const handleDelete = () => {
    onDelete();
    setModalContent(null);
  };

  const handleClose = () => {
    onCancel();
    setModalContent(null);
  };

  const capFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="delete-confirmation-modal">
      <h2>Confirm Delete</h2>
      <p>{`Are you sure you want to delete this ${thing}?`}</p>
      <div className="button-container">
        <button onClick={handleDelete}>{`Yes (Delete ${capFirstLetter(thing)})`}</button>
        <button onClick={handleClose}>{`No (Keep ${capFirstLetter(thing)})`}</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
