import React from "react";

export default function About() {
	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-3 talk">
					<h1>anarchy</h1>
					<h1>CNFT</h1>
					<br />
					<h6 className="bold-four">
						Aiming to create a safe place for unconventional art and support underground artists to share their messages with the world permanently.  Art is a powerful tool that can enable us to realize the truth and blockchain is the best place to save it.
					</h6>
					<br />
					<h6><a className="btn btn-dark start start-two" href="#Collection">Collection</a></h6>
				</div>
				<div className="col-md-9 text-center">
					<img className="img-fluid" src="/images/about.png" style={{float: "right"}} alt="anarchyCNFT First Collection"/>
				</div>
			</div>
			<div className="row anarchy-art-quote align-items-center">
				<div className="col-lg-12" style={{ color: "#63171B" }}>
					<h2 className="font-italic text-center">"An artist as an artist must be an anarchist."</h2>
					<h5 className="text-center">Kurt Eisner</h5>
				</div>
			</div>
		</div>
	)
}