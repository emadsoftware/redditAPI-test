import './App.css';
import React from 'react';
import FetchData from './components/FetchData';

class App extends React.Component {
  render() {  
    return <div className="App">
      <header className="App-header">        
        <p>Welcome to my react app!</p>        
      </header> 
      <FetchData></FetchData> 
                
    </div>
  }
}

export default App;
