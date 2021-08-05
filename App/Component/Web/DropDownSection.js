import React, { useState } from "react";
import SectionPart from "./SectionPart";
import { AntDesign } from "@expo/vector-icons";

const DropDownSection = ({ name, number }) => {
	const [clicked, setClicked] = useState(false);
	const [data, setData] = useState([
		{
			partId: 1,
			partNumber: 1,
			partName:
				"This is first part intro,This is first part intro,This is first part intro",
			watchedRate: "50%",
			parentName: "Introduction",
			isArtical: false,
		},
		{
			partId: 2,
			partNumber: 2,
			partName: "This is second part intro",
			watchedRate: "100%",
			parentName: "Introduction",
			isArtical: false,
		},
		{
			partId: 3,
			partNumber: 1,
			partName: "This is part of CSS",
			watchedRate: "60%",
			parentName: "CSS",
			isArtical: false,
		},
		{
			partId: 4,
			partNumber: 1,
			partName: "This is part of JavaScript",
			watchedRate: "80%",
			parentName: "JavaScript",
			isArtical: false,
		},
		{
			partId: 5,
			partNumber: 1,
			partName: "This is part of Es6",
			watchedRate: "0%",
			parentName: "Es6",
			isArtical: false,
		},
		{
			partId: 6,
			partNumber: 1,
			partName: "This is part of React js",
			watchedRate: "0%",
			parentName: "React js",
			isArtical: true,
		},
	]);

	const handleOpen = () => {
		setClicked(!clicked);
	};
	return (
		<div className="box">
			<div className="section-name" onClick={handleOpen}>
				<p>
					{number}. {name}
				</p>
				<span className="span">
					{clicked ? (
						<AntDesign name="up" size={15} color="gray" />
					) : (
						<AntDesign name="down" size={15} color="gray" />
					)}
				</span>
			</div>
			<div className={clicked ? "hidden open" : "hidden"}>
				{data
					.filter(part => part.parentName === name)
					.map(part => (
						<SectionPart
							key={part.partId}
							id={part.partId}
							number={part.partNumber}
							name={part.partName}
							rate={part.watchedRate}
							isArtical={part.isArtical}
							length={data.filter(part => part.parentName === name).length}
							dataLength={data.length}
						/>
					))}
			</div>
		</div>
	);
};

export default DropDownSection;
