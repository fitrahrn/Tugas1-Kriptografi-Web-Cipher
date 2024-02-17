
import './App.css';

function App() {
  return (
    <div className="App">
      <form>
        <label>Input Type: </label>
        <select >
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>
        <label>Input Text: </label>
        <input type="text"/><br/>
        <div class="terms">
          <input type="radio" id="plaintext" name="input_type" value="plaintext"/>
          <label for="plaintext">Plaintext</label>
          <input type="radio" id="hex" name="input_type" value="hex"/>
          <label for="hex">Hex</label>
        </div>
        
        <label>Cipher Type: </label>
        <select >
          <option value="vignereStandard">Vignere Cipher Standard</option>
          <option value="autoKeyVignere">Auto-Key Vigenere</option>
          <option value="extendedVigenere">Extended Vigenere Cipher</option>
          <option value="playfair">Playfair Cipher</option>
          <option value="affine">Affine Cipher</option>
          <option value="hill">Hill Cipher</option>
          <option value="superEnkripsi">Super Encryption</option>
          <option value="enigma">Enigma Cipher</option>
        </select>
        <label>Input Key: </label>
        <input type="text"/>
        <button>Encrypt</button>
        <button>Decrypt</button>
      </form>
      <div class="result">
      <label>Result Text</label>
        <p value="encrypted"></p>
      </div>
        


    </div>
  );
}

export default App;
