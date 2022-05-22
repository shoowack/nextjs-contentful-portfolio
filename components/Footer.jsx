import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPaperPlane, faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Label,
  Form,
  Input,
  Button
} from "reactstrap";
import axios from "axios";

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [sentState, setSentState] = useState(false);
  const [errors, setErrors] = useState();
  const [form, setForm] = useState({email: "", message: ""});

  const handleSubmit = e => {
    setIsLoading(true);

    axios({
      url: "https://formspree.io/f/mqkngagb",
      method: "post",
      headers: {
        Accept: "application/json"
      },
      data: form
    }).then(() => {
      setErrors(null);
      setIsLoading(true);
      setSentState(false);

      setTimeout(() => {
        setIsLoading(false);
        setForm({email: "", message: ""});

        setSentState(true);

        setTimeout(() => {
          setSentState(false);
        }, 5000);
      }, 2000);
    }).catch(({response}) => {
      setErrors(null);
      setIsLoading(true);
      setSentState(false);

      setTimeout(() => {
        setIsLoading(false);
        setSentState(true);
        setErrors(response.data.errors);

        setTimeout(() => {
          setSentState(false);
        }, 5000);
      }, 2000);
    });

    e.preventDefault();
  };

  const handleChange = e => {
    setForm(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const {email, message} = form;

  return (<Container fluid="fluid" className="footer">
    <Container>
      <Row>
        <Col sm={12}>
          <h2>Contact</h2>
        </Col>
        <Col sm={12}>
          <Form onSubmit={handleSubmit} className="pt-4 pb-4">
            <Row className="mt-2">
              <Col sm={6} className="text-sm-right">
                <Label className="ml-2">Your Email:</Label>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4}>
                <Input type="email" name="email" required="required" placeholder="email@domain.com" value={email} onChange={e => handleChange(e)} disabled={isLoading}/>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={6} className="text-sm-right">
                <Label className="ml-2">Your Message:</Label>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4}>
                <textarea rows={3} required="required" name="message" className="form-control" value={message} onChange={e => handleChange(e)} disabled={isLoading}></textarea>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={{
                  offset: 6,
                  size: 4
                }}>
                <Button color={!errors && sentState
                    ? "success"
                    : "primary"} disabled={isLoading}>
                  {
                    isLoading
                      ? (<div>
                        Sending
                        <FontAwesomeIcon icon={faCircleNotch} size="sm" spin="spin" className="ml-2"/>
                      </div>)
                      : !errors && sentState
                        ? (<div>
                          Sent
                          <FontAwesomeIcon icon={faCheck} size="sm" className="ml-2"/>
                        </div>)
                        : (<div>
                          Send
                          <FontAwesomeIcon icon={faPaperPlane} size="sm" className="ml-2"/>
                        </div>)
                  }
                </Button>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={{
                  offset: 6,
                  size: 4
                }}>
                {
                  errors && (<div>
                    <p className="text-danger mb-0">Errors:</p>
                    {
                      errors.map(
                        (error, i) => error.field
                        ? (<p key={i}>
                          <span className="text-capitalize">
                            {error.field}
                          </span>
                          : {error.message}
                        </p>)
                        : (<p>{error.message}</p>))
                    }
                  </div>)
                }
                {
                  !errors && sentState
                    ? ("Your message has been sent!")
                    : (<br/>)
                }
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  </Container>);
}
