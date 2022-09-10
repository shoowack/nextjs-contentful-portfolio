import Link from "next/link";
import HeaderInfoLink from "./header-info-link";
import {Container, Row, Col} from "reactstrap";

export default function Navigation({headerItems}) {
  return (<Container fluid="fluid" className="aboutme py-4 py-md-5">
    <Container fluid="lg">
      <Row>
        <Col sm={12}>
          <div className="d-flex flex-column flex-sm-row">
            <div className="d-flex align-items-center">
              <Link href="/">
                <img src="./back_arrow.svg" alt="Go back" className="back-button mr-4"/>
              </Link>
              <div className="d-flex align-items-center">
                <h1>Ivan Suvak Martinovic</h1>
              </div>
            </div>
            <div className="header-info-links ml-auto align-items-center">
              {
                headerItems
                  ?.map(headerLink => (<HeaderInfoLink {...headerLink} key={headerLink.sys.id}/>))
              }
            </div>
          </div>
        </Col>
        <Col sm={12}>
          <p className="mt-4">
            Front-End Web Designer, iOS and Android Mobile App Designer, UX/UI, WordPress, Photographer Currently in Ottawa, Canada, looking for a new and challenging position as a Front-end developer or UI/UX designer where I can create digital magic and elevate user experience to the next level.
            <br/>
            <br/>
            <strong>Working on a closed work permit in Canada</strong> and willing to relocate anywhere in Canada.
          </p>
        </Col>
      </Row>
    </Container>
  </Container>);
}