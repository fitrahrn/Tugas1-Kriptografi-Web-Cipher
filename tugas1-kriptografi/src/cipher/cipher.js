class VigenereCipher {

    constructor(key, plaintext) {
        this.key = key;
        this.plaintext = plaintext;
    }

    encrypt(key, plaintext) {
        // var key = this.key.toLowerCase();
        // var plaintext = this.plaintext.toLowerCase();
        key = key.toLowerCase();
        plaintext = plaintext.toLowerCase();
        var result = '';
        
        for (let i = 0; i < plaintext.length; i++) {
            var charInAscii = plaintext.charCodeAt(i);
            var keyInAscii = key.charCodeAt(i % key.length);
            var cipherInAscii = (((charInAscii - 97) + (keyInAscii - 97)) % 26) + 97;
            result += String.fromCharCode(cipherInAscii);
        }

        return result;
    }

    decrypt(key, ciphertext) {
        key = key.toLowerCase();
        ciphertext = ciphertext.toLowerCase();
        var result = '';
        
        for (let i = 0; i < ciphertext.length; i++) {
            var charInAscii = ciphertext.charCodeAt(i);
            var keyInAscii = key.charCodeAt(i % key.length);
            var plaintextInAscii = (((charInAscii - keyInAscii) % 26 + 26) % 26) + 97;
            result += String.fromCharCode(plaintextInAscii);
        }

        return result;
    }
}

class AutoKeyVigenereCipher {

    constructor(key, plaintext) {
        this.key = key;
        this.plaintext = plaintext;
    }

    encrypt(key, plaintext) {
        key = key.toLowerCase();
        plaintext = plaintext.toLowerCase();
        var result = '';

        for (i = 0; i < plaintext.length; i++) {
            var charInAscii = plaintext.charCodeAt(i);
            var keyInAscii = i < key.length ? key.charCodeAt(i) : plaintext.charCodeAt(i - key.length);
            var cipherInAscii = (((charInAscii - 97) + (keyInAscii - 97)) % 26) + 97;
            result += String.fromCharCode(cipherInAscii);
        }

        return result;
    }

    decrypt(key, ciphertext) {
        key = key.toLowerCase();
        ciphertext = ciphertext.toLowerCase();
        var result = '';
        
        for (let i = 0; i < ciphertext.length; i++) {
            var charInAscii = ciphertext.charCodeAt(i);
            var keyInAscii = i < key.length ? key.charCodeAt(i) : result.charCodeAt(i - key.length);
            var plaintextInAscii = (((charInAscii - keyInAscii) % 26 + 26) % 26) + 97;
            result += String.fromCharCode(plaintextInAscii);
        }

        return result;
    }
}

class ExtendedVigenereCipher {

    constructor(key, plaintext) {
        this.key = key;
        this.plaintext = plaintext;
    }

    encrypt(key, plaintext) {
        var result = '';

        for (i = 0; i < plaintext.length; i++) {
            charInAscii = plaintext.charCodeAt(i);
            keyInAscii = key.charCodeAt(i % key.length);
            cipherInAscii = (charInAscii + keyInAscii) % 256;
            result += String.fromCharCode(cipherInAscii);
        }

        return result;
    }

    decrypt(key, ciphertext) {
        var result = '';

        for (i = 0; i < ciphertext.length; i++) {
            charInAscii = this.plaintext.charCodeAt(i);
            keyInAscii = key.charCodeAt(i % key.length);
            plaintextInAscii = ((charInAscii - keyInAscii) % 256 + 256) % 256;
            result += String.fromCharCode(plaintextInAscii);
        }

        return result;
    }
}

class SuperEnkripsi {

    extendedVigenereCipher = new ExtendedVigenereCipher();

    constructor(keyVigenere, keyTransposisi, plaintext) {
        this.keyVigenere = keyVigenere;
        this.keyTransposisi = keyTransposisi;
        this.plaintext = plaintext;
    }

    encrypt(keyVigenere, keyTransposisi, plaintext) {
        vigenereResult = this.extendedVigenereCipher.encrypt(keyVigenere, plaintext);
        transposisiResult = '';

        for (i = 0; i < vigenereResult.length; i++) {
            transposisiResult += vigenereResult[i * keyTransposisi % (vigenereResult.length - 1)];
        }

        return transposisiResult;
    }

    decrypt(keyVigenere, keyTransposisi, ciphertext) {
        transposisiResult = '';
        keyTransposisi = ciphertext.length / keyTransposisi;

        for (i = 0; i < ciphertext.length; i++) {
            transposisiResult += ciphertext[i * keyTransposisi % (ciphertext.length - 1)];
        }

        vigenereResult = this.extendedVigenereCipher.decrypt(keyVigenere, transposisiResult);
        return vigenereResult;
    }

}

export {VigenereCipher, AutoKeyVigenereCipher, ExtendedVigenereCipher, SuperEnkripsi};