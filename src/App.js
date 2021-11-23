import { useState, useRef } from "react";
import "./App.css";

function App() {
  const nameRef = useRef(null)
  const surnameRef = useRef(null)
  const phoneRef = useRef(null)
  const emailRef = useRef(null)

  const [book, setBook] = useState([]);
  const [mod, setMod] = useState("new");
  const [lastIndex, setLastIndex] = useState(null);
  const [bookResults, setBookResults] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const person = {
      name: e.currentTarget.name.value,
      surname: e.currentTarget.surname.value,
      phone: e.currentTarget.phone.value,
      email: e.currentTarget.email.value,
    };

    if (mod==="new"){
      setBook([...book, person]);
    }

    else if(mod==="edit"){
      const newBook = book.slice()
      newBook[lastIndex] = person
      setBook(newBook)
      setMod("new")
    }

    nameRef.current.value = ""
    surnameRef.current.value = ""
    phoneRef.current.value = ""
    emailRef.current.value = ""

  };

  const handleDelete = (index) => {
    const newBook = book.slice()
    newBook.splice(index, 1);
    setBook(newBook);
  };

  const handleEdit = (index) => {
    setMod("edit");
    nameRef.current.value = book[index].name
    surnameRef.current.value = book[index].surname
    phoneRef.current.value = book[index].phone
    emailRef.current.value = book[index].email
    setLastIndex(index)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.currentTarget.searchValue.value;
    const searchResults = book.filter((person) => {
      return person.name.includes(searchValue)
    })
    setBookResults(searchResults)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter a name" ref={nameRef}/>
        <input type="text" name="surname" placeholder="Enter a surname" ref={surnameRef}/>
        <input type="text" name="phone" placeholder="Enter a phone number" ref={phoneRef}/>
        <input type="text" name="email" placeholder="Enter a email adress" ref={emailRef}/>
        <button type="submit">{(mod==="new") ? "Add New" : "Update"}</button>
        <button type="button" onClick={() => { setMod("new") }}>Cancel</button>
      </form>

      <hr/>

      <form onSubmit={handleSearch}>
        <input type="text" name="searchValue" placeholder="Search here..."/>
        <button type="submit">Search</button>
      </form>

      {
        book.map((person, index) => (
          <p key={index}>
            {person.name}, {person.surname}, {person.phone}, {person.email}
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </p>
        ))
      }
      <hr/>
      <h1>Arama Sonuçları</h1>
      <hr/>
      {
        bookResults.map((person, index) => (
          <p key={index}>
            {person.name}, {person.surname}, {person.phone}, {person.email}
          </p>
        ))
      }
    </div>
  );
}

export default App;
