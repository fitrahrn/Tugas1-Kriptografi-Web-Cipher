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
    let text=inputText;
    const key = playfairKey(cypherKey);
    let encrypted='';
    text = text.replace(/\s/gi,'');
    text = text.replace(/j/gi,'i');
    for (let i =0;i<text.length;i++){
      let char = cypherKey.charAt(i);
      if(char.charCodeAt(0) >64  && char.charCodeAt(0) <123  ){
        if(char.charCodeAt(0)>64 && char.charCodeAt(0)<91){
          char = String.fromCharCode(char.charCodeAt(0) +32);
        }
      }
      if(i+1<text.length && text.charAt(i) === text.charAt(i+1) && i%2===0){
        console.log("true");
        text = text.slice(0,i+1) + 'x' + text.slice(i+1);
      }
    }
    if(text.length%2===1){
      text = text+'x;'
    }
    console.log(text);
    console.log(key);
    for (let i =0;i<text.length-2;i+=2){
      //console.log(i);
      let pos1= [0,0];
      let pos2 = [0,0];
      for (let y=0;y<5;y++){
        for (let x=0;x<5;x++){
          if(key[y][x] === text.charAt(i)){
            pos1 = [y,x];
          }
          else if(key[y][x] === text.charAt(i+1)){
            pos2=[y,x];
          }
        }
      }
      console.log(key[pos1[0]][pos1[1]])
      console.log(key[pos2[0]][pos2[1]])
      if (pos1[0] === pos2[0]){
        pos1[1]++;
        pos2[1]++;
        if(pos1[1]===5){
          pos1[1] = 0;
        }
        if(pos2[1] ===5){
          pos2[1] = 0;
        }
        
      }
      else if (pos1[1] === pos2[1]){
        pos1[0]++;
        pos2[0]++;
        if(pos1[0]===5){
          pos1[0] = 0;
        }
        if(pos2[0] ===5){
          pos2[0] = 0;
        }
      }
      else {
        let newPos1 =[pos1[0],pos2[1]];
        let newPos2 = [pos2[0],pos1[1]];
        pos1 = newPos1;
        pos2 = newPos2;
      }
      encrypted = encrypted + key[pos1[0]][pos1[1]];
      encrypted = encrypted + key[pos2[0]][pos2[1]];
    }
    console.log(encrypted);
    console.log('selesai')
    setResult(inputText);
  }


  const playfairKey = (cypherKey)=>{
    let key =[
                [0, 0,0,0,0],
                [0, 0,0,0,0],
                [0, 0,0,0,0],
                [0, 0,0,0,0],
                [0, 0,0,0,0]
                          ];
    let abjadCheck="abcdefghiklmnopqrstuvwxyz";
    let keyText=""; 
    for (let i =0;i<cypherKey.length;i++){
      
      let char = cypherKey.charAt(i);
      if(char.charCodeAt(0) >64  && char.charCodeAt(0) <123 && char.charCodeAt(0) !== 106 &&  char.charCodeAt(0) !==74 ){
        if(char.charCodeAt(0)>64 && char.charCodeAt(0)<91){
          char = String.fromCharCode(char.charCodeAt(0) +32);
        }
        if(!keyText.includes(char)){
          keyText += char;
          abjadCheck = abjadCheck.replace(char,'');  
        }
        
      }

    }
    let index = 0;
    for (index=0 ;index<keyText.length;index++){
      key[Math.floor(index/5)][index%5] = keyText.charAt(index);
    }
    for(index=keyText.length;index<25;index++){
      key[Math.floor(index/5)][index%5] = abjadCheck.charAt(index-keyText.length);
    }
    return key;

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
