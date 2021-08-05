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

/*
const [data, setData] = useState([
		{
			sectionNumber: 1,
			sectionName: "Introduction",
			sectionParts: [
				{
					partNumber: 1,
					watchedRate: "50%",
					isArtical: false,
				},
				{
					partNumber: 2,
					watchedRate: "100%",
					isArtical: false,
				},
				{
					partNumber: 3,
					watchedRate: "60%",
					isArtical: false,
				},
			],
		},
		{
			sectionNumber: 2,
			sectionName: "Html",
			sectionParts: [
				{
					partNumber: 4,
					watchedRate: "80%",
					isArtical: false,
				},
			],
		},
		{
			sectionNumber: 3,
			sectionName: "CSS",
			sectionParts: [
				{
					partNumber: 5,
					watchedRate: "0%",
					isArtical: false,
				},
				{
					partNumber: 6,
					watchedRate: "0%",
					isArtical: true,
				},
			],
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
	]);*/
