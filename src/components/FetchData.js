import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Remarkable } from 'remarkable';
import './Cards.css';

export default class FetchData extends React.Component {
    constructor(props){
        super(props);
        this.md = new Remarkable();
        //this.handleCHange = this.handleCHange.bind(this);
        this.state = {
            loading: true,
            response: [],
            value: "Text here"
        };
    }

 

    async componentDidMount(){
        // get data
        const url = 'https://www.reddit.com/r/webdev.json';
        const response = await fetch(url);
        const data = await response.json();

        // narrow down results
        const dataArr = data.data.children;
        //this.setState({ response: dataArr });
        this.setState({ response: dataArr.slice(0,15) })

        // test data
        console.log(JSON.stringify(this.state.response[0].data.title));
        console.log(JSON.stringify(this.state.response[2].data));
        
        console.log(this.state.response.length);
    }

    render() {
        return    <div>
                      {
                          this.state.response.map(((item, index) => 
                            <div className='card-component'>         
                                  <div className='title'>{item.data.title}</div>                    
                                  <div className='message'><ReactMarkdown>{item.data.selftext.substr(0,600)}</ReactMarkdown></div>
                              </div>
                          ))
                      }
                  </div>;
    }
}