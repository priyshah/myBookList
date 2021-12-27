import React from "react";
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { IconButton } from "@material-ui/core";
import "./App.css"


const BookList = (props) => {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN#</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.books.map(n => (
                        <tr key={n.isbn}>
                            <td>{n.isbn}</td>
                            <td>{n.title}</td>
                            <td>{n.author}</td>
                            <td><IconButton onClick={()=>props.deleteBook(n.isbn)}><DeleteIcon /></IconButton> </td>
                            <td><IconButton onClick={()=>props.editBook(n.isbn)}><EditIcon /></IconButton></td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default BookList