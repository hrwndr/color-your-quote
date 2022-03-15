const express = require('express')
const textToImage = require('text-to-image')
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 2525
const app = express()
app.use(express.json());
app.use(cors())
app.use(express.static('images'))
app.use(express.static('client/build'))


app.post('/generatequote', async (req, res) => {
    const { quote, color } = req.body

    if (quote != '' && color != '') {
        const d = new Date();
        let hour = d.getHours();
        const dataUri = await textToImage.generate(quote, {
            debug: true,
            debugFilename: path.join(__dirname, 'images', `${quote}${hour}.png`),
            maxWidth: 1000,
            customHeight: 500,
            fontSize: 120,
            fontPath: path.join(__dirname, '/Lato-Regular.ttf'),
            fontFamily: 'Lato',
            lineHeight: 30,
            margin: 20,
            bgColor: 'black',
            textColor: color,
            verticalAlign: 'center',
            textAlign: 'center'
        });
        res.json({
            status: 1,
            image: dataUri,
            imgPath: `${quote}${hour}`
        })
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))