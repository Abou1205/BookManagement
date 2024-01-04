import React from 'react'

const DeleteModal = ({setDeleteModal, handleDelete, bookTitle}) => {
  return (
    <div className='modal-wrapperr'>
        <div className="modall">
            <h5>Do you want to delete {bookTitle}?</h5>
            <button onClick={() => setDeleteModal(false)} className="btn btn-warning">Cancel</button>
            <button onClick={() => handleDelete()} className="btn btn-danger">Delete</button>
        </div>
    </div>
  )
}

export default DeleteModal