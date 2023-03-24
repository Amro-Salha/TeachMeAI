import React, {Fragment} from 'react'
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavLink, NavDropdown } from "react-bootstrap";
import logo from '../assets/img/logo.png';
import  Register  from './Account/Register'
import Login from "./Account/Login";
import {connect} from 'react-redux'
import {logout} from '../actions/auth'

const NavBar = ({logout, isAuthenticated}) => {

  const [scrolled, setScrolled] = useState(false);
  const [displaySignUp, setDisplaySignUp] = useState(false)
  const [displayLogin, setDisplayLogin] = useState(false)


  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const guestLinks = () => (
    <Fragment>
      <span className="navbar-text">
        <button onClick={() => {(displayLogin && !displaySignUp) || (!displayLogin && displaySignUp) ? setDisplayLogin(false) : setDisplayLogin(true)}} className="vvd"><span>Log In</span></button>
      </span>
      <div className={ displayLogin ? 'register-widget' : 'hide' }>
        <Login />
      </div>

      <span className="navbar-text">
        <button onClick={() => {(displaySignUp && !displayLogin) || (!displaySignUp && displayLogin) ? setDisplaySignUp(false) : setDisplaySignUp(true)}} className="vvd"><span>Sign Up</span></button>
      </span>
      <div className={ displaySignUp ? 'register-widget' : 'hide' }>
        <Register />
      </div>
    </Fragment>

  )

  const authLinks = () => (
    <Fragment>

      <NavDropdown title="Curriculums" className='active navbar-link' bg='dark' style={{color: 'white', fontSize: '18px', margin: 'auto'}}>
        <NavDropdown.Item href="#action/3.1">
          <NavLink href="/curriculums/curriculum-bot" style={{color: 'black', fontSize: '14px', margin: 'auto'}}>Curriculum Bot</NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          <NavLink href="/curriculums/curriculum-list" style={{color: 'black', fontSize: '14px', margin: 'auto'}}>My Curriculums</NavLink>
        </NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Practice" className='active navbar-link' bg='dark' style={{color: 'white', fontSize: '18px', margin: 'auto'}}>
        <NavDropdown.Item href="#action/3.1">
          <NavLink href="/practice/practice-bot" style={{color: 'black', fontSize: '14px', margin: 'auto'}}>Practice Bot</NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          <NavLink href="/practice/practice-list" style={{color: 'black', fontSize: '14px', margin: 'auto'}}>Practice List</NavLink>
        </NavDropdown.Item>
      </NavDropdown>

      <NavLink href="/hints" className='navbar-link' bg='dark' style={{color: 'white', fontSize: '18px', margin: 'auto'}}>Hint Bot</NavLink>

      <span className="navbar-text">
        <button onClick={logoutHandler} className="vvd"><span>Log Out</span></button>
      </span>

      <div className={ displayLogin ? 'register-widget' : 'hide' }>
        <Login />
      </div>
    </Fragment>
  )

  const logoutHandler = () => {
    logout();
    window.location.reload()
  }

  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""} variant='dark'>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink href="/" className='navbar-link' style={{color: 'white', fontSize: '18px', margin: 'auto'}} >Home</NavLink>



            {isAuthenticated ? authLinks() : guestLinks()}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(NavBar)
