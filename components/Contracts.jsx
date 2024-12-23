"use client";

import useWebSocket from "@/app/hooks/useWebSocket";
import DataTable from "./DataTable";
import ModalForm from "./ModalForm";

export default function Contracts() {
	const [data, sendData] = useWebSocket("ws://localhost:3001");

	return (
		<div className="w-full max-w-4xl flex flex-col items-center">
			<DataTable data={data} sendData={sendData} />
			<ModalForm
				key={data.length + 1}
				data={{ id: data.length + 1, clientName: "", status: "" }}
				sendData={sendData}
				isNewContract={true}
			/>
		</div>
	);
}
