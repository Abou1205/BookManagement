import React from 'react'

const EditModal = ({setEditModal, editItem, setEditItem, handleEditBook}) => {
  return (
    <div className='modal-wrapperr'>
        <div className="modall text-center">
            <h5>Edit book name</h5>
            <input  
            onChange={(e) => setEditItem({...editItem, title:e.target.value})}
            type="text" value={editItem.title} className='form-control' />

            <div className='d-flex justify-content-between'>
                <button onClick={() => setEditModal(false)} className='btn btn-warning'>Cancel</button>
                <button onClick={() => handleEditBook()} className='btn btn-success'>Save</button>
            </div>

        </div>
    </div>
  )
}

export default EditModal