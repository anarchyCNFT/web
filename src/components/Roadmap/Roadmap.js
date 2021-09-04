import React from "react";

export default function Roadmap() {
	return (
		<div className="container">
			<div style={{ minHeight: "75vh" }} className="row d-flex align-items-center">
				<div className="col-lg-4">
					<div >
						<div className="text-center">
							<img src="/images/billboard.png" alt="Stage 1" className="mobilePad-up" style={{ width: "50%" }} />
						</div>
						<p className="lead mt-2">Release the project with first collection sale.</p>
					</div>
				</div>
				<div className="col-lg-4">
					<div >
						<div className="text-center">
							<img src="/images/art-and-design.png" className="mobilePad-up" alt="Stage 2" style={{ width: "50%" }} />
						</div>
						<p className="lead mt-2">Join community and artists together to fund real world causes.</p>
					</div>
				</div>
				<div className="col-lg-4">
					<div>
						<div className="text-center">
							<img src="/images/view.png" alt="Stage 3" className="mobilePad-up" style={{ width: "50%" }} />
						</div>
						<p className="lead mt-2">Change the world.</p>
					</div>
				</div>
			</div>
		</div>
	)
}