"use client";

import Contracts from "@/components/Contracts";

export default function Home() {
	return (
		<div className="w-full flex flex-col items-center">
			<h2 className="font-bold text-2xl m-4 text-center">Contracts</h2>
			<Contracts />
		</div>
	);
}
