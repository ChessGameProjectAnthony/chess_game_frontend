export function MatchSocketEventsRegister(socket: WebSocket) {
    socket.onmessage = (event) => {
        console.log(event)
    }
}