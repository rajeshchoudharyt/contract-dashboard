"use client";

import { useState, useEffect } from "react";

const useWebSocket = (url) => {
	const [data, setData] = useState([]);
	const [ws, setWs] = useState(null);

	function connect() {
		const socket = new WebSocket(url);
		setWs(socket);

		socket.onmessage = (ev) => {
			const message = JSON.parse(ev.data);

			// To update contracts on edit
			if (message.eventName === "edit") {
				setData((prev) =>
					prev.map((contract) =>
						contract.id === message.data.id
							? message.data
							: contract
					)
				);
				return;
			}

			// To create new contracts
			if (message.eventName === "create") {
				setData((prev) => [...prev, message.data]);
				return;
			}

			// To initilize contracts data
			setData(message);
		};

		socket.onclose = (e) => {
			console.log("Socket is closed.");
		};

		socket.onerror = (e) => {
			console.log("Socket encountered error.");
		};

		return socket;
	}

	useEffect(() => {
		const socket = connect();
		return () => {
			setWs(null);
			socket.close();
		};
	}, [url]);

	// To reconnect websocket
	useEffect(() => {
		const interval = setInterval(() => {
			if (!ws) {
				connect();
				return;
			}
			if (ws?.readyState === 3) {
				connect();
			}
		}, 10000);

		return () => {
			clearInterval(interval);
		};
	}, [ws]);

	const sendData = (data) => {
		if (ws?.readyState === 1) ws.send(JSON.stringify(data));
		else alert("Error: Wedsocket connection is closed.");
	};

	return [data, sendData];
};

export default useWebSocket;
