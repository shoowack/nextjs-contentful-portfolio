import { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { Container, Row, Col } from "reactstrap";
import RichText from "@madebyconnor/rich-text-to-jsx";
import { getContrast } from "./getContrast";
import hexToRgbA from "./hexToRgba";
import { StickyContainer, Sticky } from "react-sticky";
import Link from "next/link";
import { useRouter } from 'next/router';
import NearLockApp from "./nearlock-app/NearLockApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

const PrevArrow = ({ className, style, onClick }) => (
  <div
    className="slick-prev"
    onClick={onClick}
  ><FontAwesomeIcon icon={faAngleLeft} size="1x" /></div>
);

const NextArrow = ({ className, style, onClick }) => (
  <div
    className="slick-next"
    onClick={onClick}
  ><FontAwesomeIcon icon={faAngleRight} size="1x" /></div>
);
export default function Section({
  backgroundColor = "#ffffff",
  title,
  description,
  gallery
}) {
  const router = useRouter();
  const { slug } = router.query;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const sliderOptions = {
    slidesToShow: 6,
    dots: true,
    centerMode: false,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    customPaging: (i) => {
      return (
        <span key={`gallery-dot-${i}`}>
          <div
            className="owl-dot-el-1"
            style={{ backgroundColor }}
          />
          <div
            className="owl-dot-el-2"
            style={{ backgroundColor }}
          />
          <div
            className="owl-dot-el-3"
            style={{ backgroundColor }}
          />
        </span>
      );
    },
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <StickyContainer>
      <section
        style={{ backgroundColor }}
        className={classnames(`px-md-0 ${getContrast(backgroundColor)}`, {
          ["py-5"]: !(title === "Near Lock" && slug === 'designs'),
          ["pt-5 pb-0"]: (title === "Near Lock" && slug === 'designs'),
        })}
      >
        <Sticky topOffset={50}>
          {({ style, isSticky }) => (
            <header
              style={{
                ...style,
                backgroundColor: hexToRgbA(backgroundColor),
                zIndex: 10,
                boxShadow: isSticky
                  ? "0px 0px 20px -10px rgba(0,0,0,.3)"
                  : "none",
                backdropFilter: "blur(10px)"
              }}
            >
              <Row>
                <Col md={12}>
                  <Container
                    fluid="lg"
                    className={classnames({ ["sticky"]: isSticky }, "py-2 text-center")}
                  >
                    <h2>{title}</h2>
                  </Container>
                </Col>
              </Row>
            </header>
          )}
        </Sticky>

        <Row className="pb-5">
          <Col md={12}>
            <Container fluid="lg" className="pb-4 text-center">
              {description && <RichText richText={description} />}
            </Container>
          </Col>

          <Col md={12}>
            {gallery?.map(({ fields: { type, images } }, i) => (
              <div key={`gallery-container-${i}`}>
                {type !== "Website" && <Container><h3 className="text-center">{type}</h3></Container>}
                <Slider
                  {...sliderOptions}
                  infinite={images.length > 6}
                  className={type.replace(/ /g, "-").toLowerCase()}
                >
                  {images?.map(({ fields: { file: { url, fileName } } }, i) => (
                    <Link
                      href={`/designs?property=${fileName}`}
                      scroll={false}
                      key={`slide-item-link-${i}`}
                    >
                      <img
                        src={url}
                        alt=""
                      />
                    </Link>
                  ))}
                </Slider>
                {i !== gallery.length - 1 && <Container className="my-5" key={`section-divider${i}`}><hr className="m-0" /></Container>}
              </div>
            ))}
          </Col>
        </Row>
        {/* render MacOS Nearlock app */}
        {(title === "Near Lock" && slug === 'designs') && (
          <Row className={classnames({
            ["dark"]: isDarkMode,
          }, "nearlock-app-wrapper py-5")}>
            <button onClick={toggleDarkMode} className={classnames("nearlock-app-wrapper-theme-toggler", {
              "dark": isDarkMode
            })}>
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="1x" />
            </button>
            <Col md={12} className="mt-2">
              <Container fluid="lg" className="pb-5 text-center section lighter">
                <p className="mb-0">Interactive preview of the Near Lock desktop app</p>
                <small style={{ color: 'hsla(0, 0%, 100%, .75)' }}>some of the features are not available yet</small>
              </Container>
            </Col>
            <Col md={12} className="mb-5">
              <NearLockApp isDarkMode={isDarkMode} />
            </Col>
          </Row>
        )}
      </section >
    </StickyContainer >
  );
}

Section.propTypes = {
  bgColor: PropTypes.string,
  layout: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.object,
  gallery: PropTypes.array
};
