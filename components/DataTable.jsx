"use client";

import ModalForm from "./ModalForm";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

const columns = (sendData = null) => [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}>
				Contract ID
				<ArrowUpDown className="ml-2" />
			</Button>
		),
	},
	{
		accessorKey: "clientName",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}>
				Client Name
				<ArrowUpDown className="ml-2" />
			</Button>
		),
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}>
				Status
				<ArrowUpDown className="ml-2" />
			</Button>
		),
	},
	{
		accessorKey: "option",
		header: <p className="ml-4">Edit</p>,
		cell: ({ row }) => (
			<ModalForm data={row.original} sendData={sendData} />
		),
	},
];

export default function DataTable({ data, sendData }) {
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);

	const table = useReactTable({
		data,
		columns: columns(sendData),
		getCoreRowModel: getCoreRowModel(),

		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,

		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),

		state: { sorting, columnFilters },
	});

	return (
		<div className="p-4 w-full">
			<div className="flex items-center">
				<Input
					placeholder="Search by client name..."
					value={
						table.getColumn("clientName")?.getFilterValue() ?? ""
					}
					onChange={(e) =>
						table
							.getColumn("clientName")
							?.setFilterValue(e.target.value)
					}
					className="max-w-xs"
				/>
			</div>

			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id} className="px-0">
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>

				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className="capitalize">
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns().length}
								className="h-20 text-center">
								No results
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
