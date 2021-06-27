const app = require('./../app');

exports.checkConnection = (req, res) => {
    if (!app.connectionErrorMsg) {
        res.status(200).send(app.connectedMsg);
    } else {
        res.status(500).send(app.connectionErrorMsg);
    }
}

