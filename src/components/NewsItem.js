import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title , description, imageUrl ,newsUrl} = this.props;//yha destructuring horhi hai this.props ek object hai aur usme se title aur discription pull karke la rhe hai
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} target="__blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
