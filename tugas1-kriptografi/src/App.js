import React, {useState, Component} from 'react';
import {encryptPlayfair,decryptPlayfair} from './cipher/playfairCipher';
import { encryptAffine,decryptAffine } from './cipher/affineCipher';
import './App.css';

function App() {
  
  const [textType,setType] = useState("text"); //input type
  const [inputText,setInput] = useState(""); //input text
  const [cypherType,setCypher] = useState(""); //set cypher type
  const [charType,setChar] = useState("")// plaintext or hex
  const [cypherKey,setKey] = useState(""); // cipher key
  const [affineKey,setAffineKey] = useState([0,0]);
  const [hillKey,setHillKey] = useState([])
  const [resultText,setResult] = useState(""); //text after encrypted decrypt
  const [encryptTrue,setEncrypt] = useState(true);


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
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      setInput(e.target.result);
      //console.log(text)
      //alert(text)
    };
    reader.readAsText(e.target.files[0])
  }
  const encrypt = ()=>{
    //to do check if slope or m not an even number or can be divided by 13
    if(cypherType ==="playfair"){
       return encryptPlayfair(inputText,cypherKey);
    }
    else if (cypherType==="affine"){
        return encryptAffine(inputText,affineKey);
    }
    else {
      return inputText;
    }
  }
  const decrypt = ()=>{
    if(cypherType ==="playfair"){
      return decryptPlayfair(inputText,cypherKey);
       
    }
    else if (cypherType==="affine"){
      return decryptAffine(inputText,affineKey);
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
        {
          textType ==="text" ? 
        <div>
        <label>Input Text: </label>
        <input type="text" value={inputText} onInput={(event)=>setInput(event.target.value)}/>
        </div> : 
        <div>
          <label>Input File: </label>
          <input type="file" id="uploadFile" name="uploadFile"  onChange={(e) => showFile(e)}/>
        </div>
        }
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
        {
          cypherType ==="affine" ? <div>
          <label htmlFor="keyM">Slope / M</label>
          <input type='number' onChange={(event)=>setAffineKey([Number(event.target.value),affineKey[1]])}/>
          <label htmlFor="keyB">Intercept / B</label>
          <input type='number' onChange={(event)=>setAffineKey([affineKey[0],Number(event.target.value)])}/>
        </div>: cypherType ==="hill" ? 
        <div>
        <input type='number' onChange={(event)=>setHillKey([...hillKey,Number(event.target.value)])}/>
        <input type='number' onChange={(event)=>setHillKey([...hillKey,Number(event.target.value)])}/>
        <input type='number' onChange={(event)=>setHillKey([...hillKey,Number(event.target.value)])}/>
        <input type='number' onChange={(event)=>setHillKey([...hillKey,Number(event.target.value)])}/>
        <input type='number' onChange={(event)=>setHillKey([...hillKey,Number(event.target.value)])}/>
        <input type='number' onChange={(event)=>setHillKey([...hillKey,Number(event.target.value)])}/>
        <input type='number' onChange={(event)=>setHillKey([...hillKey,Number(event.target.value)])}/>
        <input type='number' onChange={(event)=>setHillKey([...hillKey,Number(event.target.value)])}/>
        <input type='number' onChange={(event)=>setHillKey([...hillKey,Number(event.target.value)])}/>

        </div>:
          <input type="text" name = 'cypherKey' value={cypherKey} onChange={(event)=>setKey(event.target.value)}/>
        }
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
