import { Star } from "@mui/icons-material";
import { Button, Slider } from "@mui/material";
import { useState } from "react";

const TeacherResultGiveSpecific = () => {
	const subjectType = "theory";
	return (
		<div className="w-full flex flex-col gap-4 p-4">
			<TeacherResultGiveSpecificCompTheory />
			<TeacherResultGiveSpecificCompTheory />
			<TeacherResultGiveSpecificCompPractical />
		</div>
	);
};
const TeacherResultGiveSpecificCompTheory = () => {
	const [point, setPoint] = useState(0);
	return (
		<div className="w-full bg-black flex items-center gap-3 rounded-lg p-4">
			<Star
				sx={{
					color: "white",
				}}
			/>
			<div className="flex flex-col ">
				<h2 className="text-white text-lg font-bold">
					Student : Gopikanta Mondal
				</h2>
				<span className="text-white text-lg">Id : 11200122034</span>
			</div>

			<>
				<CAMarks ca={1} />
				<CAMarks ca={2} />
				<CAMarks ca={3} />
				<CAMarks ca={4} />
			</>
			<div className="flex-1"></div>
			<form className="flex border p-4 gap-2 rounded-lg flex-col w-48">
				<label className="text-white text-lg">
					Theroy Point: {point}
				</label>
				<Slider
					value={point * 10}
					onChange={(e) => {
						setPoint(e.target.value / 10);
					}}
				/>
				<Button variant="contained">Save</Button>
			</form>
		</div>
	);
};
const TeacherResultGiveSpecificCompPractical = () => {
	const [point, setPoint] = useState(0);
	return (
		<div className="w-full bg-black flex items-center gap-3 rounded-lg p-4">
			<Star
				sx={{
					color: "white",
				}}
			/>
			<div className="flex flex-col ">
				<h2 className="text-white text-lg font-bold">
					Student : Gopikanta Mondal
				</h2>
				<span className="text-white text-lg">Id : 11200122034</span>
			</div>
			<>
				<PCAMarks pca={1} />
				<PCAMarks pca={2} />
			</>
			<div className="flex-1"></div>
			<form className="flex border p-4 gap-2 rounded-lg flex-col w-48">
				<label className="text-white text-lg">
					Theroy Point: {point}
				</label>
				<Slider
					value={point * 10}
					onChange={(e) => {
						setPoint(e.target.value / 10);
					}}
				/>
				<Button variant="contained">Save</Button>
			</form>
		</div>
	);
};

const CAMarks = ({ ca }) => {
	const [val, setVal] = useState(0);
	return (
		<form className="flex border p-4 gap-2 rounded-lg flex-col w-48">
			<label className="text-white text-lg">
				CA{ca}: {val}
			</label>
			<Slider
				value={val * 4}
				onChange={(e) => {
					setVal(Math.floor(e.target.value * 25) / 100);
				}}
			/>
			<Button variant="contained">Save</Button>
		</form>
	);
};

const PCAMarks = ({ pca }) => {
	const [val, setVal] = useState(0);
	return (
		<form className="flex border p-4 gap-2 rounded-lg flex-col w-48">
			<label className="text-white text-lg">
				PCA{pca}: {val}
			</label>
			<Slider
				value={(val * 100) / 40}
				onChange={(e) => {
					setVal(Math.floor((e.target.value * 40) / 100));
				}}
			/>
			<Button variant="contained">Save</Button>
		</form>
	);
};
export default TeacherResultGiveSpecific;
