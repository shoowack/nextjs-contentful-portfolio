import Link from 'next/link';
import Container from '@components/Container';
import HeaderInfoLink from '@components/header-info-link';

export default function Navigation({ headerItems }) {
  return (
    <div className="aboutme py-md-5 py-4">
      <Container>
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex items-center justify-between">
            <Link href="/" passHref legacyBehavior>
              <a className="logo flex flex-row items-center p-0">
                <img
                  src="./back_arrow.svg"
                  alt="Go back"
                  className="back-button h-10 w-10 rounded"
                />
                <svg
                  width="109px"
                  height="40px"
                  viewBox="0 0 109 40"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>Combined Shape</title>
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <path
                      d="M103.024,20.895 L97.5623051,40 L83.3173293,40 L88.78,20.895 L103.024,20.895 Z M85.228,20.895 L73.3268724,40 L63.8435797,40 L63.477,20.895 L85.228,20.895 Z M61.749,20.895 L57.8516237,22.5479737 C56.6437522,23.0601004 55.7292088,24.0869105 55.3597304,25.3457644 L53.6261229,31.2523586 C51.872397,37.0841195 48.5910292,40 43.7820196,40 L0.0806383475,40 L3.80576066,26.9724718 C4.34876585,25.0734697 3.55303841,23.0460359 1.86332192,22.0233326 L0,20.895 L19.787,20.895 L16.3169894,33.0348259 L37.409268,33.0348259 C38.2793736,33.0348259 39.0485946,32.4695533 39.3084782,31.6391653 L40.7457556,27.046733 C40.9427189,26.4173901 40.5922059,25.7475366 39.962863,25.5505734 C39.8474318,25.5144473 39.7271817,25.4960697 39.6062295,25.4960697 L23.7175966,25.4960697 C22.1788928,25.4960697 20.9315269,24.2487038 20.9315269,22.71 C20.9315269,22.4679453 20.9630711,22.2269227 21.0253625,21.9930205 L21.317,20.895 L61.749,20.895 Z M25.763309,0 L20.3,19.104 L6.055,19.104 L11.5183332,0 L25.763309,0 Z M76.7734239,0 L77.138,19.104 L63.443,19.104 L63.2112409,6.96517413 L40.8309396,6.96517413 C39.9456439,6.96517413 39.166793,7.54999707 38.9198663,8.40015921 L37.9847995,11.6195699 C37.8008673,12.2528439 38.1651307,12.9153204 38.7984047,13.0992527 C38.9036366,13.1298169 39.012575,13.1457497 39.1221523,13.1466024 L53.3228947,13.257107 C55.5209764,13.2742117 57.2890077,15.069975 57.2719031,17.2680567 C57.2693417,17.5972164 57.2259566,17.9247872 57.1427417,18.2432648 L56.917,19.104 L21.794,19.104 L25.1043682,6.67649023 C26.1482259,2.75683967 29.696332,0.0282817947 33.752598,0.025844973 L76.7734239,0 Z M109,0 L105.26167,13.0737191 C104.723922,14.9543331 105.498862,16.96349 107.16018,17.9959161 L108.944,19.104 L89.292,19.104 L91.7940672,10.3552239 L86.344,19.104 L79.556,19.104 L91.4603489,0 L109,0 Z"
                      id="logo"
                    />
                  </g>
                </svg>
              </a>
            </Link>
          </div>
          <div className="header-info-links mt-2 flex items-center justify-end">
            {headerItems?.map((headerLink) => (
              <HeaderInfoLink {...headerLink} key={headerLink.sys.id} />
            ))}
          </div>
        </div>
        <p className="mt-4">
          Ivan Suvak Martinovic, Front-End Web Designer, iOS and Android Mobile App Designer, UX/UI,
          WordPress, Photographer Currently in Ottawa, Canada, looking for a new and challenging
          position as a Front-end developer or UI/UX designer where I can create digital magic and
          elevate user experience to the next level.
        </p>
        <p className="mt-4">
          <strong>Closed work permit holder</strong> willing to relocate anywhere in Canada.
        </p>
      </Container>
    </div>
  );
}
