import './App.css';
import firebase from './firebase';
import {useState, useEffect} from 'react';
// to GET our database, we must import the corresponding firebase modules
import {getDatabase, onValue, push, remove, ref} from 'firebase/database';

const unusedVar = "unused"

function App() {
  // create books state that will store our db info
  const [books, setBooks] = useState([]);
  // create stateful value that is bound to input
  const [userInput, setUserInput] = useState('');

  //event that will fire every time there is a change in the input
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleSubmit = (event) => {
    //prevent default behaviour on submit (refresh)
    event.preventDefault();
    // create a reference to our db 
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // get the info from our userInput state
    // send it off to our db using push (ie: push(whereToPush, whatToPush);)
    push(dbRef, userInput);
    // reset the input after submitting bu changing the state to an empty string
    setUserInput('');
  }

  const handleRemoveBook = (bookId) => {
    console.log('removing book');
    // create a reference to our database
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${bookId}`);
    // identify the correct node to be removed, and call remove() with that node
    remove(dbRef);
  }

  // get useEffect function to run side effects on component mount
  useEffect(() => {
    // create a variable that holds our db details
    const database = getDatabase(firebase);
    // creare a variable that makes a reference to our db
    const dbRef = ref(database);
    // get database info on load or on change
    // use event listener onValue
    onValue(dbRef, (response) => {
      // use Firebase's .val() to parse our db info into the format we need
      const data = response.val();
      // create an empty array
      const newState = [];
      // data is an object, so we iterate through it using a for in loop to access each book name
      for (let key in data){
         // inside the loop, we push each book name to the empty array
        newState.push(
          {key: key, name: data[key]}
        );

        // 1. make an object {}
        // 2. build a property called "key" that has a value of the object's key
        // 3. build a property called "name" that has a value of the key's value
        // OR, essentially
        // turn this: 
        // -NMjX2CYAd9Z8jMSgMJ3: "By Crom!"
        // into this:
        // {
        //   key: -NMjX2CYAd9Z8jMSgMJ3
        //   name: "By Crom!"
        // }
      }
      // set books state to match no-longer-empty array
      setBooks(newState);
    })
    

  }, []);

  return (
    <div className="">
      <form action="submit">
        <label htmlFor="newBook">Add a book to your bookshelf</label>
        <input 
          onChange={handleInputChange} 
          type="text" 
          id="newBook" 
          value={userInput} />
        <button onClick={handleSubmit}>Add Book</button>
      </form>
      <ul>
        {/* map over books state to display each book in <li> */}
        {books.map((book) => {
          return (
            <li key={book.key}>
              <p>{book.name} 📚</p>
              <button onClick={() => handleRemoveBook(book.key)}>Remove</button>
            </li>
          )
        })}
      </ul>
      
    </div>
  );
}

export default App;


// remember useEffect takes 2 arguments. 1) what we want to happen 2) dependency array outlining when/under what conditions we want it to happen
