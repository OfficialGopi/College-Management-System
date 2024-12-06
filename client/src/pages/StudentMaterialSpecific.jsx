import { BookSharp, DownloadRounded } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMaterials } from "../services/materials";
import { useSelector } from "react-redux";
const StudentMaterialSpecific = () => {
	const { subjectCode } = useParams();
	const [materials, setMaterials] = useState([]);
	const auth = useSelector((state) => state.auth.value);
	materials.sort((a, b) => {
		if (new Date(a.date) < new Date(b.date)) return 1;
		if (new Date(a.date) > new Date(b.date)) return -1;
		if (new Date(a.date) == new Date(b.date)) return 0;
	});
	useEffect(() => {
		getMaterials({
			batchId: auth.batchId._id,
			subjectCode: subjectCode,
		}).then((data) => {
			setMaterials(data.data);
		});
	}, []);
	return (
		<div className="flex h-full w-full">
			{/* Main Content */}
			<div className="flex-1 p-6">
				<h1 className="text-3xl font-bold mb-4">Materials</h1>
				<div className="flex flex-col w-full  gap-4">
					{materials.length > 0 ? (
						materials.map((material, index) => {
							return (
								<MaterialComp
									title={material.title}
									description={material.description}
									date={material.date}
									url={material.url}
								/>
							);
						})
					) : (
						<div>
							<p>No materials available</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const MaterialComp = ({ title, description, date, url }) => {
	const handleDownload = () => {
		window.open(url, "_blank");
	};
	return (
		<div className="w-full p-4 rounded-xl gap-4 text-wrap bg-gradient-to-br justify-between text-white from-black via-black to-slate-700   items-center flex min-h-20 border">
			<BookSharp fontSize="large" />
			<div className="flex flex-col flex-1">
				<h2 className="text-2xl font-bold">{title}</h2>
				<p className="text-lg">{description}</p>
				<Typography
					color="info"
					sx={{
						fontSize: 13,
					}}
				>
					Material posted on {date}
				</Typography>
			</div>
			<IconButton onClick={handleDownload}>
				<DownloadRounded
					sx={{
						color: "white",
					}}
				/>
			</IconButton>
		</div>
	);
};

export default StudentMaterialSpecific;
