import { changeAlphabettoNumeric,changeNumerictoAlphabetic,modInverse,modulo,multiplyMatrices, convertToMatrix} from "../tools/tools";
import {inv } from 'mathjs'
import * as THREE from 'three';
const decryptHill =  (inputText,cypherKey) =>{
    
}

const encryptHill =  (inputText,cypherKey) =>{
    let numArray = changeAlphabettoNumeric(inputText);
    while (numArray.length%Math.sqrt(cypherKey.length)!==0){
        numArray.push(122);
    }
    console.log(numArray)
    let encryptedArray = [];
    let size = Math.sqrt(cypherKey.length);
    let matrixCypherKey = convertToMatrix(cypherKey);
    for(let i =0;i<numArray.length;i+=size){
        let smallArray = [];
        for(let j=0;j<size;j++){
            smallArray.push([numArray[i+j]]);
        }
        const matricesResult = multiplyMatrices(matrixCypherKey,smallArray);
        for(let j=0;j<size;j++){
            encryptedArray.push(modulo(matricesResult[j],26));
        }
    }
    const m = new THREE.Matrix3();
    m.set(17,17,5,21,18,21,2,2,19);
    console.log(inv(matrixCypherKey));
    const l  = new THREE.Matrix3();
    l.set(17,17,5,21,18,21,2,2,19);
    console.log(l);
    console.log(m.invert().transpose() );
    console.log(l.determinant());
    const det = l.determinant;
    //console.log(m.multiplyScalar(det))
    return changeNumerictoAlphabetic(encryptedArray);
}

export {encryptHill,decryptHill};