import React, { useState } from 'react'
import cooking from '../assets/cooking.gif'

const Home = () => {
    const [quote, setQuote] = useState('')
    const [color, setColor] = useState('#ffffff')
    const [res, setRes] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const serverUrl = 'https://coloryourqoute.herokuapp.com'
    // const serverUrl = 'http://localhost:2525'

    const onFormSubmit = ev => {
        setIsLoading(true)
        ev.preventDefault()
        if (color !== '' && quote !== '') {
            fetch(`${serverUrl}/generatequote`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ quote, color })
            }).then(res => res.json())
                .then(data => {
                    setIsLoading(false)
                    setRes(data)
                })
                .catch(err => console.log(err))
        } else {
            alert('All fields are required!')
        }
    }


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <h2>Generate Colored Quotes</h2>
                    <form onSubmit={onFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="quote" className="form-label mt-4">Enter Quote</label>
                            <input type="text" className="form-control" id="quote" placeholder="Eg. In a gentle way, you can shake the world." value={quote} onChange={e => setQuote(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="color" className="form-label mt-4">Select Color</label>
                            <input type="color" className="form-control" value={color} onChange={e => setColor(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            Generate
                            &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>

                        </button>
                    </form>
                </div>
                <div className="col-sm-12 col-md-6 mt-5">
                    {
                        res !== '' ? (
                            <div className="card">
                                <img src={res.image} className="card-img-top" alt="Generated Quote Image" />
                                <div className="card-body">
                                    <a href={`${serverUrl}/${res.imgPath}.png`} target="_blank" className="btn btn-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                        </svg>
                                        &nbsp;
                                        Download PNG</a>
                                </div>
                            </div>
                        ) : isLoading ? <img src={cooking} alt="Generating image.." /> : ''
                    }

                </div>
            </div>
        </div>
    )
}

export default Home