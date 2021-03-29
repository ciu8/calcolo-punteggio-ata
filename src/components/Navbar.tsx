import React from 'react';

export default function Navbar() {
    return (
        
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                </a>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item">
                        Home
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">Punteggio ATA</a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                Come si calcola il punteggio
                            </a>
                            <a className="navbar-item">
                                Come funziona il calcolatore
                            </a>
                    </div>
                </div>
            </div>
            </div>
        </nav>
        
    )
}