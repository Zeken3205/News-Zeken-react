import React, { Component } from 'react'
import NewsItem from './newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: "in",
        pagesize: 6,
        category: "general",
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsZeken-${this.capitalizeFirstLetter(this.props.category)}`
    }



    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url)
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        console.log(this.state.articles.length)
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();

    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e529ca9df52c49419c0ba9a15619bc0d&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setTimeout(() => {
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
                loading: false
            });
            console.log(this.state.articles.length)
            console.log(this.state.totalResults)
        }, 1000);
    };


    render() {
        return (
            <>
                <div className='container my-3'>
                    <h1>Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
                    {this.state.loading && <Spinner />}
                </div>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length <= this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">

                        <div className="row">
                            {this.state.articles.map((element, index) => {
                                return <div className="col-md-4" key={index}>
                                    <NewsItem title={(element.title ? element.title : "")} description={(element.description ? element.description : "").slice(0, 88)} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
    }
}

export default News
