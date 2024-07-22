import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NewsItem extends Component {
    render() {
        let { title, description, urlToImage, newsUrl, author, date, source, mode } = this.props;
        return (
            <div className="card-group" style={{ width: "25rem"}}>
                <div className="my-1 card" style={{background:mode===true?'black':'white',color:mode===true?'white':'black'}}>
                    {(title && description) &&
                        <>
                            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "14px", left: "90%", zIndex: 1 }}> {source} </span>
                            <img src={urlToImage ? urlToImage : 'https://rb.gy/g6mih1'} style={{height:"320px"}} className="card-img-top" alt="..." />
                            <div className="card-body mt-2">
                                <h5 className="card-title" ><q>{title}</q></h5>
                                <p className="card-text p-1">{description}</p>
                                <p className="card-text"><small className={`text-body-${mode===true?'light':'secondary'}`}>By <b>{author}</b> on <b>{new Date(date).toUTCString()}</b></small></p>
                                <Link to={newsUrl} className="btn btn-sm btn-secondary">Read More</Link>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }
}
