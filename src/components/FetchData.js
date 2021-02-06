import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Remarkable } from 'remarkable';
import './Cards.css';
var Filter = require('bad-words');

export default class FetchData extends React.Component {
    constructor(props){
        super(props);
        this.md = new Remarkable();
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.state = {
            subreddit: 'webdev',
            loading: true,
            response: [],
            responseShown: [],
            cardsToShow: "10",
            cardTextLength: 800
        };
        
        this.filter = new Filter();
        console.log(this.filter.clean("Don't be an ash0le"));

    }

    handleChange(e) {
        this.setState({             
            cardsToShow: e.target.value,
            responseShown: this.state.response.slice(0, e.target.value)
        });
        console.log(this.state.response);
        console.log(this.state.responseShown);
    } 

    handleChange2(e) {        
        this.setState({ 
            cardTextLength: e.target.value 
        });
    } 

    handleChange3(e) {
        console.log("HC3 - " + e.target.value);
        this.setState({             
            subreddit: e.target.value
        }, () => {
            this.myFunction();
        });
    } 

    async componentDidMount(){
        this.myFunction();        
    }

    async myFunction(){
        console.log("1 - " + this.state.subreddit);
        // get data
        const url = 'https://www.reddit.com/r/'+this.state.subreddit+'/.json?limit=50';
        const response = await fetch(url);
        const data = await response.json();

        // set data
        let dataArr = [];
        try{
            dataArr = data.data.children;
            console.log("2");
        } catch(e){
            console.log("Data could not be parsed.");            
        }

        this.setState({
            response: dataArr,
            responseShown: dataArr.slice(0,this.state.cardsToShow)
        });
        console.log(this.state.response);
        console.log(this.state.responseShown);

        this.setState({
            loading: false
        });        

    }

    render() {
        return    <div>
                        <div className="inputGroup">
                            <div className="group">
                                <label>Subreddit:</label>
                                <input
                                    type="text"
                                    id="markdown-content"
                                    onChange={this.handleChange3}
                                    defaultValue={this.state.subreddit}
                                />
                            </div>
                            <div className="group">                          
                                <label>Cards:</label>
                                <input
                                    type="number"
                                    id="markdown-content"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.cardsToShow}
                                />
                            </div>
                             <div className="group">  
                                <label>Length:</label>
                                <input
                                    type="number"
                                    id="markdown-content"
                                    onChange={this.handleChange2}
                                    defaultValue={this.state.cardTextLength}
                                />                               
                            </div>
                        </div>     
                                                                
                        { this.state.loading ? 'Loading...' : ''}
                        {
                            
                            this.state.responseShown.map(((item, index) => 
                            <div className='card-component'>         
                                    <div className='title'>{item.data.title}</div>                    
                                    <div className='message'> 
                                        <ReactMarkdown>
                                            {
                                                
                                                (item.data.selftext.substr(0,this.state.cardTextLength))
                                            }
                                            </ReactMarkdown>
                                        { this.state.cardTextLength < item.data.selftext.length ? '...' : ''}
                                    </div>
                                </div>
                            ))
                        }
                  </div>;
    }
}