import { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { Container, Row, Col } from "reactstrap";
import RichText from "@madebyconnor/rich-text-to-jsx";
import { getContrast } from "./getContrast";
// import FsLightbox from "fslightbox-react";
import hexToRgbA from "./hexToRgba";
import { StickyContainer, Sticky } from "react-sticky";
import PostBody from "./post-body";
import Link from "next/link";
import { useRouter } from 'next/router';
import NearLockApp from "./nearlock-app/nearlock-app";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         display: "block",
//         background: "red",
//         bottom: "10px",
//         top: "unset"
//         postMessage
//       }}
//       onClick={onClick}
//     />
//   );
// }

export default function Section({
  backgroundColor = "#ffffff",
  title,
  description,
  gallery
}) {
  const router = useRouter();
  const { slug } = router.query;
  const [toggler, setToggler] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const sliderOptions = {
    infinite: true,
    slidesToShow: 6,
    dots: true,
    centerMode: true,
    initialSlide: 0,
    prevArrow: <div />,
    // nextArrow: <SampleNextArrow />,
    customPaging: function (i) {
      return (
        <span>
          <div
            className="owl-dot-el-1"
            style={{ backgroundColor: backgroundColor }}
          ></div>
          <div
            className="owl-dot-el-2"
            style={{ backgroundColor: backgroundColor }}
          ></div>
          <div
            className="owl-dot-el-3"
            style={{ backgroundColor: backgroundColor }}
          ></div>
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

  return (
    <StickyContainer>
      <Container
        fluid
        style={{
          backgroundColor,
          overflow: "hidden",
        }}
        className={`section px-md-0 ${getContrast(backgroundColor)} ${(title === "Near Lock" && slug === 'designs') ? 'pt-5' : 'py-5'}`}
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
                    className={`py-2 text-center ${isSticky ? "sticky" : ""}`}
                  >
                    <h2>{title}</h2>
                  </Container>
                </Col>
              </Row>
            </header>
          )}
        </Sticky>

        {/* <FsLightbox
          toggler={toggler}
          // sources={productsImages[productIndex]}
          key={productIndex}
        /> */}

        <Row className="pb-5">
          <Col md={12}>
            <Container fluid="lg" className="pb-4 text-center">
              {description && <PostBody content={description} />}
              {/* <RichText richText={description} /> */}
            </Container>
          </Col>

          <Col md={12}>
            {gallery?.map(({ fields: { title, type, images } }, i) => {
              return (
                <>
                  <Container><h3 className="text-center">{type}</h3></Container>
                  <Slider
                    {...sliderOptions}
                    infinite={images.length > 6 ? true : false}
                    className={type.replace(/ /g, "-").toLowerCase()}
                  >
                    {images?.map(({ fields: { file: { url, fileName } } }, i) => {
                      return (
                        <Link
                          href={`/designs?property=${fileName}`}
                          scroll={false}
                          key={i}
                        >
                          <img
                            src={url}
                            alt=""

                          // onClick={() => {
                          //   setToggler(!toggler);
                          //   setProductIndex(1);
                          // }}
                          />
                        </Link>
                      );
                    })}
                  </Slider>
                  {i !== gallery.length - 1 && <Container className="my-5"><hr className="m-0" /></Container>}
                </>
              );
            })}
          </Col>
        </Row>
        {/* render MacOS Nearlock app */}
        {(title === "Near Lock" && slug === 'designs') && (
          <Row className="nearlock-app-wrapper py-5 w-100">
            <Col md={12} className={"mt-2"}>
              <Container fluid="lg" className="pb-5 text-center text-white">
                Interactive preview of the Near Lock desktop app
                <br />
                <small style={{ color: 'hsla(0, 0%, 100%, .75)' }}>some of the features are not available yet</small>
              </Container>
            </Col>

            <Col md={12} className={"mb-5"}>
              <NearLockApp />
            </Col>
          </Row>
        )}
      </Container >
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
