import React, { useState } from "react";
import "./CourseContent.css";
import DropDownSection from "./DropDownSection";

export default function CourseContent() {
	const [data, setData] = useState([
		{
			sectionNumber: 1,
			sectionName: "Introduction",
		},
		{
			sectionNumber: 2,
			sectionName: "Html",
		},
		{
			sectionNumber: 3,
			sectionName: "CSS",
		},
		{
			sectionNumber: 4,
			sectionName: "JavaScript",
		},
		{
			sectionNumber: 5,
			sectionName: "Es6",
		},
		{
			sectionNumber: 6,
			sectionName: "React js",
		},
	]);
	return (
		<div className="container">
			{data.map(section => (
				<DropDownSection
					key={section.sectionNumber}
					name={section.sectionName}
					number={section.sectionNumber}
				/>
			))}
		</div>
	);
}
