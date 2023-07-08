import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <img src={imageurl ? imageurl : 'https://c.ndtvimg.com/2023-07/qjlnjtj8_stuart-broad-afp_625x300_06_July_23.jpg?im=FitAndFill,algorithm=dnn,width=1200,height=675'} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{title} <span class="badge bg-secondary">{source}</span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>
            <a href={newsurl} rel="noreferrer" target="_blank" className="btn btn-dark btn-sm">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
