import { nanoid } from 'nanoid';
import { Server, Socket } from 'socket.io'; socket
import logger from './utils/logger'

const EVENTS = {
    connection: 'connection',
    CLIENT: {
        CREATE_ROOM: 'CREATE_ROOM',
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    },
    SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE"
    }
}

const rooms: Record<string, { name: string }> = {}

function socket({ io }: { io: Server }) {
    logger.info("Sockets enabled");

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);

        // When a user creates a new room

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
            console.log({ roomName });

            // create a roomId
            const roomId = nanoid()

            // add a new room to the room object
            rooms[roomId] = {
                name: roomName
            }

            socket.join(roomId);

            //boradcast an event saying there is a new room
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

            //emit back to the room creator with all the rooms
            socket.emit(EVENTS.SERVER.ROOMS, rooms);

            //emit event back to room creator saying they have joined a room
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);

        });


        // When a user sends a room message

        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({ roomId, message, username }) => {

            const date = new Date();

            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message, username, time: `${date.getHours()}:${date.getMinutes()}`,
            })
        })
    });
}

export default socket;
