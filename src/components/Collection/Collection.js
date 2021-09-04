import React, { useState } from "react"

const nfts = [
	{
		name: "anarchy1CNFT",
		text: "Chaotic mess on the verge of collapse. Just like our society.",
		pictureUrl: "/images/anarchy1.jpg"
	},
	{
		name: "anarchy2CNFT",
		text: "Birds, reptiles, nature. You can find anything in it. Definitely better then watching TV.",
		pictureUrl: "/images/anarchy2.jpg"
	},
	{
		name: "anarchy3CNFT",
		text: "Blood in the wind. Animals can relate, some people too.",
		pictureUrl: "/images/anarchy3.jpg"
	},
	{
		name: "anarchy4CNFT",
		text: "Empty inside. But shining.",
		pictureUrl: "/images/anarchy4.jpg"
	},
	{
		name: "anarchy5CNFT",
		text: "Everybody is just fighting for their piece.",
		pictureUrl: "/images/anarchy5.jpg"
	},
	{
		name: "anarchy6CNFT",
		text: "Eyes looking out while all the horrible things are happening inside their inner circle.",
		pictureUrl: "/images/anarchy6.jpg"
	},
	{
		name: "anarchy7CNFT",
		text: "Nature is taking revenge with flames.",
		pictureUrl: "/images/anarchy7.jpg"
	},
	{
		name: "anarchy8CNFT",
		text: "Thorny road through life. Whose fault is it?",
		pictureUrl: "/images/anarchy8.jpg"
	},
	{
		name: "anarchy9CNFT",
		text: "A Farewell to Arms",
		pictureUrl: "/images/anarchy9.jpg"
	},
	{
		name: "anarchy10CNFT",
		text: "So deep into comfort that it's uncomfortable.",
		pictureUrl: "/images/anarchy10.jpg"
	},
	{
		name: "anarchy11CNFT",
		text: "Nature's elements destroying man's pride like nothing.",
		pictureUrl: "/images/anarchy11.jpg"
	},
	{
		name: "anarchy12CNFT",
		text: "Surrounded by all the colors you can't recognize one.", 
		pictureUrl: "/images/anarchy12.jpg"
	},
	{
		name: "anarchy13CNFT",
		text: "Hidden sadness and cry - it shouldn't be normal.", 
		pictureUrl: "/images/anarchy13.jpg"
	},
	{
		name: "anarchy14CNFT",
		text: "The Art of Destruction - power of the society to destroy itself is developed collectivelly every day.", 
		pictureUrl: "/images/anarchy14.jpg"
	},
	{
		name: "anarchy15CNFT",
		text: "Ocean life hidden under blanket from mess.", 
		pictureUrl: "/images/anarchy15.jpg"
	}
]


function Collection() {
	const [nft, changeNftSelection] = useState(nfts[0])

	const selectNft = (e) => {
		const selectedValue = e.target.value
		changeNftSelection(nfts[selectedValue])
	}

	return (
		<div className="container">
			<div className="row" style={{ marginTop: "5vh" }}>
				<div className="col-lg-12">
					<select style={{ marginBottom: "2vh", minHeight: "4vh", minWidth: "15vh" }} onChange={(val) => selectNft(val)} className="form-select" aria-label="Select NFT">
						{nfts.map((nft, i) => <option value={i} key={i}>{nft.name}</option>)}
					</select>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-6 text-center">
					<img style={{ width: "100%" }} alt={nft.name} src={nft.pictureUrl}></img>
				</div>
				<div className="col-lg-1"></div>
				<div style={{ marginBottom: "25%" }} className="col-lg-5 d-flex align-items-center">
					<div className="align-middle">
						<h3>{nft.name}</h3>
						<p>{nft.text}</p>
					</div>

				</div>
			</div>

			{/* <h6 style={{ width: "100%", marginTop: "10vh" }} className="strong text-center">policy: 123456.............yy123456</h6> */}
		</div>

	);
}
export default Collection
