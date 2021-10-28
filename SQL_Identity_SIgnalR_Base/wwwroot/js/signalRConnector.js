import { signalR } from '../lib/microsoft/signalr/dist/browser/signalr';

class SignalRConnector {
    constructor(url) {
        this._url = url;
        this.connection = {};
    }

    connect() {
        if (!this._url)
            alert('Unable to connect to empty url');

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(this._url)
            .build();

        this.connection.start()
            .then(() => console.log('signalR connected!'))
            .catch((error) => {
                console.error('signalR connection failed');
                console.error(error);
            });
    }
}