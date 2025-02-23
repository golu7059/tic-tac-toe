let socket;

function getSocket() {
	// If socket doesn't exist or it's not open, create a new one
	if (!socket || socket.readyState !== WebSocket.OPEN) {
		socket = new WebSocket("ws://localhost:8080");
		socket.onopen = () => console.log("WebSocket connected");
		socket.onerror = (error) => console.error("WebSocket error:", error);
	}
	return socket;
}

export default getSocket;
