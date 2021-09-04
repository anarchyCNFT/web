import { useState, useEffect } from "react"
import React from "react"

function Nav() {
    const [scrolling, setScrolling] = useState(false)
    const [scrollTop, setScrollTop] = useState(0)

    useEffect(() => {
        const onScroll = e => {
            setScrollTop(e.target.documentElement.scrollTop);
            setScrolling(e.target.documentElement.scrollTop > scrollTop)
        }
        window.addEventListener("scroll", onScroll)
    
        return () => window.removeEventListener("scroll", onScroll)
    }, [scrollTop])

    let navClassName = "navbar navbar-dark navbar-expand-lg sticky-top header-a"

    if(scrolling) navClassName += " navbar-transparent-blck"

    return (
        <nav className={navClassName}>
            <div className="container nav-container">
                <div style={{maxWidth: "250px"}}>
                    <svg style={{position: "absolute"}} xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75" fill="none">
                        <path d="M28.4337 5H25.4516H28.4337ZM28.4337 5L13.5232 47.7102L25.4516 5H28.4337ZM28.4337 5L29.7848 8.47641L28.4337 5ZM25.4516 5L43.2091 44.7304L25.4516 5ZM22.9665 10.4629C-4.86647 21.1901 5.73656 35.1289 14.5172 40.7574C20.3914 44.0682 34.3535 49.4981 43.2091 44.7304L22.9665 10.4629ZM43.2091 44.7304L48.3144 56.1529L43.875 44.7304H43.2091ZM29.7848 8.47641L43.875 44.7304L29.7848 8.47641ZM29.7848 8.47641C29.3391 8.52159 28.8881 8.56732 28.4337 8.61343L29.7848 8.47641ZM29.7848 8.47641L28.4337 8.61343L29.7848 8.47641ZM43.875 44.7304C54.6325 31.1558 67.1017 4.90067 30.9188 8.47641C-4.16677 11.9437 13.9043 10.0876 28.4337 8.61343L43.875 44.7304ZM12.5291 28.3416L48.3144 15.9259L17.0023 28.3416H12.5291Z" stroke="#FF0000" strokeWidth="4"/>
                    </svg>
                    <a className="navbar-brand brand anarchy-logo" href="#root">anarchyCNFT</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse alink" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#root">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#Collection">Collection</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#Rarities" >Rarities</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#roadmap">Roadmap</a>
                        </li>
                        <a className="btn btn-outline-dark start" href="#buy">Buy</a>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;