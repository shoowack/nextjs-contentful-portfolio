import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPaperPlane,
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Label, Form, Input, Button } from "reactstrap";
import axios from "axios";

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [sentState, setSentState] = useState(false);
  const [errors, setErrors] = useState();
  const [form, setForm] = useState({
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    setIsLoading(true);

    axios({
      url: 'https://formspree.io/f/mqkngagb',
      method: 'post',
      headers: {
        'Accept': 'application/json'
      },
      data: form
    })
      .then(() => {
        setErrors(null);
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
      .catch(({ response }) => {
        setErrors(null);
        setIsLoading(true);
        setSentState(false);

        setTimeout(() => {
          setIsLoading(false);
          setSentState(true);
          setErrors(response.data.errors)

          setTimeout(() => {
            setSentState(false);
          }, 5000);
        }, 2000);
      }

      );

    e.preventDefault();
  };

  const handleChange = (e) => {
    setForm((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const { email, message } = form;

  return (
    <Container fluid className="footer">
      <Container>
        <Row>
          <Col sm={12}>
            <h2>Contact</h2>
          </Col>
          <Col sm={12}>
            <Form
              onSubmit={handleSubmit}
              className="pt-4 pb-4"
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
                    color={!errors && sentState ? "success" : "primary"}
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
                    ) : !errors && sentState ? (
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
                  {errors && (
                    <><p className="text-danger mb-0">Errors:</p>
                      {errors.map((error, i) => error.field ? <p key={i}><span className="text-capitalize">{error.field}</span>: {error.message}</p> : <p>{error.message}</p>)}
                    </>
                  )}
                  {!errors && sentState ? "Your message has been sent!" : <br />}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
