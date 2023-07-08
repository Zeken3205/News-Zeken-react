import React, { Component } from 'react'
import NewsItem from './newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: "in",
        pagesize: 6,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e529ca9df52c49419c0ba9a15619bc0d&page=1&pageSize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({ articles: parsedData.articles, totalresults: parsedData.totalResults, loading: false })
    }

    handlePrev = async () => {
        console.log("previous")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e529ca9df52c49419c0ba9a15619bc0d&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNext = async () => {
        console.log("next")
        if (!(this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pagesize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e529ca9df52c49419c0ba9a15619bc0d&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
            this.setState({ loading: true })
            let data = await fetch(url)
            let parsedData = await data.json()


            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h1>Top headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={(element.title ? element.title : "")} description={(element.description ? element.description : "").slice(0, 88)} imageurl={element.urlToImage} newsurl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous </button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pagesize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
