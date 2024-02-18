const decryptAffine =  (inputText,cypherKey) =>{
    let inverseMod = modInverse(cypherKey[0],26);
    let numArray = changeAlphabettoNumeric(inputText);
    let encryptedArray = [];
    for (let i =0;i<numArray.length;i++){
        encryptedArray.push(modulo(inverseMod*(numArray[i]-cypherKey[1]),26));
    }
    console.log(encryptedArray);
    return changeNumerictoAlphabetic(encryptedArray);

}

const encryptAffine =  (inputText,cypherKey) =>{
    let numArray = changeAlphabettoNumeric(inputText);
    let encryptedArray = [];
    for (let i =0;i<numArray.length;i++){
        encryptedArray.push((cypherKey[0]*numArray[i]+cypherKey[1])%26);
    }
    return changeNumerictoAlphabetic(encryptedArray);
}

const changeAlphabettoNumeric = (inputText) =>{
    let numArray = [];
    inputText = inputText.replace(/[^a-zA-Z]/gi,'');
    for (let i = 0;i<inputText.length;i++){
        let char = inputText.charAt(i);
        if(char.charCodeAt(0) >96  && char.charCodeAt(0) <123){
            numArray.push(char.charCodeAt(0)-97); 
        }
        if(char.charCodeAt(0)>64 && char.charCodeAt(0)<91){
            numArray.push(char.charCodeAt(0)-65);
        }
    }
    return numArray;
}
const changeNumerictoAlphabetic = (inputArray) => {
   let encryptedText = '';
   for (let i=0;i<inputArray.length;i++){
        encryptedText += (String.fromCharCode(inputArray[i]+97));
   } 
   return encryptedText;
}

function modInverse(a, m) {
    // validate inputs
    [a, m] = [Number(a), Number(m)]
    if (Number.isNaN(a) || Number.isNaN(m)) {
      return NaN // invalid input
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
      return NaN // invalid input
    }
    // find the gcd
    const s = []
    let b = m
    while(b) {
      [a, b] = [b, a % b]
      s.push({a, b})
    }
    if (a !== 1) {
      return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for(let i = s.length - 2; i >= 0; --i) {
      [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
  }

const modulo = (m,n) =>{
        return ((m% n) + n) % n;

}
export {encryptAffine,decryptAffine};