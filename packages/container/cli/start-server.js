const express = require('express');
const app = express();

module.exports = {
    start: () => {

        app.use('/', express.static(__dirname + '/../out'));

        app.all('*', (req, res) => {
            res.redirect('/')
        });

        app.listen(3000, function () {
            console.log('> Running frame on port 3000');
        });
    }
};