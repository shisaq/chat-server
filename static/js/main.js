import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

import Layout from './components/Layout';

const socket = io.connect(process.env.SOCKET_URL);

const App = () => (
    <MuiThemeProvider>
        <SocketProvider socket={socket}>
            <Layout />
        </SocketProvider>
    </MuiThemeProvider>
);

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
