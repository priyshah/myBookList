import React from "react";
import BookList from "./BookList";
import "./App.css"
import ImportContactsRoundedIcon from "@material-ui/icons/ImportContactsRounded"

const AddBook = () => {

    const [books, setBooks] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [isbn, setIsbn] = React.useState("");
    const [error, setError] = React.useState({})
    const [success, setSuccess] = React.useState(true)

    const [edit, setEdit] = React.useState(false)
    let book = {
        title,
        author,
        isbn
    }
    let errors = {}
    const validate = () => {

        if (!title) {
            errors.title = "Title is Required"
        }
        if (!author) {
            errors.author = "Author is Required"
        }
        if (!isbn) {
            errors.isbn = "ISBN is Required"
        }
        return errors

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        validate()
        setError(errors)
        if (Object.keys(errors).length === 0) {
            if (edit) {
                books.map((n) => {
                    if (n.isbn == book.isbn) {
                        n.title = book.title
                        n.author = book.author
                    }
                    setBooks([...books]);
                    setTitle('');
                    setAuthor('');
                    setIsbn('');
                    setSuccess("Book Updated Successfully")
                    setTimeout(() => setSuccess(false), 2000);
                })
            }
            else {
                setBooks([...books, book]);
                setTitle('');
                setAuthor('');
                setIsbn('');
                setSuccess("Book Added Successfully")
                setTimeout(() => setSuccess(false), 2000);

            }
        }


    }

    const deleteBook = (isbn) => {
        const filteredBooks = books.filter((book) => {
            return book.isbn !== isbn
        })
        setBooks(filteredBooks);
        setSuccess("Book deleted Successfully")
        setTimeout(() => setSuccess(false), 2000);
    }
    const editBook = (isbn) => {

        books.filter((book) => {
            if (book.isbn == isbn) {
                setEdit(true)
                setTitle(book.title)
                setAuthor(book.author)
                setIsbn(book.isbn)
            }
        })

    }
    React.useEffect(() => {
        localStorage.setItem('booklist', JSON.stringify(books));
    }, [books])

    return (
        <div className="container">
            
            <h1><ImportContactsRoundedIcon style={{ color: "blue",fontSize:"60px" }}/>My<span className="bgcolor">Book</span>List</h1>            <span className="success">{success}</span><br></br>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>Title</label>s
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}></input>
                    <span>{error.title}</span>

                </div>
                <div className="form-control">
                    <label>Author</label>
                    <input type="text" onChange={(e) => setAuthor(e.target.value)} value={author}></input>
                    <span>{error.author}</span>
                </div>
                <div className="form-control">
                    <label>ISBN#</label>
                    <input type="text" disabled={edit} onChange={(e) => setIsbn(e.target.value)} value={isbn}></input>
                    <span>{error.isbn}</span>
                </div>
                <button type="submit" className="btn">{edit == true ? `SAVE` : `ADD`}

                </button>
            </form>

            <BookList books={books} deleteBook={deleteBook} editBook={editBook} />


        </div>

    )

}

export default AddBook
