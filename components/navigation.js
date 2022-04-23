import Link from 'next/link'
import HeaderInfoLink from "./header-info-link";
// import backIcon from "./../img/back_arrow.svg";
import { Container, Row, Col } from "reactstrap";

export default function Navigation({ headerItems }) {
  return (
    <Container fluid className="aboutme py-5">
      <Container fluid="lg">
        <Row>
          <Col sm={12}>
            <div className="d-flex align-items-center">
              {/* <Link className="back-button mr-4" href="/"> */}
              {/* <img src={backIcon} alt="Go back" /> */}
              {/* </Link> */}
              <div className="mr-auto">
                <h1>Ivan Suvak Martinovic</h1>
              </div>
              <div className="header-info-links">
                {headerItems?.map((headerLink) => <HeaderInfoLink {...headerLink} key={headerLink.sys.id} />)}
              </div>
            </div>
          </Col>
          <Col sm={12}>
            <p className="mt-4">
              Front-End Web Designer, iOS and Android Mobile App Designer,
              UX/UI, WordPress, Photographer Currently in Montréal, Canada,
              looking for a new and challenging position as a Front-end
              developer or UI/UX designer where I can create digital magic and
              elevate user experience to the next level.
              <br />
              <br />
              <strong>Working on a closed work permit in Canada</strong> and
              willing to relocate anywhere in Canada.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}