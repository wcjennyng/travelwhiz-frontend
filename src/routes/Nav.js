import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Collapse,
    NavbarToggler,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon } from '@fortawesome/free-solid-svg-icons'
import UserContext from '../auth/UserContext'

import './Nav.css'

//Navigation bar for website. Displays when logged in
//All links are accessible when logged in
//When not logged in or new user, shows Login and Signup

function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(true)

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    
    const loggedInNav = () => {
        return (
            <div>
            <Navbar color="faded" fixed="top" expand="md" >

                <NavbarBrand href="/" className="navbar-brand">
                    <FontAwesomeIcon icon={faDragon}/> TravelWhiz 
                </NavbarBrand>
                <NavbarToggler style={{border: '2px solid black', borderRadius: '5px'}} className="navbarToggler" onClick={toggle} />
                <Collapse isOpen={!isOpen} navbar>
                    <Nav className="ms-auto navbar-items" navbar>
                        <NavItem>
                            <NavLink to="/map">Map</NavLink>
                        </NavItem>
                        
                        <UncontrolledDropdown nav inNavbar >
                            <DropdownToggle className="dropdown" style={{color: 'black'}} nav caret>
                                Signed in as {currentUser.firstName || currentUser.username}
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem>
                                    <NavItem>
                                        <NavLink to="/saved">Saved</NavLink>
                                    </NavItem>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavItem>
                                        <NavLink to="/profile">Profile</NavLink>
                                    </NavItem>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <NavItem>
                                        <NavLink to="/" onClick={logout}>
                                            Log out
                                        </NavLink>
                                    </NavItem>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar >
        </div>
        )
    }

    const loggedOutNav = () => {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <a href="/" className="navbar-brand-out">
                    <FontAwesomeIcon icon={faDragon}/> TravelWhiz
                    </a>
                </nav>

            </div>
        )
    }

    return (
        <>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </>
    )
}

export default NavBar;