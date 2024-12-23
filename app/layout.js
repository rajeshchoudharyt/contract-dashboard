import "./globals.css";

export const metadata = {
	title: "Contracts Dashboard",
	description: "A dashboard to view a list of contracts.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="font-sans">{children}</body>
		</html>
	);
}
