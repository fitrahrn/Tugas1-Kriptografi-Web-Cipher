
const setUpPlayfairText = (inputText)=>{
    let text=inputText;
    text = text.replace(/[^a-zA-Z]/gi,'');
    text = text.replace(/j/gi,'i');
    for (let i =0;i<text.length;i++){
      let char = text.charAt(i);

      
      if(char.charCodeAt(0)>64 && char.charCodeAt(0)<91){
        text = text.replace(char,String.fromCharCode(char.charCodeAt(0) +32));
      }

      if(i+1<text.length && text.charAt(i) === text.charAt(i+1) && i%2===0){
        text = text.slice(0,i+1) + 'x' + text.slice(i+1);
      }
    }
    if(text.length%2===1){
      text = text+'x'
    }
    return text;
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
const decryptPlayfair =(inputText,cypherKey)=>{
    let decrypted='';
    const key = playfairKey(cypherKey);
    const text = setUpPlayfairText(inputText);
    for (let i =0;i<text.length;i+=2){
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
      if (pos1[0] === pos2[0]){
        pos1[1]--;
        pos2[1]--;
        if(pos1[1]===-1){
          pos1[1] = 4;
        }
        if(pos2[1] ===-1){
          pos2[1] = 4;
        }
        
      }
      else if (pos1[1] === pos2[1]){
        pos1[0]--;
        pos2[0]--;
        if(pos1[0]===-1){
          pos1[0] = 4;
        }
        if(pos2[0] ===-1){
          pos2[0] = 4;
        }
      }
      else {
        let newPos1 =[pos1[0],pos2[1]];
        let newPos2 = [pos2[0],pos1[1]];
        pos1 = newPos1;
        pos2 = newPos2;
      }
      decrypted = decrypted + key[pos1[0]][pos1[1]];
      decrypted = decrypted + key[pos2[0]][pos2[1]];
    }
   return decrypted;
  }

  const encryptPlayfair  = (inputText,cypherKey)=>{
    let encrypted='';
    const key = playfairKey(cypherKey);
    const text = setUpPlayfairText(inputText);
    for (let i =0;i<text.length;i+=2){
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
   return encrypted;
  }
export {encryptPlayfair,decryptPlayfair};