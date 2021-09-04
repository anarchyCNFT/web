import React from "react";

export default function Rarities() {
    return (
        <div className="container">
            <div className="row text-center">
                <div className="col-lg-4">
                    <img style={{ width: "300px", height: "300px" }} src="/images/common.png" alt="Common" />
                    <h5>Common</h5>
                    <p>35% NFTs will be without a logo, on slightly white transparent frame. Keywords are white over black and can be on one of the sides. There is 14 frame variations for each design.</p>
                </div>
                <div className="col-lg-4">
                    <img style={{ width: "300px", height: "300px" }} src="/images/uncommon.png" alt="Uncommon" />
                    <h5>Uncommon</h5>
                    <p>25% NFTs will have a white logo on the picture, on slightly transparent white frame and keywords on one side. For each picture, there is 10 different Uncommon frames.</p>
                </div>
                <div className="col-lg-4">
                    <img style={{ width: "300px", height: "300px" }} src="/images/rare.png" alt="Rare" />
                    <h5>Rare</h5>
                    <p>17.5% Rare NFTs are in full yellow, slightly transparent frame. Keywords are at the bottom and there is 7 combinations for each design.</p>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-lg-4">
                    <img style={{ width: "300px", height: "300px" }} src="/images/super-rare.png" alt="Super Rare" />
                    <h5>Super Rare</h5>
                    <p>12.5% NFTs - Super Rare - on slightly transparent black background with black writing. Keywords are at the frame's bottom and for each picture there is 5 variations.</p>
                </div>
                <div className="col-lg-4">
                    <img style={{ width: "300px", height: "300px" }} src="/images/epic.png" alt="Epic" />
                    <h5>Epic</h5>
                    <p>7.5% NFTs are of Epic rarity with keywords at the bottom and only 3 frame variations for each design. Frame is slightly transparent purple with purple attachments.</p>
                </div>
                <div className="col-lg-4">
                    <img style={{ width: "300px", height: "300px" }} src="/images/legendary.png" alt="Legendary" />
                    <h5>Legendary</h5>
                    <p>2.5% Legendary NFTs - only one per design. All red, with 3 keywords at the bottom.</p>
                </div>
            </div>
        </div>
    )
}