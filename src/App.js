import React from 'react';
import './App.css';
import 'typeface-roboto';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      response: ''
    };
  }

  // Function to handle submission of the input value
  handleSubmit = () => {

    //for testing
    const response = 'test response'
    // Send to the back end
    console.log('Submitted value:', this.state.inputValue);
    // Clear the input field after submission
    this.setState({ inputValue: '', response: response });
  };

  // Event handler for input change
  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  // Event handler for pressing Enter
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="leftColumn">
            <h1>Devbot Basics</h1>
            <div className="version">
              <p>v.0.1</p>
            </div>
            <p>Learn programming basics.</p>
            <h2>About</h2>
            <h2>Github</h2>
          </div>
          <div className="rightColumn">
            <div className="textBox">
              <h2>Ask me a coding question!</h2>
              <div className="response">
              {this.state.response && <p>{this.state.response}</p>}
        
              </div>
              <input
                type="text"
                className="chat-input"
                placeholder="Enter a prompt here..."
                value={this.state.inputValue}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <p>Press enter to submit prompt</p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;