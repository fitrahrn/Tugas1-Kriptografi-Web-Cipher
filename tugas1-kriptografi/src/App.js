import React, {useState} from 'react';
import {encryptPlayfair,decryptPlayfair} from './cipher/playfairCipher';
import './App.css';

function App() {
  
  const [textType,setType] = useState(""); //input type
  const [inputText,setInput] = useState(""); //input text
  const [cypherType,setCypher] = useState(""); //set cypher type
  const [charType,setChar] = useState("")// plaintext or hex
  const [cypherKey,setKey] = useState(""); // cipher key
  const [affineKey,setAffineKey] = useState([0,0]);
  const [hillKey,setHillKey] = useState([])
  const [resultText,setResult] = useState(""); //text after encrypted decrypt
  const [encryptTrue,setEncrypt] = useState(true);

  const DisplayKey = ({cyphertype}) =>{
    
    if (cyphertype ==="affine") {
      return <div>
              <label htmlFor="keyM">M</label>
              <input type='number' onChange={(event)=>setAffineKey([affineKey[0],event.target.value])}/>
              <label htmlFor="keyB">B</label>
              <input type='number' onChange={(event)=>setAffineKey([event.target.value,affineKey[1]])}/>
            </div>
    }
    else if(cyphertype === "hill"){
      return <div>
              <input type='number' onChange={(event)=>setHillKey([[event.target.value,hillKey[0][1],hillKey[0][2]],
                                                                  [hillKey[1][0],hillKey[1][1],hillKey[1][2]],
                                                                  [hillKey[2][0],hillKey[2][1],hillKey[2][2]],])}/>
              <input type='number' onChange={(event)=>setHillKey([...hillKey,event.target.value])}/>
              <input type='number' onChange={(event)=>setHillKey([...hillKey,event.target.value])}/>
              <input type='number' onChange={(event)=>setHillKey([...hillKey,event.target.value])}/>
              <input type='number' onChange={(event)=>setHillKey([...hillKey,event.target.value])}/>
              <input type='number' onChange={(event)=>setHillKey([...hillKey,event.target.value])}/>
              <input type='number' onChange={(event)=>setHillKey([...hillKey,event.target.value])}/>
              <input type='number' onChange={(event)=>setHillKey([...hillKey,event.target.value])}/>
              <input type='number' onChange={(event)=>setHillKey([...hillKey,event.target.value])}/>
      
      </div>
    }
    else {
      return <input type="text" onChange={(event)=>setKey(event.target.value)}/>
    }
  }

  const getResult = async (event)=>{
    event.preventDefault();
    let result = '';
    if (encryptTrue){
      result = encrypt()
      setResult(result);
    }
    else {
      result = decrypt();
      setResult(result);
    }
    
  }
  const encrypt = ()=>{
    if(cypherType ==="playfair"){
       return encryptPlayfair(inputText,cypherKey);
    }
    else {
      return inputText;
    }
  }
  const decrypt = ()=>{
    if(cypherType ==="playfair"){
      return decryptPlayfair(inputText,cypherKey);
       
    }
    else {
      return inputText;
    }
  }
  


  


  return (
    <div className="App">
      <form onSubmit={getResult}>
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
        <DisplayKey cyphertype = {cypherType}/>
        <button type="submit"onClick={()=>setEncrypt(true)}>Encrypt</button>
        <button type="submit" onClick={()=>setEncrypt(false)}>Decrypt</button>
      </form>
      <div class="result">
      <label>Result Text</label>
        <p value={resultText}>{resultText}</p>
      </div>
        


    </div>
  );
}

export default App;
