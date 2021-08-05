import React, { useState } from "react";
import "./SectionPart.css";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";

export default function CourseContent({
	number,
	name,
	rate,
	isArtical,
	length,
	id,
	dataLength,
}) {
	function circleRate() {
		var htmlRateVar = <div></div>;
		if (rate === "100%") {
			return (htmlRateVar = <div className="watch-rate-green"></div>);
		} else if (rate === "0%") {
			return (htmlRateVar = <div></div>);
		} else {
			return (htmlRateVar = <div className="watch-rate-yellow"></div>);
		}
	}

	function rateNumber() {
		var rateNumberVar = <div></div>;
		if (rate === "100%") {
			return (rateNumberVar = <span></span>);
		} else if (rate === "0%") {
			return (rateNumberVar = <span></span>);
		} else {
			return (rateNumberVar = <span>{rate}</span>);
		}
	}

	return (
		<section className="container-part">
			<div className="info">
				<div className="top-info">
					<div className="icon">
						{isArtical ? (
							<Ionicons name="newspaper" size={24} color="black" />
						) : (
							<Feather name="film" size={24} color="black" />
						)}
						{rate === "0%" ? (
							<div className="lock">
								<FontAwesome name="lock" size={24} color="#F56565" />
							</div>
						) : (
							<div className="lock"></div>
						)}
					</div>
					<p>{name}</p>
					<div className="container-watched">
						{circleRate()}
						{rateNumber()}
					</div>
				</div>
				<div className="bottom-info">
					<span className="section-num">
						section: {number}/{length}
					</span>
					<span>
						course: {id}/{dataLength}
					</span>
				</div>
			</div>
		</section>
	);
}
