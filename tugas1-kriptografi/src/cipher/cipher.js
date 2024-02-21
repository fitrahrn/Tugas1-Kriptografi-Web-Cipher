class VigenereCipher {

    static encrypt(key, plaintext) {
        key = key.toLowerCase();
        plaintext = plaintext.toLowerCase();
        plaintext = plaintext.replace(/[^a-zA-Z]/gi,'');
        var result = '';
        console.log(plaintext);
        for (let i = 0; i < plaintext.length; i++) {
            var charInAscii = plaintext.charCodeAt(i);
            var keyInAscii = key.charCodeAt(i % key.length);
            var cipherInAscii = (((charInAscii - 97) + (keyInAscii - 97)) % 26) + 97;
            result += String.fromCharCode(cipherInAscii);
        }
        //console.log(result);

        return result;
    }

    static decrypt(key, ciphertext) {
        key = key.toLowerCase();
        ciphertext = ciphertext.toLowerCase();
        ciphertext = ciphertext.replace(/[^a-zA-Z]/gi,'');
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
        plaintext = plaintext.replace(/[^a-zA-Z]/gi,'');
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
        ciphertext = ciphertext.replace(/[^a-zA-Z]/gi,'');
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
            var charInAscii = typeof plaintext === 'string' ? plaintext.charCodeAt(i) : plaintext[i];
            var keyInAscii = key.charCodeAt(i % key.length);
            var cipherInAscii = (charInAscii + keyInAscii) % 256;
            result += String.fromCharCode(cipherInAscii);
        }

        return result;
    }

    static encryptFile(key, plaintext, fileName) {
        var result = this.encrypt(key, plaintext);
        result += fileName;
        result += fileName.length.toString();
        return result;
    }

    static decrypt(key, ciphertext) {
        var result = '';

        for (let i = 0; i < ciphertext.length; i++) {
            var charInAscii = ciphertext.charCodeAt(i);
            var keyInAscii = key.charCodeAt(i % key.length);
            var plaintextInAscii = ((charInAscii - keyInAscii) % 256 + 256) % 256;
            result += String.fromCharCode(plaintextInAscii);
        }

        return result;
    }

    static decryptFile(key, ciphertext) {
        if (typeof ciphertext !== 'string') {
            var text = '';
            for (var i = 0; i < ciphertext.length; i++) {
                text += String.fromCharCode(ciphertext[i]);
            }
            ciphertext = text;
        }
        var lengthInStr = ciphertext.match(/\d+$/)[0];
        var length = parseInt(lengthInStr, 10);
        var fileName = ciphertext.slice(-lengthInStr.length - length, -lengthInStr.length);
        ciphertext = ciphertext.slice(0, -lengthInStr.length - length);
        var result = this.decrypt(key, ciphertext);
        return [result, fileName];
    }
}

class TranspositionCipher {

    static splitText(text, length) {
        var re = new RegExp(`(.|[\r\n]){1,${length}}`, 'g');
        return text.match(re);
    }

    static encrypt(keyTransposisi, plaintext) {
        var s = this.splitText(plaintext, keyTransposisi);
        s[s.length - 1] += "x".repeat(keyTransposisi - s[s.length - 1].length);
        var result = '';

        for (let i = 0; i < keyTransposisi; i++) {
            for (let j = 0; j < s.length; j++) {
                result += s[j][i];
            }
        }

        return result;
    }

    static decrypt(keyTransposisi, ciphertext) {
        if (typeof ciphertext !== 'string') {
            var text = '';
            for (var i = 0; i < ciphertext.length; i++) {
                text += String.fromCharCode(ciphertext[i]);
            }
            ciphertext = text;
        }
        var s = this.splitText(ciphertext, ciphertext.length / keyTransposisi);
        var result = '';

        for (let i = 0; i < ciphertext.length / keyTransposisi; i++) {
            for (let j = 0; j < keyTransposisi; j++) {
                result += s[j][i];
            }
        }
        result = result.replace(/(x*)$/g,'');

        return result;
    }
}

class SuperEnkripsi {

    static encrypt(keyVigenere, keyTransposisi, plaintext) {
        var vigenereResult = ExtendedVigenereCipher.encrypt(keyVigenere, plaintext);
        var transposisiResult = TranspositionCipher.encrypt(keyTransposisi, vigenereResult);

        return transposisiResult;
    }

    static encryptFile(keyVigenere, keyTransposisi, plaintext, fileName) {
        var vigenereResult = ExtendedVigenereCipher.encryptFile(keyVigenere, plaintext, fileName);
        var transposisiResult = TranspositionCipher.encrypt(keyTransposisi, vigenereResult);

        return transposisiResult;
    }

    static decrypt(keyVigenere, keyTransposisi, ciphertext) {
        var transposisiResult = TranspositionCipher.decrypt(keyTransposisi, ciphertext);
        var vigenereResult = ExtendedVigenereCipher.decrypt(keyVigenere, transposisiResult);

        return vigenereResult;
    }

    static decryptFile(keyVigenere, keyTransposisi, ciphertext) {
        var transposisiResult = TranspositionCipher.decrypt(keyTransposisi, ciphertext);
        var [vigenereResult, fileName] = ExtendedVigenereCipher.decryptFile(keyVigenere, transposisiResult);

        return [vigenereResult, fileName];
    }

}

export {VigenereCipher, AutoKeyVigenereCipher, ExtendedVigenereCipher, SuperEnkripsi};