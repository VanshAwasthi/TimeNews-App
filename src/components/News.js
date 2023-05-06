import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${capitalizeFirstLetter(
  //   props.category
  // )} - TimeNews`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // props pass karke aap state ko set kar skte ho aur fir state ko change kar skte ho lekin props ko change nhi kar skte ho(props are only read only)
  // state is used when you change variable again and again without loading the page

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url); // fetch api takes url and return promise
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    //properties cannot be null we have to deal with it
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, []);

  // const handlePrevClick = async () => {
  //   // console.log("Prev")
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d5a0ea757b884e8bb0bfebe698fc1d07&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);// fetch api takes url and return promise
  //   // let parsedData = await data.json();
  //   // this.setState({articles: parsedData.articles,
  //   //   page: this.state.page - 1,
  //   //   loading: false})
  //   setPage(page-1)
  //   updateNews(); //this. isleye kyo ki ham class ke andar hai
  // };

  // const handleNextClick = async () => {
  //   // console.log("Next")
  //   // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){

  //   //       let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d5a0ea757b884e8bb0bfebe698fc1d07&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //   //       this.setState({loading: true});
  //   //       let data = await fetch(url);// fetch api takes url and return promise
  //   //       let parsedData = await data.json();
  //   //       this.setState({page: this.state.page + 1,
  //   //         articles: parsedData.articles,
  //   //         loading: false
  //   //         })
  //   // }
  //   setPage(page+1)
  //   updateNews(); //this. isleye kyo ki ham class ke andar hai
  // };

  //fetchMoreData is for infinite loading
  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url); // fetch api takes url and return promise
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  //to iterate use map and map return something here it is returing div so unique id=key is in div
  return (
    <>
      <div className="text-center" style={{ margin: "35px 0px" }}>
        <h1>
          TimeNews - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
      </div>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
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
        <button  disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div> */}
    </>
  );
};

News.deafaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
