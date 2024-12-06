import { useEffect, useState } from "react";
import { getNotices } from "../services/notices";

const Notices = () => {
	const [notices, setNotices] = useState([]);
	useEffect(() => {
		getNotices().then((data) => {
			setNotices(data.data);
		});
	}, []);
	return (
		<div className="h-full w-full">
			<h1 className="font-bold py-4 text-4xl">Notices</h1>
			<div className="w-full flex flex-col gap-4">
				{notices.length
					? notices.map((notice, index) => (
							<NoticeComp
								key={index}
								date={notice.date}
								title={notice.title}
								details={notice.details}
							/>
					  ))
					: "No Notices Currently "}
			</div>
		</div>
	);
};

const NoticeComp = ({ date, title, details }) => {
	return (
		<>
			<div className="w-full bg-black rounded-2xl text-white  p-8">
				<h2 className="text-2xl font-bold">{title}</h2>
				<h2 className="text-xl ">Date: {date}</h2>
				<h2 className="text-lg ">Details: {details}</h2>
			</div>
		</>
	);
};

export default Notices;
