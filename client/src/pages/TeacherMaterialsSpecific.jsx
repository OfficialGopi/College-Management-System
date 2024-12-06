import { useFileHandler } from "6pp";
import {
	Add,
	Close,
	Delete,
	Download,
	LibraryBooks,
} from "@mui/icons-material";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";

const TeacherMaterialsSpecific = () => {
	const file = useFileHandler("single");
	const handleOnSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<div className="h-full w-full flex flex-col gap-4 p-4">
				<form
					className="w-full flex p-5  flex-col gap-4 bg-black rounded-xl"
					onSubmit={handleOnSubmit}
				>
					<div className="w-full flex flex-col gap-4">
						<TextField
							className="w-full p-2 text-3xl rounded-3xl  focus:text-white invert"
							sx={{
								borderRadius: "12px",
							}}
							label=" Title"
							variant="outlined"
							size="36px"
						/>
					</div>
					<div className="w-full flex flex-col gap-4">
						<TextField
							className="w-full p-2 text-3xl rounded-3xl  focus:text-white invert "
							color="secondary"
							label="Descrption"
							variant="outlined"
							size="36px"
						/>
					</div>
					{file.file && (
						<div
							style={{
								position: "relative",
								width: "200px",
								height: "100px",
								border: "2px solid  gray",
								borderRadius: "10px",
								overflow: "hidden",
							}}
						>
							<object
								data={file.preview}
								type="application/pdf"
								style={{
									width: "100%",
									height: "100%",
									objectFit: "fill",
									zIndex: 0,
								}}
							></object>
							<IconButton
								style={{
									position: "absolute",
									top: "10px",
									right: "10px",
									zIndex: 10,
									backgroundColor: "gray",
								}}
								onClick={file.clear}
							>
								<Close fontSize="small" />
							</IconButton>
						</div>
					)}
					<div className="flex">
						<Tooltip title="Add Attachment">
							<IconButton
								color="inherit"
								size="medium"
								sx={{
									position: "relative",
									overflow: "hidden",
								}}
								component={"label"}
							>
								<Add
									sx={{
										color: "white",
									}}
								/>
								<TextField
									type="file"
									onChange={file.changeHandler}
									sx={{
										width: 0,
										height: 0,
										overflow: "hidden",
										position: "absolute",
									}}
								></TextField>
							</IconButton>
						</Tooltip>
						<div className="w-full flex items-center gap-2">
							<Button
								type="submit"
								variant="contained"
								sx={{
									backgroundColor: "#1A1D23",
									color: "white",
									borderRadius: "24px",
									height: "50px",
									width: "100px",
								}}
							>
								Submit
							</Button>
						</div>
					</div>
				</form>
				<PrevMaterials />
			</div>
		</>
	);
};

const PrevMaterials = () => {
	return (
		<div className="w-full p-4  gap-2 rounded-xl flex flex-col overflow-y-scroll flex-1">
			<PrevMaterialsSpecific />
			<PrevMaterialsSpecific />
			<PrevMaterialsSpecific />
			<PrevMaterialsSpecific />
		</div>
	);
};
const PrevMaterialsSpecific = () => {
	return (
		<div className="w-full bg-black p-4 gap-4 text-white flex items-center  rounded-xl">
			<LibraryBooks fontSize="large" />
			<div className="flex gap-2 flex-col">
				<span className="font-bold text-2xl">Title : Hello World</span>
				<span className="font-semibold text-xl">
					Description : Hello World Hello World Hello World Hello
					World Hello World Hello World
				</span>
			</div>
			<div className="flex-1"></div>
			<IconButton
				sx={{
					color: "white",
				}}
			>
				<Delete />
			</IconButton>
			<IconButton
				sx={{
					color: "white",
				}}
			>
				<Download />
			</IconButton>
		</div>
	);
};

export default TeacherMaterialsSpecific;
