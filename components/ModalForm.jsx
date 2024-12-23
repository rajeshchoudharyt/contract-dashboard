"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Edit } from "lucide-react";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const schema = z.object({
	id: z.coerce.number().positive().readonly(),
	clientName: z
		.string()
		.regex(/^[\S].*[a-z]+$/i)
		.min(2, "Client name must be atleast 2 characters in length.")
		.max(50)
		.trim()
		.nonempty("Client name cannot be blank."),
	status: z.enum(["accepted", "approved", "draft", "finalized", "pending"]),
});

export default function ModalForm({ data, sendData, isNewContract = false }) {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			id: data.id,
			clientName: data.clientName,
			status: data.status,
		},
	});

	const handleSubmit = (values) => {
		isNewContract
			? sendData({ eventName: "create", data: values })
			: sendData({ eventName: "edit", data: values });
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				{isNewContract ? (
					<p
						className={`max-w-fit ${buttonVariants({
							variant: "default",
						})}`}>
						Generate New Contract
					</p>
				) : (
					<Edit className="hover:cursor-pointer hover:scale-110">
						Edit
					</Edit>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isNewContract
							? "Generate new contract"
							: "Edit contract"}
					</DialogTitle>
					<DialogDescription>
						{isNewContract
							? "Fill the below information to generate new contract."
							: "Edit the below information to edit contract"}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex flex-col space-y-4">
						<FormField
							control={form.control}
							name="id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contract ID</FormLabel>
									<FormControl>
										<Input
											placeholder="Contract ID"
											value={Number(field.value)}
											readOnly
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="clientName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Client Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Client Name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a status" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="accepted">
												Accepted
											</SelectItem>
											<SelectItem value="approved">
												Approved
											</SelectItem>
											<SelectItem value="draft">
												Draft
											</SelectItem>
											<SelectItem value="finalized">
												Finalized
											</SelectItem>
											<SelectItem value="pending">
												Pending
											</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="min-w-fit w-20 self-center">
							{isNewContract ? "Create" : "Edit"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
