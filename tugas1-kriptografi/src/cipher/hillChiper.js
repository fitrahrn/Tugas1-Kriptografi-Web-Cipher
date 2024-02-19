import { changeAlphabettoNumeric,changeNumerictoAlphabetic,modInverse,modulo,multiplyMatrices, convertToMatrix} from "../tools/tools";
import {inv,det } from 'mathjs'
import * as THREE from 'three';
const decryptHill =  (inputText,cypherKey) =>{
    let numArray = changeAlphabettoNumeric(inputText);

    while (numArray.length%Math.sqrt(cypherKey.length)!==0){
        numArray.push(25);
    }
    let encryptedArray = [];
    let determinant=0;
    let size = Math.sqrt(cypherKey.length);
    let inverseArray=[]; 
    if(Math.sqrt(size===2)){
        let matrixCypherKey = convertToMatrix(cypherKey);
        let inverseMatrix = inv(matrixCypherKey);
        determinant = det(matrixCypherKey);
        inverseMatrix[0][0] = Math.round(inverseMatrix[0][0] *determinant);
        inverseMatrix[0][1] = Math.round(inverseMatrix[0][1] *determinant);
        inverseMatrix[1][0] = Math.round(inverseMatrix[1][0] *determinant);
        inverseMatrix[1][1] = Math.round(inverseMatrix[1][1] *determinant);
        determinant = Math.round(determinant);
        if(determinant === 0 || determinant % 2 === 0 || determinant % 13 === 0){
            return "Matriks tidak invertible dengan mod 26";
        }
        let equivalenDeterminan = modInverse(determinant,26);
        console.log(equivalenDeterminan);
        inverseMatrix[0][0] = Math.round(inverseMatrix[0][0] *equivalenDeterminan,26);
        inverseMatrix[0][1] = Math.round(inverseMatrix[0][1] *equivalenDeterminan,26);
        inverseMatrix[1][0] = Math.round(inverseMatrix[1][0] *equivalenDeterminan,26);
        inverseMatrix[1][1] = Math.round(inverseMatrix[1][1] *equivalenDeterminan,26);
        matrixCypherKey = inverseMatrix;
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
        
        return changeNumerictoAlphabetic(encryptedArray);

    }
    else if(Math.sqrt(size===3)) {
        const m = new THREE.Matrix3();
        //m.set(17,17,5,21,18,21,2,2,19);
        m.set(cypherKey[0],cypherKey[1],cypherKey[2],
            cypherKey[3],cypherKey[4],cypherKey[5],
            cypherKey[6],cypherKey[7],cypherKey[8])
        determinant = m.determinant();
        inverseArray = m.invert().transpose().toArray() 
        console.log(inverseArray);
        console.log(determinant);
        for(let i =0;i<inverseArray.length;i++){
            inverseArray[i] =Math.round(inverseArray[i]*determinant);
        }
        determinant  = Math.round(determinant);
        if(determinant === 0 || determinant % 2 === 0 || determinant % 13 === 0){
            return "Matriks tidak invertible dengan mod 26";
        }
        let equivalenDeterminan = modInverse(determinant,26);
        console.log(equivalenDeterminan);
        console.log(inverseArray);
        inverseArray = inverseArray.map((x)=> modulo(x*equivalenDeterminan,26))  
        let matrixCypherKey = convertToMatrix(inverseArray);
        console.log(matrixCypherKey)
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
        
        return changeNumerictoAlphabetic(encryptedArray);

    }
    else if (Math.sqrt(size===4)){
        const m = new THREE.Matrix4();
        m.set(cypherKey[0],cypherKey[1],cypherKey[2],cypherKey[3],
            cypherKey[4],cypherKey[5],cypherKey[6],cypherKey[7],
            cypherKey[8],cypherKey[9],cypherKey[10],cypherKey[11],
            cypherKey[12],cypherKey[13],cypherKey[14],cypherKey[15])
        determinant = m.determinant();
        inverseArray = m.invert().transpose().toArray() 
        console.log(inverseArray);
        console.log(determinant);
        for(let i =0;i<inverseArray.length;i++){
            inverseArray[i] =Math.round(inverseArray[i]*determinant);
        }
        determinant  = Math.round(determinant);
        if(determinant === 0 || determinant % 2 === 0 || determinant % 13 === 0){
            return "Matriks tidak invertible dengan mod 26";
        }
        let equivalenDeterminan = modInverse(determinant,26);
        console.log(equivalenDeterminan);
        console.log(inverseArray);
        inverseArray = inverseArray.map((x)=> modulo(x*equivalenDeterminan,26))  
        let matrixCypherKey = convertToMatrix(inverseArray);
        console.log(matrixCypherKey)
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
        
        return changeNumerictoAlphabetic(encryptedArray);
    }   
    else {
        return "Matriks tidak invertible dengan mod 26";
    }
}
    



    

const encryptHill =  (inputText,cypherKey) =>{
    let numArray = changeAlphabettoNumeric(inputText);
    while (numArray.length%Math.sqrt(cypherKey.length)!==0){
        numArray.push(25);
    }
    let encryptedArray = [];
    let size = Math.sqrt(cypherKey.length);
    console.log(cypherKey);
    let matrixCypherKey = convertToMatrix(cypherKey);
    console.log(matrixCypherKey);
    for(let i =0;i<numArray.length;i+=size){
        let smallArray = [];
        for(let j=0;j<size;j++){
            smallArray.push([numArray[i+j]]);
        }
        console.log(smallArray);
        const matricesResult = multiplyMatrices(matrixCypherKey,smallArray);
        console.log(matricesResult);
        for(let j=0;j<size;j++){
            encryptedArray.push(modulo(matricesResult[j],26));
        }
    }
    
    return changeNumerictoAlphabetic(encryptedArray);
}

export {encryptHill,decryptHill};