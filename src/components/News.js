import React, { useEffect, useState } from 'react'
import NewsItem from './newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(false);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);
    // document.title = `NewsZeken-${capitalizeFirstLetter(props.category)}`

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pagesize}`;
        setloading(true)
        let data = await fetch(url)
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)
        console.log(articles.length)
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])


    const fetchMoreData = async () => {
        setpage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e529ca9df52c49419c0ba9a15619bc0d&page=${page}&pageSize=${props.pagesize}`;
        setloading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setTimeout(() => {
            setarticles(articles.concat(parsedData.articles))
            settotalResults(parsedData.totalResults)
            setloading(false)
            console.log(articles.length)
            console.log(totalResults)
        }, 1000);
    };


    return (
        <>
            <div className='container my-3'>
                <h1>Top {capitalizeFirstLetter(props.category)} headlines</h1>
                {loading && <Spinner />}
            </div>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length <= totalResults}
                loader={<Spinner />}
            >
                <div className="container">

                    <div className="row">
                        {articles.map((element, index) => {
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

News.defaultProps = {
    country: "in",
    pagesize: 6,
    category: "general",
}
News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
}


export default News
