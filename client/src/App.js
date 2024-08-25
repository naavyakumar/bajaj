import { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState('');
  const [outputData, setOutputData] = useState('');

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    try {
      JSON.parse(e.target.value);
      setJsonError(null);
    } catch (err) {
      setJsonError('Invalid JSON format');
    }
  };

  const handleDropdownChange = (e) => {
    setCurrentOption(e.target.value);
  };

  const addOption = () => {
    if (currentOption && !selectedOptions.includes(currentOption)) {
      setSelectedOptions([...selectedOptions, currentOption]);
    }
  };



  const handleSubmit = () => {
    if (!jsonError) {
      let sendData = JSON.stringify({ data: jsonInput, filter: selectedOptions }); 

      fetch('http://localhost:3001/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: sendData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        
        let output = '';

        if (data.numbers && data.numbers.length > 0) {
          output += `numbers: ${data.numbers.join(', ')}; `;
        }

        if (data.alphabets && data.alphabets.length > 0) {
          output += `alphabets: ${data.alphabets.join(', ')}; `;
        }

        if (data.highest_lowercase_alphabet) {
          output += `highest lowercase alphabet: ${data.highest_lowercase_alphabet}`;
        }

        setOutputData(output); 

      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      console.log("Please correct the errors before submitting.");
    }
  };


  return (
    <div className="App">
      <div className="form-group">
        <label htmlFor="jsonInput">API input</label>
        <input
          type="text"
          id="jsonInput"
          className="json-input"
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder="Enter JSON"
        />
        {jsonError && <span className="error">{jsonError}</span>}
      </div>

      <div className="form-group options-group">
        <div className="selected-options">
          {selectedOptions.map((option, index) => (
            <div key={index} className="selected-option">
              {option}
            </div>
          ))}
        </div>
        <div className="dropdown-group">
          <select value={currentOption} onChange={handleDropdownChange}>
            <option value="" disabled>Select an option</option>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
          </select>
          <button type="button" onClick={addOption}>Add</button>
        </div>
      </div>

      <button type="button" className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      {JSON.stringify(outputData)}
    </div>
  );
}

export default App;
