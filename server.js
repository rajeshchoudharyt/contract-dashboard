import { WebSocketServer } from "ws";

let contracts = [
	{ id: 1, clientName: "name four", status: "draft" },
	{ id: 2, clientName: "name five", status: "finalized" },
	{ id: 3, clientName: "name two", status: "approved" },
	{ id: 4, clientName: "name three", status: "pending" },
	{ id: 5, clientName: "name one", status: "accepted" },
];

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
	console.log("Client connected.");
	ws.send(JSON.stringify(contracts));

	ws.on("message", (message) => {
		message = JSON.parse(message);
		console.log("Log:", message);

		// To edit contract
		if (message?.eventName === "edit") {
			contracts = contracts.map((contract) =>
				contract.id === message.data.id ? message.data : contract
			);
			ws.send(
				JSON.stringify({
					eventName: "edit",
					data: message.data,
				})
			);
		}

		// To create new contract
		if (message?.eventName === "create") {
			contracts.push(message.data);
			ws.send(
				JSON.stringify({
					eventName: "create",
					data: message.data,
				})
			);
		}
	});

	ws.on("close", () => console.log("Client disconnected."));
});

console.log("WebSocket Server running on PORT 3001.");
