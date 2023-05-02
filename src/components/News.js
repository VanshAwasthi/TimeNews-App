import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

// props pass karke aap state ko set kar skte ho aur fir state ko change kar skte ho lekin props ko change nhi kar skte ho(props are only read only)
// state is used when you change variable again and again without loading the page
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1

        }
    }
    // componentDidMount runs after render method runs ,in this case used to update all news articles
    async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d5a0ea757b884e8bb0bfebe698fc1d07&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);// fetch api takes url and return promise
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles: parsedData.articles, 
        totalResults:parsedData.totalResults,
        loading: false})//properties cannot be null we have to deal with it
    }
     handlePrevClick = async ()=>{
        console.log("Prev")
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d5a0ea757b884e8bb0bfebe698fc1d07&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);// fetch api takes url and return promise
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles,
          page: this.state.page - 1,
          loading: false})
      }
      
      handleNextClick = async ()=>{
      console.log("Next")
      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d5a0ea757b884e8bb0bfebe698fc1d07&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);// fetch api takes url and return promise
            let parsedData = await data.json();
            this.setState({page: this.state.page + 1,
              articles: parsedData.articles,
              loading: false
              })
      }
    }
  render() {
      //to iterate use map and map return something here it is returing div so unique id=key is in div
    return (
      <div className='container my-3 '>
        <div className="text-center"><h1>TimeNews - Top Headline</h1></div>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
           return <div className="col-md-4" key={element.url}> 
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
        <button  disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
