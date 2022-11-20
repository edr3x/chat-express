import '../styles/globals.css'
import SocketsProvider from "../context/socket.context"
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SocketsProvider>
            <Component {...pageProps} />
        </SocketsProvider>
    );
}
