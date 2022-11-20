import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSockets } from "../context/socket.context"

export default function Home() {
    const { socket } = useSockets();
    return (
        <div>{socket.id}</div>
    )
}
