import React from 'react';
import FetchData from './components/FetchData';
import MetaTags from 'react-meta-tags';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  render() {  
    return <div className="App">
      <MetaTags>
        <title>Reactive Reading App v.1</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </MetaTags>
      <header className="App-header">        
        <h1>Reactive Reading App v.1</h1>   
        <h2>✅Set cards amount ✅Set text length ✅No annoying images</h2>     
      </header> 
      <FetchData></FetchData> 
                
    </div>
  }
}

export default App;
