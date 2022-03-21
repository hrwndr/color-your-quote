import React, { useState, useCallback, useEffect } from 'react'
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
        if (value.length == 0) setRes('')
        setQuote(value)
    }, []);
    const handleColorChange = useCallback((value) => {
        setColor(value)
    }, []);

    const cUrl = window.location.href.toString()
    const serverUrl = cUrl.substr(0, cUrl.length - 1)
    // const serverUrl = 'http://localhost:2525'

    useEffect(() => {
        if (quote !== '') {
            fetch(`${serverUrl}/generatequote`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ quote, color })
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    setIsLoading(false)
                    setRes(data)
                })
                .catch(err => console.log(err))
        }
    }, [quote, color])

    // const onFormSubmit = () => {
    //     setIsLoading(true)
    //     // ev.preventDefault()
    // if (quote !== '') {
    //     fetch(`${serverUrl}/generatequote`, {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({ quote, color })
    //     }).then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             setIsLoading(false)
    //             setRes(data)
    //         })
    //         .catch(err => console.log(err))
    // }
    // }

    return (
        <div className="container mt-30">
            <Layout>
                <Layout.Section oneThird>
                    <Card title="Generate Your Colored Quote">
                        <Card.Section>
                            <Form onSubmit={() => console.log('This application works in real time. 🥳🥳')}>
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
                                    <ColorPicker label="Select Color" fullWidth onChange={handleColorChange} color={color} allowAlpha />
                                    {/* <Button primary submit>Generate</Button> */}
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
                            <Card title="Result">
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