import { useState } from "react";
import Header from "./Components/Header/Header";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import BookCard from "./Components/BookCard/BookCard";
import DeleteModal from "./Components/DeleteModal/DeleteModal";
import EditModal from "./Components/EditModal/EditModal";


function App() {
  const [bookName, setBookName] = useState("");

  const [books, setBooks] = useState([]);

  const [deleteModal,setDeleteModal] = useState(false)

  const [editModal, setEditModal] = useState(false)

  const [deleteId,setDeleteId] = useState(null)

  const [deleteTitle,setDeleteTitle] = useState('')

  const [editItem,setEditItem] = useState({})


  const handleChange = (e) => {
    setBookName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName) {
      toast.warning("Enter a book name", { autoClose: 3000 });
      return;
    }

    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    setBooks([...books, newBook]);

    toast.success('Book was added succesfully', {autoClose: 3000})

    setBookName("");
  };


  const handleModal = (deleteBookId, deleteBookTitle) => {
    setDeleteId(deleteBookId);
    setDeleteTitle(deleteBookTitle);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    const filteredBooks = books.filter((book) => book.id !== deleteId)

    setBooks(filteredBooks)
    setDeleteModal(false)

    toast.error('Book was deleted succesfully', {autoClose: 3000})
  }

  const handleEditModal = (editBook) => {

    setEditItem(editBook)
    setEditModal(true)
    
  }

  const handleEditBook = () => {
    const editIndex = books.findIndex((book) => book.id === editItem.id)

    const clone = [...books]

    clone.splice(editIndex,1,editItem)
    setBooks(clone)
    setEditModal(false)

    toast.info('Book is updated', {autoClose: 3000})
  }

  const handleRead = (readBook) => {
    
    const updatedBook = {...readBook, isRead: !readBook.isRead}
    const index = books.findIndex((book) => book.id === readBook.id)

    const cloneBooks = [...books]

    cloneBooks[index] = updatedBook
    setBooks(cloneBooks)
  }

  return (
    <div>
      <Header />

      <div className="container">
        <form className="d-flex gap-3 mt-4" onSubmit={handleSubmit}>
          <input
            placeholder="Enter a book name"
            type="text"
            className="form-control shadow"
            onChange={handleChange}
            value={bookName}
          />
          <button className="btn btn-warning">Add</button>
        </form>
        {books.length === 0 ? (
          <h4 className="mt-5 text-center">Henüz herhangi bir kitap eklenmedi</h4>
        ) : (
          books.map((book) => (<BookCard handleRead={handleRead} handleEditModal={handleEditModal} handleModal={handleModal} bookInfo={book} key={book.id}/>))
        )}
      </div>

      {deleteModal && <DeleteModal bookTitle={deleteTitle} handleDelete={handleDelete} setDeleteModal={setDeleteModal} />}

      {editModal && <EditModal handleEditBook={handleEditBook} editItem={editItem} setEditItem={setEditItem} setEditModal={setEditModal}/>}

    </div>
  );
}

export default App;
