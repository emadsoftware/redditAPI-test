import React from 'react';
import './Cards.css';

export default class FetchData extends React.Component {
    state = {
        loading: true,
        response: [],
    };

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
                                  <div className='message'>{item.data.selftext.substr(0,600)}</div>
                              </div>
                          ))
                      }
                  </div>;
    }
}