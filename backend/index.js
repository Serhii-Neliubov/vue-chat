const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('435726431264-6sfbp3i0mj4b3f5jukbsg71eeronfjus.apps.googleusercontent.com')
const port = 4001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/google-login', async (req, res) => {

    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
    })

    res.status(200).json(ticket.getPayload())
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
