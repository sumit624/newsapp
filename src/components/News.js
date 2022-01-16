import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import spinner from "./spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
    document.title = `${this.props.category} - NewsSumit`;
  }

  async componentDidMount() {
    console.log("cdm");
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6faa94b6d6c34a2fb8328333d2db4838&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults});
  }

   handlePrevClick = async ()=>{
      console.log("previous")
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6faa94b6d6c34a2fb8328333d2db4838&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);

      this.setState({
        page: this.state.page-1,
        articles: parsedData.articles
      })
  }

   handleNextClick = async ()=>{
      console.log("Next")
      if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6faa94b6d6c34a2fb8328333d2db4838&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
  
        this.setState({
          page: this.state.page+1,
          articles: parsedData.articles
        })
      }
  }

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '40px 0px'}}>NewsSumit-Top Headlines from {this.props.category}</h1>
        {/* <spinner/> */}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
        </div>
      </div>
    );
  }
}

export default News;
