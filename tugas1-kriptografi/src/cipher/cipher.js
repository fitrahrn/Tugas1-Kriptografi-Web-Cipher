class VigenereCipher {

    static encrypt(key, plaintext) {
        // var key = this.key.toLowerCase();
        // var plaintext = this.plaintext.toLowerCase();
        key = key.toLowerCase();
        plaintext = plaintext.toLowerCase();
        plaintext = plaintext.replace(/\s+/g, '');
        var result = '';
        
        for (let i = 0; i < plaintext.length; i++) {
            var charInAscii = plaintext.charCodeAt(i);
            var keyInAscii = key.charCodeAt(i % key.length);
            var cipherInAscii = (((charInAscii - 97) + (keyInAscii - 97)) % 26) + 97;
            result += String.fromCharCode(cipherInAscii);
        }

        return result;
    }

    static decrypt(key, ciphertext) {
        key = key.toLowerCase();
        ciphertext = ciphertext.toLowerCase();
        ciphertext = ciphertext.replace(/\s+/g, '');
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

    static encrypt(key, plaintext) {
        key = key.toLowerCase();
        plaintext = plaintext.toLowerCase();
        plaintext = plaintext.replace(/\s+/g, '');
        var result = '';

        for (let i = 0; i < plaintext.length; i++) {
            var charInAscii = plaintext.charCodeAt(i);
            var keyInAscii = i < key.length ? key.charCodeAt(i) : plaintext.charCodeAt(i - key.length);
            var cipherInAscii = (((charInAscii - 97) + (keyInAscii - 97)) % 26) + 97;
            result += String.fromCharCode(cipherInAscii);
        }

        return result;
    }

    static decrypt(key, ciphertext) {
        key = key.toLowerCase();
        ciphertext = ciphertext.toLowerCase();
        ciphertext = ciphertext.replace(/\s+/g, '');
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

    static encrypt(key, plaintext) {
        var result = '';

        for (let i = 0; i < plaintext.length; i++) {
            var charInAscii = plaintext.charCodeAt(i);
            var keyInAscii = key.charCodeAt(i % key.length);
            var cipherInAscii = (charInAscii + keyInAscii) % 256;
            result += String.fromCharCode(cipherInAscii);
        }

        return result;
    }

    static decrypt(key, ciphertext) {
        var result = '';

        for (let i = 0; i < ciphertext.length; i++) {
            var charInAscii = this.plaintext.charCodeAt(i);
            var keyInAscii = key.charCodeAt(i % key.length);
            var plaintextInAscii = ((charInAscii - keyInAscii) % 256 + 256) % 256;
            result += String.fromCharCode(plaintextInAscii);
        }

        return result;
    }
}

class SuperEnkripsi {

    static extendedVigenereCipher = new ExtendedVigenereCipher();

    static encrypt(keyVigenere, keyTransposisi, plaintext) {
        var vigenereResult = this.extendedVigenereCipher.encrypt(keyVigenere, plaintext);
        var transposisiResult = '';

        for (let i = 0; i < vigenereResult.length; i++) {
            transposisiResult += vigenereResult[i * keyTransposisi % (vigenereResult.length - 1)];
        }

        return transposisiResult;
    }

    static decrypt(keyVigenere, keyTransposisi, ciphertext) {
        var transposisiResult = '';
        keyTransposisi = ciphertext.length / keyTransposisi;

        for (let i = 0; i < ciphertext.length; i++) {
            transposisiResult += ciphertext[i * keyTransposisi % (ciphertext.length - 1)];
        }

        var vigenereResult = this.extendedVigenereCipher.decrypt(keyVigenere, transposisiResult);
        return vigenereResult;
    }

}

export {VigenereCipher, AutoKeyVigenereCipher, ExtendedVigenereCipher, SuperEnkripsi};