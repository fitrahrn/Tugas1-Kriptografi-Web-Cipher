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
            var charInAscii = ciphertext.charCodeAt(i);
            var keyInAscii = key.charCodeAt(i % key.length);
            var plaintextInAscii = ((charInAscii - keyInAscii) % 256 + 256) % 256;
            result += String.fromCharCode(plaintextInAscii);
        }

        return result;
    }
}

class TranspositionCipher {

    static splitText(text, length) {
        var re = new RegExp(`(.|[\r\n]){1,${length}}`, 'g');
        return text.match(re);
    }

    static encrypt(keyTransposisi, plaintext) {
        var l = keyTransposisi.length;
        var s = this.splitText(plaintext, l);

        s[s.length - 1] += "x".repeat(l - s[s.length - 1].length);
        var sortedKey = keyTransposisi.split('').sort();

        var result = '';

        for (let i = 0; i < l; i++) {
            var idx = keyTransposisi.indexOf(sortedKey[i]);
            for (let j = 0; j < s.length; j++) {
                result += s[j][idx];
            }
        }

        return result;
    }

    static decrypt(keyTransposisi, ciphertext) {
        var l = keyTransposisi.length;
        var s = this.splitText(ciphertext, ciphertext.length / l);

        var sortedKey = keyTransposisi.split('').sort();
        var result = [];

        for (let i = 0; i < ciphertext.length / l; i++) {
            result.push('');
            for (let j = 0; j < l; j++) {
                result[i] += s[keyTransposisi.indexOf(sortedKey[j])][i];
            }
        }

        return result.join('');
    }
}

class SuperEnkripsi {

    static encrypt(keyVigenere, keyTransposisi, plaintext) {
        var vigenereResult = ExtendedVigenereCipher.encrypt(keyVigenere, plaintext);
        var transposisiResult = TranspositionCipher.encrypt(keyTransposisi, vigenereResult);

        return transposisiResult;
    }

    static decrypt(keyVigenere, keyTransposisi, ciphertext) {
        var transposisiResult = TranspositionCipher.decrypt(keyTransposisi, ciphertext);
        var vigenereResult = ExtendedVigenereCipher.decrypt(keyVigenere, transposisiResult);

        return vigenereResult;
    }

}

export {VigenereCipher, AutoKeyVigenereCipher, ExtendedVigenereCipher, SuperEnkripsi};