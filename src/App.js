import Navbar from "./Navbar";
import {BrowserRouter } from 'react-router-dom';
import { useState } from "react";


function App() {
  const [password , setPassword] = useState('');
  const [errorMessage , setErrorMessage] = useState('');
  var [result , setResult] = useState(0);
  var [shown , setShown] = useState(false);
  
  

  const handleChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage('');
    console.log('typing...' , password);
    setResult(0);
    setShown(false);
    
  }

  const handleClick = () => {
    result = 0;
    setShown(true);
    var checkInt = false ; 
    var checkSmall = false ; 
    var checkCapital = false ; 
    console.log('password' , password);
    console.log('password length' , password.length);

    // set the boundary LIMIT for output
    if(password === '' ){
      setErrorMessage('Please ! Enter The Password');
      setResult(6) ;
      return;
    }
    // check if length of password is btw 6 and 20 or not 
    if(password.length < 6){
      setErrorMessage('Passord length is too short !!!');
      result = result + (6- password.length);
      setResult(result) ;
    }
    if(password.length > 20 ){
      setErrorMessage('Passord length is too long !!!');
      result = result + ( password.length - 20);
      setResult(result) ;
   }

  //  check: at least one lowercase letter, at least one uppercase letter, and at least one digit.
   for( var i = 0 ;  i < password.length ; i++){
    console.log('in loop -->' , password.charAt(i));
    if(password.charAt(i) > 0 ){
      checkInt = true;
    }
    if(/[a-z]/.test(password)){
      checkSmall = true ;
    }
    if(/[A-Z]/.test(password)){
      checkCapital = true ;
    }
   }
   console.log('check digit , small , capital -->' , checkInt , checkSmall , checkCapital);

// increase the output by 1 if letter or number is absent
   if(checkInt === false && password.length >= 6){
    result = result + 1;
   }
   if(checkSmall === false && password.length >= 6){
    result = result + 1; 
   }

   if(checkCapital === false && password.length >= 6){
    result = result + 1;
   }

  //  this is the special case, when password size is 5.
   if(password.length === 5 ){
    result = 0;
    if(checkInt === false){
      result = result + 1;
    }
    if(checkSmall === false){
      result = result + 1;
    }
    
    if(checkCapital === false){
      result = result + 1;
    }
    if(password.length === 5 && checkInt && checkCapital && checkSmall){
      result = result + 1;
    }
   }



  // does not contain three repeating characters in a row 
   for(let j =0 ; j< password.length-2; j++){
    if(password.charAt(j)===(password.charAt(j+1)) && password.charAt(j+1)===(password.charAt(j+2)))
      {result = result + 1;
      setErrorMessage('Error! three consecutive same letter is not a good choice !!!');
      console.log('three same letters ...' , errorMessage , password.charAt(j));
      break ;
      }
   }

  // finally print the result
  setResult(result);           
  }


  return (
    <div className="App">
      {/* Routng links and Navbar part */}
      <BrowserRouter>
          <Navbar />
      </BrowserRouter>

      {/* display part/ input section */}
      <div className="input-div">
        <h4>Enter the Password:</h4>
        <input 
        type="text" 
        placeholder="Enter here..."
        id="password"
        onChange={handleChange}
        value={password}
        />
        <div>
        <button onClick={handleClick}>Check</button>
        </div>
        <div>
          {shown && <p className="result">Output : <span>{result}</span></p>}
          {(result===0 && shown) && <p className="result"><span>"Your Password is Strong Password"</span></p>}
        </div>
        <p className="errorMessage">{errorMessage}</p>
      </div>
    </div>
  );
}

export default App;
