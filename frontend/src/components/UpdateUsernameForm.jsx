import React, { useState } from 'react';
import Modal from 'react-modal'; // Import the modal library
import { useNavigate } from 'react-router-dom';
import { updateUsername } from '../adapters/user-adapter';

Modal.setAppElement('#root'); // Set the app element for accessibility

export default function UpdateUsernameForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    setFormData(Object.fromEntries(data));
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    const [user, error] = await updateUsername(formData);
    setIsModalOpen(false);

    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate('/');
    }

    setCurrentUser(user);
    document.querySelector('form').reset();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} aria-labelledby="update-heading">
        <h2 id="update-heading">Update User {currentUser.username}</h2>
        <label htmlFor='username'>New Username</label>
        <input type='text' id='username' name='username' />
        <input type="hidden" name="id" value={currentUser.id} />

        <button>Update Username</button>
      </form>

      <Modal
        overlayClassName='modal-overlay'
        className='modal'
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        contentLabel="Confirm Update"
      >
        <h2>Confirm Update</h2>
        <p>Are you sure you want to update the username?</p>
        <div>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleCancel}>No</button>
        </div>
      </Modal>
    </>
  );
}
