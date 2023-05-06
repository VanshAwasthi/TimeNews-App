import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static deafaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // props pass karke aap state ko set kar skte ho aur fir state ko change kar skte ho lekin props ko change nhi kar skte ho(props are only read only)
  // state is used when you change variable again and again without loading the page
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - TimeNews`;
  }
  //Code refactoring ki hai isleye code commented hai handlePrevClick aur handleNextClick ka
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url); // fetch api takes url and return promise
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    }); //properties cannot be null we have to deal with it
    this.props.setProgress(100);
  }
  // componentDidMount runs after render method runs ,in this case used to update all news articles
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d5a0ea757b884e8bb0bfebe698fc1d07&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);// fetch api takes url and return promise
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles,
    //   totalResults:parsedData.totalResults,
    //   loading: false})//properties cannot be null we have to deal with it
    this.updateNews();
  }
  handlePrevClick = async () => {
    // console.log("Prev")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d5a0ea757b884e8bb0bfebe698fc1d07&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);// fetch api takes url and return promise
    // let parsedData = await data.json();
    // this.setState({articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false})
    this.setState({ page: this.state.page - 1 });
    this.updateNews(); //this. isleye kyo ki ham class ke andar hai
  };

  handleNextClick = async () => {
    // console.log("Next")
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

    //       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d5a0ea757b884e8bb0bfebe698fc1d07&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //       this.setState({loading: true});
    //       let data = await fetch(url);// fetch api takes url and return promise
    //       let parsedData = await data.json();
    //       this.setState({page: this.state.page + 1,
    //         articles: parsedData.articles,
    //         loading: false
    //         })
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews(); //this. isleye kyo ki ham class ke andar hai
  };

  //fetchMoreData is for infinite loading
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url); // fetch api takes url and return promise
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };
  render() {
    //to iterate use map and map return something here it is returing div so unique id=key is in div
    return (
      <>
        <div className="text-center" style={{ margin: "35px 0px" }}>
          <h1>
            TimeNews - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
            Headlines
          </h1>
        </div>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
        <button  disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div> */}
      </>
    );
  }
}

export default News;
