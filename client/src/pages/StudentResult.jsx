import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";

const sem = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const StudentResult = () => {
	return (
		<div className="h-full w-full flex flex-wrap gap-5 ">
			{sem.map((value, index) => (
				<Link key={index} to={`${index + 1}`}>
					<div className="sm:w-96 w-1/2 sm:h-48 h-32 bg-gradient-to-b text-white hover:text-yellow-500 from-black via-black to-gray-700 rounded-3xl flex items-center p-4 transition-transform transform hover:scale-105">
						<Star
							sx={{
								color: "inherit",
								height: 100,
								width: 100,
							}}
						/>
						<div className="flex-1">
							<h2 className="text-2xl font-bold text-white">
								{value}
							</h2>
							<p className="text-lg text-gray-300">
								{value} Sem result is here
							</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default StudentResult;
