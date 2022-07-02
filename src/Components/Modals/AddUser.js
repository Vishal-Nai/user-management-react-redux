import { Modal } from '@mui/material';
import UserForm from './UserForm';

const AddUser = (props) => {
  const { open, onClose, singelUser } = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserForm
          onClose={props.onClose}
          userID={props.userID}
          singelUser={singelUser}
        />
      </Modal>
    </div>
  );
};

export default AddUser;
