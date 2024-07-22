import React from 'react'

const body = (props) => {
    return (
        <div>
            <div className="card-body" style={{ color: props.mode === true ? 'white' : 'black', background: props.mode === true ? 'black' : 'white' }}>
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}

export default body
