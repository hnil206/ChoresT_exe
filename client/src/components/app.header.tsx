'use client'
import { Container, Nav, Navbar, Button, Card, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header(){
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">Maid Rental</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Button>Home</Button>
              </Link>
              <Link href="/services" passHref>
                <Button>Services</Button>
              </Link>
              <Link href="/pricing" passHref>
                <Button>Pricing</Button>
              </Link>
              <Link href="/about" passHref>
                  <Button>About</Button>
              </Link>
            </Nav>
            <Button variant="outline-light">Book a Maid</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </div>
    )
}