import { useEffect, useState } from "react";
import "./App.css"
import Header from "./components/common/header";
import Footer from "./components/common/footer/copyright";
import Board from "./components/board";
import Modal from "./components/modal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
	const [showModal, setShowModal] = useState(false);

	const handleAddMission = () => {
		setShowModal(true);
	};

	const handleSaveMission = (title: string, description: string) => {
		// Logic to save the mission
		setShowModal(false);
	};

	const handleCancel = () => {
		setShowModal(false);
	};

	return (
		<div>
			<Header onAddMission={handleAddMission} />
			<Board onAddMission={handleAddMission} /> {/* Pass down the function */}
			<Footer />
			<ToastContainer

				position="bottom-center"
			/>
			{showModal && (
				<Modal
					mode="add"
					title="Add Mission"
					onSave={handleSaveMission}
					onCancel={handleCancel}
				/>
			)}
		</div>
	);
};
