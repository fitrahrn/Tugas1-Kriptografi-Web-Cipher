import React, {useState, Component} from 'react';
import {encryptPlayfair,decryptPlayfair} from './cipher/playfairCipher';
import { encryptAffine,decryptAffine } from './cipher/affineCipher';
import { encryptHill,decryptHill } from './cipher/hillChiper';
import './App.css';
import {VigenereCipher, AutoKeyVigenereCipher, ExtendedVigenereCipher, SuperEnkripsi} from './cipher/cipher';
import { encryptEnigma } from './cipher/enigmaChiper';
function App() {
  
  const [textType,setType] = useState("text"); //input type
  const [inputText,setInput] = useState(""); //input text
  const [cypherType,setCypher] = useState("vigenereStandard"); //set cypher type
  const [charType,setChar] = useState("")// plaintext or hex
  const [cypherKey,setKey] = useState(""); // cipher key
  const [affineKey,setAffineKey] = useState([1,0]);
  const [enigmaStartingPos,setPosition] = useState(['A','A','A'])
  const [hillKey,setHillKey] = useState(Array.from({length: 4}, (v, i) => 0))
  const [resultText,setResult] = useState(""); //text after encrypted decrypt
  const [encryptTrue,setEncrypt] = useState(true);
  const [transpositionKey, setTransposition] = useState("");
  const [encode64,setBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const [isBinaryFile, setIsBinaryFile] = useState(false);

  const getResult = async (event)=>{
    event.preventDefault();
    let result = '';
    if(affineKey[0] === 0 || affineKey[0] % 2 === 0 || affineKey[0] % 13 === 0){
      alert("Slope must be Coprime with 26");
      return result;
  }
    if (encryptTrue){
      result = encrypt()
      setResult(result);
      setBase64(btoa(result));
    }
    else {
      result = decrypt();
      setResult(result);
      setBase64(btoa(result));
    }
    
  }
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      if (cypherType === 'extendedVigenere' || cypherType === 'superEnkripsi') {
        setInput(new Uint8Array(e.target.result));
      } else {
        setInput(e.target.result)
      }
      //console.log(text)
      //alert(text)
    };
    if (cypherType === 'extendedVigenere' || cypherType === 'superEnkripsi') {
      reader.readAsArrayBuffer(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setIsBinaryFile(true);
    } else {
      reader.readAsText(e.target.files[0])
    }
  }
  const encrypt = ()=>{
    console.log(cypherType);
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
        return isBinaryFile ? ExtendedVigenereCipher.encryptFile(cypherKey, inputText, fileName) :
         ExtendedVigenereCipher.encrypt(cypherKey, inputText);
      case "superEnkripsi":
        return isBinaryFile ? SuperEnkripsi.encryptFile(cypherKey, transpositionKey, inputText, fileName) :
         SuperEnkripsi.encrypt(cypherKey, transpositionKey, inputText);
      case "enigma":
        return encryptEnigma(inputText,enigmaStartingPos);
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
        if (!isBinaryFile) {
          return ExtendedVigenereCipher.decrypt(cypherKey, inputText);
        }
        const [vigResult, vigFilename] = ExtendedVigenereCipher.decryptFile(cypherKey, inputText);
        setFileName(vigFilename);
        return vigResult;
      case "superEnkripsi":
        if (!isBinaryFile) {
          return SuperEnkripsi.decrypt(cypherKey, transpositionKey, inputText);
        }
        const [supResult, supFilename] = SuperEnkripsi.decryptFile(cypherKey, transpositionKey, inputText);
        setFileName(supFilename);
        return supResult;
      case "enigma":
        return encryptEnigma(inputText,enigmaStartingPos);
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
        {/* <div className="terms">
          <input type="radio" id="plaintext" name="input_type" value="plaintext" onChange={(event)=>setChar(event.target.value)}/>
          <label htmlFor="plaintext">Plaintext</label>
          <input type="radio" id="hex" name="input_type" value="hex" onChange={(event)=>setChar(event.target.value)}/>
          <label htmlFor="hex">Hex</label>
        </div> */}
        
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
          <input type='number' value = {affineKey[0]} onChange={(event)=>setAffineKey([Number(event.target.value),affineKey[1]])}/>
          <label htmlFor="keyB">Intercept / B</label>
          <input type='number' value = {affineKey[1]} onChange={(event)=>setAffineKey([affineKey[0],Number(event.target.value)])}/>
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
        </div>: cypherType === 'superEnkripsi' ?
        <div>
          <label htmlFor='vigenereKey'>Vigenere key</label><br/>
          <input type='text' name='vigenereKey' value={cypherKey} onChange={(event)=>setKey(event.target.value)}/><br/>
          <label htmlFor='transpositionKey'>Transposition key</label><br/>
          <input type='text' name='transpositionKey' value={transpositionKey} onChange={(event)=>setTransposition(event.target.value)}/>
        </div> : cypherType ==='enigma' ?
        <div>
          <label htmlFor="Rotor1">Rotor Starting Position</label><br/>
          <label htmlFor="Rotor1">Rotor 1</label>
          <input type='text' value = {enigmaStartingPos[0]} pattern="[A-Za-z]{1}" onChange={(event)=>setPosition([event.target.value,enigmaStartingPos[1],enigmaStartingPos[2]])}/>
          <label htmlFor="Rotor2">Rotor 2</label>
          <input type='text' value = {enigmaStartingPos[1]} pattern="[A-Za-z]{1}" onChange={(event)=>setPosition([enigmaStartingPos[0],event.target.value,enigmaStartingPos[2]])}/>
          <label htmlFor="Rotor3">Rotor 3</label>
          <input type='text' value = {enigmaStartingPos[2]} pattern="[A-Za-z]{1}" onChange={(event)=>setPosition([enigmaStartingPos[0],enigmaStartingPos[1],event.target.value])}/>
          
          
        </div>
        :
          <input type="text" name = 'cypherKey' value={cypherKey} onChange={(event)=>setKey(event.target.value)}/>
        }
        <button type="submit"onClick={()=>setEncrypt(true)}>Encrypt</button>
        <button type="submit" onClick={()=>setEncrypt(false)}>Decrypt</button>
      </form>
      <div className="result">
      <label>Result Text</label>
        <p value={resultText}>{resultText}</p>
        <button onClick={() => {
            const buffer = Uint8Array.from(resultText, c => c.charCodeAt(0));
            const file = new Blob([buffer], { type:"text/plain"});
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = "result.txt";
            link.click();
        }}>Download As Text File</button>
        <button onClick={() => {
            const buffer = Uint8Array.from(resultText, c => c.charCodeAt(0));
            const file = new Blob([buffer], { type:"text/plain"});
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = (isBinaryFile && !encryptTrue) ? fileName : "result.dat";
            link.click();
        }}>Download As Binary File</button>
      </div>
      <div className="result">
      <label>Base 64 Result</label>
        <p value={encode64}>{encode64}</p>
        <button onClick={() => {
            const buffer = Uint8Array.from(encode64, c => c.charCodeAt(0));
            const file = new Blob([buffer], { type:"text/plain"});
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = "result.txt";
            link.click();
        }}>Download As Text File</button>
        <button onClick={() => {
            const buffer = Uint8Array.from(encode64, c => c.charCodeAt(0));
            const file = new Blob([buffer], { type:"text/plain"});
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = "result.dat";
            link.click();
        }}>Download As Binary File</button>
      </div>
    </div>
  );
}

export default App;
