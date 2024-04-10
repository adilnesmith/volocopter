import { useEffect, useState } from "react";
import "./App.css"
import Header from "./components/common/header";
import Footer from "./components/common/footer/copyright";
export const App = () => {
	const [apiStatus, setApiStatus] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/health")
			.then((response) => response.json())
			.then((data) => {
				setApiStatus(data.status);
			});
	}, []);

	return (
		<div>
			<Header />
			<p>API Status: {apiStatus}</p>
			<Footer />
		</div>
	);
};

