import { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import RichText from "@madebyconnor/rich-text-to-jsx";
import { getContrast } from "./getContrast";
import hexToRgbA from "./hexToRgba";
import { StickyContainer, Sticky } from '@dior/react-sticky'
// import Link from "next/link";
import { useRouter } from 'next/router';
import NearLockApp from "./nearlock-app/NearLockApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import ContentfulImage from './contentful-image'
// import LightGallery from 'lightgallery/react';
// import { LightGallerySettings } from 'lightgallery/lg-settings';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";


export default function Section({
  backgroundColor = "#ffffff",
  title,
  description,
  gallery
}) {
  const router = useRouter();
  const { slug } = router.query;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <StickyContainer>
      <section
        style={{ backgroundColor }}
        className={`px-md-0 py-5 ${getContrast(backgroundColor)}`}
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
            {gallery?.map(({ fields: { type, images } }, i) => {
              const website = type === "Website";
              const desktopApp = type === "Desktop App";

              return (
                <div key={`gallery-container-${i}`}>

                  {!website && <Container><h3 className="text-center mb-4">{type}</h3></Container>}
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={website || desktopApp ? 1 : type === "iPhone" ? 4 : 3}
                    centeredSlides={true}
                    pagination={{
                      dynamicBullets: true,
                      clickable: true,
                      renderBullet: function (index, className) {
                        return `<span class="${className}"><div class="owl-dot-el-1" style="background-color:${backgroundColor}"></div><div class="owl-dot-el-2" style="background-color:${backgroundColor}"></div><div class="owl-dot-el-3" style="background-color:${backgroundColor}"></div></span>`;
                      }
                    }}
                    className={type.replace(/ /g, "-").toLowerCase()}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    style={{ padding: website || desktopApp ? '0 20%' : '0 40px' }}
                  >

                    {images?.map(({ fields: { file: { url, fileName, details: {
                      image: { width, height }
                    } } } }, i) => {
                      return (

                        <SwiperSlide
                          key={`gallery-slide-${i}`}
                        >
                          {/* <LightGallery mode="lg-fade"> */}
                          {/* <a
                          data-lg-size={`${width}-${height}`}
                          className="gallery-item"
                          data-src={url}
                          data-sub-html="<h4>Photo by - <a href='https://ii.photography'>Ivan Suvak </a></h4><p>Location - Croatia</p>"
                        > */}
                          <ContentfulImage
                            // quality={75}
                            src={url}
                            alt=""
                            height={height}
                            width={width}
                            layout="responsive"
                            className={classnames({
                              ["w-auto"]: images.length === 1,
                              ["mx-auto"]: images.length === 1,
                            })}
                          />
                          {/* </a> */}
                          {/* </LightGallery> */}
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>

                  {i !== gallery.length - 1 && <Container className="my-5"><hr className="m-0" /></Container>}
                </div>
              )
            })}
          </Col>
        </Row>
      </section >
      {/* render MacOS Nearlock app */}
      {
        (title === "Near Lock App" && slug === 'designs') && (
          <Row className={classnames({
            ["dark"]: isDarkMode,
          }, "nearlock-app-wrapper py-5 overflow-hidden")}>
            <button onClick={toggleDarkMode} className={classnames("nearlock-app-wrapper-theme-toggler", {
              "dark": isDarkMode
            })}>
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="1x" />
            </button>
            <Col md={12} className="mt-2">
              <Container fluid="lg" className="pb-5 text-center lighter">
                <p className="mb-0">Interactive preview of the Near Lock desktop app</p>
                <small style={{ color: 'hsla(0, 0%, 100%, .75)' }}>some of the features are not available yet</small>
              </Container>
            </Col>
            <Col md={12} className="mb-5">
              <NearLockApp isDarkMode={isDarkMode} />
            </Col>
          </Row>
        )
      }
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
