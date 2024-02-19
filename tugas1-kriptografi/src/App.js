import React, {useState, Component} from 'react';
import {encryptPlayfair,decryptPlayfair} from './cipher/playfairCipher';
import { encryptAffine,decryptAffine } from './cipher/affineCipher';
import { encryptHill,decryptHill } from './cipher/hillChiper';
import './App.css';
import {VigenereCipher, AutoKeyVigenereCipher, ExtendedVigenereCipher, SuperEnkripsi} from './cipher/cipher';

function App() {
  
  const [textType,setType] = useState("text"); //input type
  const [inputText,setInput] = useState(""); //input text
  const [cypherType,setCypher] = useState(""); //set cypher type
  const [charType,setChar] = useState("")// plaintext or hex
  const [cypherKey,setKey] = useState(""); // cipher key
  const [affineKey,setAffineKey] = useState([0,0]);
  const [hillKey,setHillKey] = useState(Array.from({length: 4}, (v, i) => 0))
  const [resultText,setResult] = useState(""); //text after encrypted decrypt
  const [encryptTrue,setEncrypt] = useState(true);
  const [hillSize,setSize] = useState(2);


  const getResult = async (event)=>{
    event.preventDefault();
    console.log(hillKey);
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
    switch (cypherType) {
      case "playfair":
        return encryptPlayfair(inputText,cypherKey);
      case "affine":
        return encryptAffine(inputText,affineKey);
      case 'hill':
        return encryptHill(inputText,hillKey);
      case "vigenereStandard":
        return VigenereCipher.encrypt(cypherKey, inputText);
      case "autoKeyVigenere":
        return AutoKeyVigenereCipher.encrypt(cypherKey, inputText);
      case "extendedVigenere":
        return ExtendedVigenereCipher.encrypt(cypherKey, inputText);
      case "superEnkripsi":
        return SuperEnkripsi.encrypt(cypherKey, 2, inputText);
      default:
        return inputText;
    }
  }
  const decrypt = ()=>{
    switch (cypherType) {
      case "playfair":
        return decryptPlayfair(inputText,cypherKey);
      case "affine":
        return decryptAffine(inputText,affineKey);
      case 'hill':
        return decryptHill(inputText,hillKey);
      case "vigenereStandard":
        return VigenereCipher.decrypt(cypherKey, inputText);
      case "autoKeyVigenere":
        return AutoKeyVigenereCipher.decrypt(cypherKey, inputText);
      case "extendedVigenere":
        return ExtendedVigenereCipher.decrypt(cypherKey, inputText);
      case "superEnkripsi":
        return SuperEnkripsi.decrypt(cypherKey, 2, inputText);
      default:
        return inputText
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
        <div className="terms">
          <input type="radio" id="plaintext" name="input_type" value="plaintext" onChange={(event)=>setChar(event.target.value)}/>
          <label htmlFor="plaintext">Plaintext</label>
          <input type="radio" id="hex" name="input_type" value="hex" onChange={(event)=>setChar(event.target.value)}/>
          <label htmlFor="hex">Hex</label>
        </div>
        
        <label>Cipher Type: </label>
        <select onChange={(event)=>setCypher(event.target.value)}>
          <option value="vigenereStandard">Vigenere Cipher Standard</option>
          <option value="autoKeyVigenere">Auto-Key Vigenere</option>
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
        <label htmlFor = 'sizeHill'>NxN matrix size</label>
        <br/>
        <input type ='number' onChange={(event)=>{setHillKey(Array.from({length: event.target.value*event.target.value}, (v, i) => 0))}}/>        
        <br/>
        <label htmlFor = 'Matrix'>Matrix Values</label>
        <br/>
        {
          hillKey.map((number,index)=>(
            <input type='number' defaultValue={0} value ={hillKey[index]}onChange={(event)=>{
              let newArr = [...hillKey];
              newArr[index] = event.target.value;
              setHillKey(newArr)}}/>
          ))
        }
        </div>:
          <input type="text" name = 'cypherKey' value={cypherKey} onChange={(event)=>setKey(event.target.value)}/>
        }
        <button type="submit"onClick={()=>setEncrypt(true)}>Encrypt</button>
        <button type="submit" onClick={()=>setEncrypt(false)}>Decrypt</button>
      </form>
      <div className="result">
      <label>Result Text</label>
        <p value={resultText}>{resultText}</p>
      </div>
        


    </div>
  );
}

export default App;
