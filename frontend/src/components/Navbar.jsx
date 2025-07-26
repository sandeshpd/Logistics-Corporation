import React from "react";
import { Button, Link } from "@chakra-ui/react";
import "../css/Navbar.css";

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    {/* <Link href="/home" className="navbar-brand">
                        DalanValan
                    </Link> */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/register">
                                <Button
                                    className="nav-link register-btn"
                                    variant="outline"
                                    border="1px solid #000"
                                    px=".7em"
                                >
                                    Register
                                </Button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/login">
                                <Button
                                    className="nav-link login-btn"
                                    variant="outline"
                                    backgroundColor="#333"
                                    color="white"
                                    px=".7em"
                                >
                                    Log In
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;