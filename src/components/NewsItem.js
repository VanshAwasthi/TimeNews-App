import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title , description, imageUrl ,newsUrl,author,date,source} = this.props;//yha destructuring horhi hai this.props ek object hai aur usme se title aur discription pull karke la rhe hai
    return (
      <div className="my-3">
        <div className="card" >
          <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:'0'}}>
              <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
            <img src={!imageUrl?"https://images.hindustantimes.com/tech/img/2023/04/30/1600x900/asteroid-4369511_1920_Pixabay_1682824505795_1682824517645.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()} </small></p>{/*new date object banaya Date aur fir .toGMTString kardiya usko*/}
                <a href={newsUrl} target="__blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
