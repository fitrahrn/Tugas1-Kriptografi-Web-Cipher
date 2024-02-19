import { changeAlphabettoNumeric,changeNumerictoAlphabetic,modInverse,modulo } from "../tools/tools";

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

export {encryptAffine,decryptAffine};