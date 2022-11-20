import { useRef } from "react";
import { useSockets } from "../context/socket.context";

function RoomsContainer() {
    const { socket, roomId, rooms } = useSockets();
    const newRoomRef = useRef(null);

    function handleCreateRoom() {
    }

    return (

        <nav>

            <div>
                <input ref={newRoomRef} placeholder="Room Name" />
                <button>CREATE ROOM</button>
            </div>



        </nav>
    );
}

export default RoomsContainer;
