import { connectedMsg, connectionErrorMsg } from './../app';

exports.checkConnection = (req, res) => {
    if (!connectionError) {
        res.status(200).send(connectedMsg);
    } else {
        res.status(500).send(connectionErrorMsg);
    }
}

