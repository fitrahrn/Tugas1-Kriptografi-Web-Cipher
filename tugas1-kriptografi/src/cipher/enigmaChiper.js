import { changeAlphabettoNumeric,changeNumerictoAlphabeticUpperCase,modInverse,modulo } from "../tools/tools";

const encryptEnigma = (inputText,cypherKey) =>{
    let rotor1 = ['B','D','F','H','J','L','C','P','R','T','X'
    ,'V','Z','N','Y','E','I','W','G','A','K','M','U','S','Q','O'];
    let rotor1Switch = 0;
    let rotor1Position = cypherKey[2].toLowerCase().charCodeAt(0)-97;
    let rotor2 = ['A','J','D','K','S','I','R','U','X','B','L',
    'H','W','T','M','C','Q','G','Z','N','P','Y','F','V','O','E'];
    let rotor2Switch = 0;
    let rotor2Position = cypherKey[1].toLowerCase().charCodeAt(0)-97;
    let rotor3 = ['E','K','M','F','L','G','D','Q','V','Z','N'
    ,'T','O','W','Y','H','X','U','S','P','A','I','B','R','C','J'];
    let reflectorUKWB = ['Y','R','U','H','Q','S','L','D','P','X',
    'N','G','O','K','M','I','E','B','F','Z','C','W','V','J','A','T' ];
    let rotor3Position = cypherKey[0].toLowerCase().charCodeAt(0)-97;
    let encryptedArray = [];
    let numArray = changeAlphabettoNumeric(inputText);
    for (let i = 0;i<numArray.length;i++){
        rotor1Switch++;
        rotor1Position = (rotor1Position +1)%26;
        let position1 = (numArray[i] +rotor1Position)%26;
        let resultRotor1 = rotor1[position1].charCodeAt(0) - 65;
        console.log(rotor1[position1]);
        if(rotor1Position===22){
            rotor2Position = (rotor2Position +1)%26;
            rotor2Switch++;
            rotor1Switch=0;
        }
        let position2 = modulo((resultRotor1 + (rotor2Position-rotor1Position)),26);
        let resultRotor2 = rotor2[position2].charCodeAt(0) - 65;
        console.log(rotor2[position2]);
        if(rotor2Position===5){
            rotor3Position = (rotor3Position+1)%26;
            rotor2Switch=0;
        }
        let position3 = modulo((resultRotor2 + (rotor3Position-rotor2Position)),26);
        let resultRotor3 = rotor3[position3].charCodeAt(0) -65;
        console.log(rotor3[position3]);
        let positionReflector = modulo((resultRotor3-rotor3Position),26);
        console.log(String.fromCharCode(positionReflector+65));
        let resultReflector =reflectorUKWB[positionReflector];
        console.log(resultReflector);
        let positionAfterReflector = modulo(((resultReflector.charCodeAt(0)-65)+rotor3Position),26);
        console.log(String.fromCharCode(positionAfterReflector+65));
        let backResultRotor3 = rotor3.indexOf(String.fromCharCode(positionAfterReflector+65));
        console.log(String.fromCharCode(backResultRotor3+65));
        let backPosition3 = modulo((backResultRotor3+ (rotor2Position-rotor3Position)),26);
        let backResultRotor2 = rotor2.indexOf(String.fromCharCode(backPosition3+65));
        console.log(String.fromCharCode(backResultRotor2+65));
        let backPosition2 = modulo((backResultRotor2+ (rotor1Position-rotor2Position)),26);
        let backResultRotor1 = rotor1.indexOf(String.fromCharCode(backPosition2+65));
        console.log(String.fromCharCode(backResultRotor1+65));
        let realResult = modulo((backResultRotor1 - rotor1Position),26);
        console.log(String.fromCharCode(realResult+65));
        encryptedArray.push(realResult);

    }
    return changeNumerictoAlphabeticUpperCase(encryptedArray);

    
}


export {encryptEnigma};