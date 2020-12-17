import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Remarkable } from 'remarkable';
import './Cards.css';

export default class FetchData extends React.Component {
    constructor(props){
        super(props);
        this.md = new Remarkable();
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.state = {
            loading: true,
            response: [],
            cardsToShow: "5",
            cardTextLength: 600
        };
    }

    handleChange(e) {        
        this.setState({ loading: true, cardsToShow: e.target.value });
    } 

    handleChange2(e) {        
        this.setState({ cardTextLength: e.target.value });
    } 

    async componentDidMount(){
        this.myFunction();        
    }

    async componentDidUpdate(){
        this.myFunction();
    }

    async myFunction(){
        // get data
        const url = 'https://www.reddit.com/r/webdev.json';
        const response = await fetch(url);
        const data = await response.json();

        // set data
        const dataArr = data.data.children;
        //this.setState({ response: dataArr });
        this.setState({ response: dataArr.slice(0,this.state.cardsToShow) });
        this.setState({loading: false});

        // log data
        // console.log(JSON.stringify(this.state.response[0].data.title));
        // console.log(JSON.stringify(this.state.response[2].data));        
        // console.log(this.state.response.length);
    }

    render() {
        return    <div>
                        <div className="inputGroup">                        
                            <label>Cards:</label>
                            <input
                                type="number"
                                id="markdown-content"
                                onChange={this.handleChange}
                                defaultValue={this.state.cardsToShow}
                            />  
                            <label>Length:</label>
                            <input
                                type="number"
                                id="markdown-content"
                                onChange={this.handleChange2}
                                defaultValue={this.state.cardTextLength}
                            />
                            <label>{ this.state.loading ? 'Loading...' : ''}</label>
                        </div>                                             

                        {
                            this.state.response.map(((item, index) => 
                            <div className='card-component'>         
                                    <div className='title'>{item.data.title}</div>                    
                                    <div className='message'> 
                                        <ReactMarkdown>{item.data.selftext.substr(0,this.state.cardTextLength)}</ReactMarkdown>
                                        { this.state.cardTextLength < item.data.selftext.length ? '...' : ''}
                                    </div>
                                </div>
                            ))
                        }
                  </div>;
    }
}