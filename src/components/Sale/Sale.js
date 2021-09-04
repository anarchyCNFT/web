import React, { useRef, useState } from 'react';

import Buy from "../../components/nami/buy"


function Sale() {
	const leftToSell = 600

	const [copySuccess, setCopySuccess] = useState('Copy address');
	const textAreaRef = useRef(null);

	function copyToClipboard(e) {
		textAreaRef.current.select();
		document.execCommand('copy');
		e.target.focus();
		if (copySuccess !== 'Copied!') {
			setCopySuccess('Copied!');
		} else {
			setCopySuccess('Copy address')
		}
	};

	return (
		<div className="container">
			<div className="row d-flex justify-content-center">
				<div style={{ minHeight: "45vh" }} className="col-lg-8 d-flex flex-column align-items-center text-center">
					{/* <img src="/images/qr.png" alt="Cardano ADA payment address" style={{ marginTop: "10vh", marginBottom: "3vh" }} /> */}
					<div style={{ marginTop: "10vh", marginBottom: "3vh", width: "300px", height: "300px", background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)" }} /> 
					<h5 style={{ width: "100%" }}>Address:</h5>
					<div>
						<form>
							<textarea
								ref={textAreaRef}
								style={{ height: "2rem", width: "100%" }}
								readOnly
								disabled
								value='addr1......................'
							/>
						</form>
						{
							document.queryCommandSupported('copy') &&
							<div>
								<button disabled style={{ marginBottom: "3vh", marginTop: "1vh", width: "100%" }} className="btn btn-light" onClick={copyToClipboard}>{copySuccess}</button>
							</div>
						}

					</div>
					<h5>Price:</h5>
					<p style={{ width: "100%" }} className="strong">35₳</p>
					<Buy />
					<h3>Start will be announced on <a href="https://twitter.com/anarchy_cnft">Twitter</a>!</h3>
				</div>
			</div>
			<div style={{ minHeight: "25vh" }} className="row d-flex align-items-center justify-content-center">
				<h2>{leftToSell} of 600 left</h2>
			</div>
		</div>
	)
}

export default Sale;