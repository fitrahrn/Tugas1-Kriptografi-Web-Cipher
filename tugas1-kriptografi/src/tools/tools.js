
const changeAlphabettoNumeric = (inputText) =>{
    let numArray = [];
    inputText = inputText.replace(/[^a-zA-Z]/gi,'');
    inputText = inputText.toLowerCase();
    for (let i = 0;i<inputText.length;i++){
        let char = inputText.charAt(i);
        if(char.charCodeAt(0) >96  && char.charCodeAt(0) <123){
            numArray.push(char.charCodeAt(0)-97); 
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
function multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}
function convertToMatrix(m1){
    let matrix = [];
    let size = Math.sqrt(m1.length);
    for (let j=0;j<size;j++){
        let arr = []
        for(let i=0;i<size;i++){
            arr.push(m1[(j*size)+i]);
        }
        matrix.push(arr);
    }
    return matrix;
}

export {modInverse,modulo,changeAlphabettoNumeric,changeNumerictoAlphabetic,
multiplyMatrices,convertToMatrix};