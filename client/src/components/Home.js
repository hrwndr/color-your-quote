import React, { useState, useCallback } from 'react'
import { Card, Form, FormLayout, TextField, Button, ColorPicker, Layout } from '@shopify/polaris'

function Home() {
    const [quote, setQuote] = useState('')
    const [color, setColor] = useState({
        hue: 300,
        brightness: 1,
        saturation: 0.7,
        alpha: 0.7,
    });
    const [res, setRes] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleQuoteChange = useCallback((value) => {
        setRes('')
        setQuote(value)
    }, []);

    const serverUrl = 'https://coloryourqoute.herokuapp.com'
    // const serverUrl = 'http://localhost:2525'

    const onFormSubmit = ev => {
        setRes('')
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
        <div className="container mt-30">
            <Layout>
                <Layout.Section oneThird>
                    <Card title="Generate Your Colored Quote">
                        <Card.Section>
                            <Form onSubmit={onFormSubmit}>
                                <FormLayout>
                                    <TextField
                                        label="Quote"
                                        value={quote}
                                        onChange={handleQuoteChange}
                                        type="text"
                                        autoComplete="off"
                                        helpText={
                                            <span>
                                                Enter your quote in the above field.
                                            </span>
                                        }
                                    />
                                    <ColorPicker label="Select Color" fullWidth onChange={setColor} color={color} allowAlpha />
                                    <Button primary submit>Generate</Button>
                                </FormLayout>
                            </Form>
                        </Card.Section>
                    </Card>
                </Layout.Section>
                {
                    res === '' ? (
                        <Layout.Section oneThird>
                            <Card title="Real Time View">
                                <Card.Section>
                                    <div className="realtimeview">
                                        <span className="typedQuote" style={{ color: `hsla(${color.hue}, ${color.saturation * 100}%, ${color.brightness * 100}%, ${color.alpha})` }} >{quote}</span>
                                    </div>
                                </Card.Section>
                            </Card>
                        </Layout.Section>
                    ) : isLoading ? 'Generating Image..' : (
                        <Layout.Section oneThird>
                            <Card title="Generated Image">
                                <Card.Section>
                                    <img src={res.image} style={{ width: '100%', marginBottom: '10px' }} />
                                    <Button onClick={() => window.open(`${serverUrl}/${res.imgPath}.png`, '_blank')} primary>Download PNG</Button>
                                </Card.Section>
                            </Card>
                        </Layout.Section>
                    )
                }
            </Layout>
        </div >
    )
}

export default Home