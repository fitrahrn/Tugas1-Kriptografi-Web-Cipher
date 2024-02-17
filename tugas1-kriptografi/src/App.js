import React, {useState} from 'react';
import './App.css';

function App() {
  
  const [textType,setType] = useState(""); //input type
  const [inputText,setInput] = useState(""); //input text
  const [cypherType,setCypher] = useState(""); //set cypher type
  const [charType,setChar] = useState("")// plaintext or hex
  const [cypherKey,setKey] = useState(""); // cipher key
  const [resultText,setResult] = useState(""); //text after encrypted decrypt

  const encrypt = async (event)=>{
    event.preventDefault();
    setResult(inputText);
    console.log(textType);
    console.log(cypherType);
    console.log(charType);
    console.log(cypherKey);
  }


  return (
    <div className="App">
      <form onSubmit={encrypt}>
        <label>Input Type: </label>
        <select onChange={(event) =>setType(event.target.value)}>
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>
        <label>Input Text: </label>
        <input type="text" value={inputText} onInput={(event)=>setInput(event.target.value)}/>
        <div class="terms">
          <input type="radio" id="plaintext" name="input_type" value="plaintext" onChange={(event)=>setChar(event.target.value)}/>
          <label htmlFor="plaintext">Plaintext</label>
          <input type="radio" id="hex" name="input_type" value="hex" onChange={(event)=>setChar(event.target.value)}/>
          <label htmlFor="hex">Hex</label>
        </div>
        
        <label>Cipher Type: </label>
        <select onChange={(event)=>setCypher(event.target.value)}>
          <option value="vignereStandard">Vignere Cipher Standard</option>
          <option value="autoKeyVignere">Auto-Key Vigenere</option>
          <option value="extendedVigenere">Extended Vigenere Cipher</option>
          <option value="playfair">Playfair Cipher</option>
          <option value="affine">Affine Cipher</option>
          <option value="hill">Hill Cipher</option>
          <option value="superEnkripsi">Super Encryption</option>
          <option value="enigma">Enigma Cipher</option>
        </select>
        <label>Input Key: </label>
        <input type="text" onChange={(event)=>setKey(event.target.value)}/>
        <button type="submit">Encrypt</button>
        <button type="submit">Decrypt</button>
      </form>
      <div class="result">
      <label>Result Text</label>
        <p value={resultText}>{resultText}</p>
      </div>
        


    </div>
  );
}

export default App;
