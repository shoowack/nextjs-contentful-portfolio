import {useState} from "react";
import PropTypes from "prop-types";
import {Container, Row, Col, Table} from "reactstrap";
import RichText from "@madebyconnor/rich-text-to-jsx";
import {getContrast} from "./getContrast";
import hexToRgbA from "./hexToRgba";
import {StickyContainer, Sticky} from "@dior/react-sticky";
// import Link from "next/link";
import {useRouter} from "next/router";
import NearLockApp from "./nearlock-app/NearLockApp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import ContentfulImage from "./contentful-image";
// import LightGallery from 'lightgallery/react';
// import { LightGallerySettings } from 'lightgallery/lg-settings';
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Navigation} from "swiper";
import StackIcons from "components/StackIcons";
import Link from "next/link";

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

const Section = ({
  backgroundColor = "#ffffff",
  title,
  description,
  gallery,
  stack,
  width
}) => {
  const router = useRouter();
  const {slug} = router.query;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (<StickyContainer>
    <section style={{
        backgroundColor
      }} className={`px-md-0 py-md-5 ${getContrast(backgroundColor)}`}>
      <Sticky topOffset={50}>
        {
          ({style, isSticky}) => (<header style={{
              ...style,
              backgroundColor: hexToRgbA(backgroundColor),
              zIndex: 1080, // above tooltips
              boxShadow: isSticky
                ? "0px 0px 20px -10px rgba(0,0,0,.3)"
                : "none",
              backdropFilter: "blur(10px)"
            }}>
            <Row>
              <Col md={12}>
                <Container fluid="lg" className={classnames({
                    ["sticky"]: isSticky
                  }, "py-2")}>
                  <Row>
                    {
                      isSticky && width > 550 && (slug === "apps-and-websites" || slug === "designs") && (<Col>
                        <Link href="/">
                          <a>
                            <FontAwesomeIcon icon={faAngleLeft} className="mr-1"/>
                            Home
                          </a>
                        </Link>
                      </Col>)
                    }
                    <Col>
                      <h2 className="align-self-center">{title}</h2>
                    </Col>
                    {
                      isSticky && width > 550 && (slug === "apps-and-websites" || slug === "designs") && (<Col className="text-right">
                        <Link href={slug === "designs"
                            ? "/apps-and-websites"
                            : "/designs"
}>
                          <a>
                            {
                              slug === "designs"
                                ? "Apps And Websites"
                                : "Designs"
                            }
                            <FontAwesomeIcon icon={faAngleRight} className="ml-1"/>
                          </a>
                        </Link>
                      </Col>)
                    }
                  </Row>
                </Container>
              </Col>
            </Row>
          </header>)
        }
      </Sticky>

      <Row className="pb-md-5">
        <Col md={12}>
          <Container fluid="lg" className="pb-4 text-center">
            {description && <RichText richText={description}/>}
          </Container>
          {
            stack && (<div>
              <Container>
                <h3 className="text-center mb-4">Stack</h3>
              </Container>
              <Container fluid="lg" className="pb-4 d-flex flex-column flex-md-row align-items-center justify-content-center" style={{
                  gap: "15px"
                }}>

                <ConditionalWrapper
                  condition={width < 768}
                  wrapper={(children) => (
                    <Table borderless className="m-0">
                      {children}
                    </Table>
                  )}
                >
                  {stack && (<StackIcons stack={stack} isMobile={width < 768} contrast={getContrast(backgroundColor) === "lighter"} section={title}/>)}
                </ConditionalWrapper>
              </Container>
            </div>)
          }
        </Col>

        <Col md={12}>
          {
            gallery
              ?.map(({
                fields: {
                  type,
                  images
                }
              }, i) => {
                const iphone = type === "iPhone";
                const website = type === "Website";
                const desktopApp = type === "Desktop App";
                const webApp = type === "Web App";
                const ipad = type === "iPad" || type === "iPad Landscape";

                return (<div key={`gallery-container-${i}`}>
                  {
                    !website || (!webApp && (<Container>
                      <h3 className="text-center mb-4">{type}</h3>
                    </Container>))
                  }

                  <Swiper spaceBetween={50} slidesPerView={website || desktopApp || webApp
                      ? 1
                      : iphone
                        ? width > 550
                          ? width > 991
                            ? width > 1200
                              ? width > 2200
                                ? width > 2600
                                  ? 6
                                  : 5
                                : 4
                              : 3
                            : 2
                          : 1
                        : ipad
                          ? width > 900
                            ? width > 1400
                              ? width > 2600
                                ? 4
                                : 3
                              : 2
                            : 1
                          : 3
} centeredSlides={true} pagination={{
                      dynamicBullets: true,
                      clickable: true,
                      renderBullet: (index, className) => `<span class="${className}"><div class="owl-dot-el-1" style="background-color:${backgroundColor}"></div><div class="owl-dot-el-2" style="background-color:${backgroundColor}"></div><div class="owl-dot-el-3" style="background-color:${backgroundColor}"></div></span>`
                    }} className={type.replace(/ /g, "-").toLowerCase()} navigation={true} modules={[Pagination, Navigation]} style={{
                      padding: website || desktopApp || webApp
                        ? width > 768
                          ? "0 20%"
                          : "0 15px"
                        : "0 40px"
                    }}>
                    {/* <LightGallery mode="lg-fade"> */}
                    {
                      images
                        ?.map(({
                          fields: {
                            file: {
                              url,
                              details: {
                                image: {
                                  width,
                                  height
                                }
                              }
                            }
                          }
                        }, i) => {
                          return (<SwiperSlide key={`gallery-slide-${i}`}>
                            {/* <a
                          data-lg-size={`${width}-${height}`}
                          className="gallery-item"
                          data-src={url}
                          data-sub-html="<h4>Photo by - <a href='https://ii.photography'>Ivan Suvak </a></h4><p>Location - Croatia</p>"
                        > */
                            }
                            <ContentfulImage
                              // quality={100}
                              src={url} alt="" height={height} width={width} layout="responsive"/>{" "}
                            {/* </a> */}
                          </SwiperSlide>);
                        })
                    }
                    {/* </LightGallery> */}
                  </Swiper>

                  {
                    i !== gallery.length - 1 && (<Container className="my-5">
                      <hr className="m-0"/>
                    </Container>)
                  }
                </div>);
              })
          }
        </Col>
      </Row>
    </section>
    {/* render MacOS Nearlock app */}
    {
      title === "Near Lock App" && slug === "designs" && (<Row className={classnames({
          ["dark"]: isDarkMode
        }, "nearlock-app-wrapper py-5 overflow-hidden")}>
        {
          width >= 1120 && (<button onClick={toggleDarkMode} className={classnames("nearlock-app-wrapper-theme-toggler", {dark: isDarkMode})}>
            <FontAwesomeIcon icon={isDarkMode
                ? faSun
                : faMoon} size="1x"/>
          </button>)
        }
        <Col md={12} className="my-2">
          <Container fluid="lg" className={`${width >= 1120 && "pb-5"} text-center lighter`}>
            <p className="mb-0">
              Interactive preview of the Near Lock desktop app
            </p>
            <small style={{
                color: "hsla(0, 0%, 100%, .75)"
              }}>
              {
                width >= 1120
                  ? "some of the features are not available yet"
                  : "for an interactive preview, please visit desktop version of the website"
              }
            </small>
          </Container>
        </Col>
        {
          width >= 1120 && (<Col md={12} className="mb-5">
            <NearLockApp isDarkMode={isDarkMode}/>
          </Col>)
        }
      </Row>)
    }
  </StickyContainer>);
};

Section.propTypes = {
  bgColor: PropTypes.string,
  layout: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.object,
  gallery: PropTypes.array
};

export default Section;