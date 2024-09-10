"use client";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
    
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5">
        <Container>
          <h1>Reliable Maid Rental Services</h1>
          <p className="lead">
            Professional and trustworthy maid services at your convenience.
          </p>
          <Button variant="light" size="lg">
            Book Now
          </Button>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center">Our Services</h2>
          <Row className="mt-4">
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Flexible Scheduling</Card.Title>
                  <Card.Text>
                    Choose your preferred cleaning schedule that works best for
                    you.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Experienced Maids</Card.Title>
                  <Card.Text>
                    Our maids are highly trained and have years of experience.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Satisfaction Guarantee</Card.Title>
                  <Card.Text>
                    We ensure a clean home, or we'll make it right for free.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center">What Our Customers Say</h2>
          <Row className="mt-4">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    "The service is outstanding. My home is always spotless
                    after each visit."
                  </Card.Text>
                  <footer className="blockquote-footer">
                    Sarah, San Francisco
                  </footer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    "A reliable and convenient solution for busy individuals.
                    Highly recommend!"
                  </Card.Text>
                  <footer className="blockquote-footer">
                    Michael, New York
                  </footer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
}
