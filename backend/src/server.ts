import app from './app';

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1> Server is Running! </h1>');
});

app.get('/ping', (req, res) => {
    res.send('pong 🏓')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
