import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPaperPlane,
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Label, Form, Input, Button } from "reactstrap";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [sentState, setSentState] = useState(false);
  const [form, setForm] = useState({
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    setIsLoading(true);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact-me", ...form })
    })
      .then(() => {
        setIsLoading(true);
        setSentState(false);

        setTimeout(() => {
          setIsLoading(false);
          setForm({
            email: "",
            message: ""
          });

          setSentState(true);

          setTimeout(() => {
            setSentState(false);
          }, 5000);
        }, 2000);
      })
      .catch((error) => alert(error));

    e.preventDefault();
  };

  const handleChange = (e) => {
    setForm((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const { email, message } = form;

  return (
    <div className="footer container-fluid">
      <Container>
        <Row>
          <Col sm={12}>
            <h2>Contact</h2>
          </Col>
          <Col sm={12}>
            <Form
              onSubmit={handleSubmit}
              className="pt-4 pb-4"
              data-netlify-recaptcha="true"
            >
              <Row className="mt-2">
                <Col sm={6} className=" text-right">
                  <Label className="ml-2">Your Email:</Label>
                </Col>
                <Col sm={4}>
                  <Input
                    type="email"
                    name="email"
                    required
                    placeholder="email@domain.com"
                    value={email}
                    onChange={(e) => handleChange(e)}
                    disabled={isLoading}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col sm={6} className=" text-right">
                  <Label className="ml-2">Your Message:</Label>
                </Col>

                <Col sm={4}>
                  <textarea
                    rows={3}
                    required
                    name="message"
                    className="form-control"
                    value={message}
                    onChange={(e) => handleChange(e)}
                    disabled={isLoading}
                  ></textarea>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col sm={{ offset: 6, size: 4 }}>
                  <Button
                    color={sentState ? "success" : "primary"}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        Sending
                        <FontAwesomeIcon
                          icon={faCircleNotch}
                          size="sm"
                          spin
                          className="ml-2"
                        />
                      </>
                    ) : sentState ? (
                      <>
                        Sent
                        <FontAwesomeIcon
                          icon={faCheck}
                          size={"sm"}
                          className={"ml-2"}
                        />
                      </>
                    ) : (
                      <>
                        Send
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          size={"sm"}
                          className={"ml-2"}
                        />
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col sm={{ offset: 6, size: 4 }}>
                  {sentState ? "Your message has been sent!" : <br />}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
