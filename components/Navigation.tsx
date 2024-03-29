import Container from '@components/Container';
import HeaderInfoLink from '@components/HeaderInfoLink';
import ThemeSwitch from '@components/ThemeSwitch';
import { HeaderItemsType } from '@interfaces/header-items';
import Link from 'next/link';
import { MutableRefObject, useEffect, useState } from 'react';

type Props = {
  headerItems: HeaderItemsType[];
  aboutSectionRef: MutableRefObject<HTMLDivElement>;
};

const Navigation: React.FC<Props> = ({ headerItems, aboutSectionRef }) => {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="aboutme py-2 pb-5 text-black dark:text-white md:py-5 md:pb-10 xl:pb-14"
      ref={aboutSectionRef}
    >
      <Container>
        <div className="mb-5 flex flex-row justify-between">
          <div className="flex w-[55px] items-center justify-between">
            <Link
              href="/"
              className="group flex origin-[left_50%] scale-50 flex-row items-center p-0 sm:scale-75 md:scale-100 md:hover:w-[200px]"
            >
              <svg
                width="20px"
                height="17px"
                viewBox="0 0 20 17"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="h-10 w-0 rotate-180 rounded opacity-0 [transition:opacity_1s,width_0.5s,padding_1s,margin_0.1s,transform_0.25s] group-hover-[.logo]:mr-3 group-hover-[.logo]:rotate-0 group-hover-[.logo]:ease-[cubic-bezier(0.175,0.885,0.32,1.275)] md:group-hover-[.logo]:w-10 md:group-hover-[.logo]:p-2 md:group-hover-[.logo]:opacity-50"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path
                    d="M0.984902428,7.46563257 L7.56228469,0.557912799 C7.94363354,0.157411361 8.57744844,0.141885128 8.97794988,0.523233986 C9.26876666,0.800143475 9.36602664,1.22400506 9.22502638,1.6 L8.104864,4.58705401 C7.84306833,5.28516512 8.19677187,6.06332331 8.89488298,6.32511897 C8.99670696,6.36330355 9.10277176,6.38904487 9.21077138,6.40178329 L18.1591106,7.45722843 C18.7350174,7.5251559 19.1468161,8.04708673 19.0788886,8.62299357 C19.0219843,9.10544334 18.6415604,9.48586724 18.1591106,9.54277157 L9.21077138,10.5982167 C8.47031974,10.685552 7.94086436,11.3566059 8.02819968,12.0970576 C8.04093809,12.2050572 8.06667942,12.311122 8.104864,12.412946 L9.22502638,15.4 C9.41920639,15.9178054 9.15685614,16.4949837 8.6390507,16.6891637 C8.26305576,16.830164 7.83919418,16.732904 7.56228469,16.4420872 L0.984902428,9.53436743 C0.433324725,8.9550877 0.433324725,8.0449123 0.984902428,7.46563257 Z"
                    className="fill-black dark:fill-white"
                  />
                </g>
              </svg>
              <svg
                width="109px"
                height="40px"
                viewBox="0 0 109 40"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path
                    d="M103.024,20.895 L97.5623051,40 L83.3173293,40 L88.78,20.895 L103.024,20.895 Z M85.228,20.895 L73.3268724,40 L63.8435797,40 L63.477,20.895 L85.228,20.895 Z M61.749,20.895 L57.8516237,22.5479737 C56.6437522,23.0601004 55.7292088,24.0869105 55.3597304,25.3457644 L53.6261229,31.2523586 C51.872397,37.0841195 48.5910292,40 43.7820196,40 L0.0806383475,40 L3.80576066,26.9724718 C4.34876585,25.0734697 3.55303841,23.0460359 1.86332192,22.0233326 L0,20.895 L19.787,20.895 L16.3169894,33.0348259 L37.409268,33.0348259 C38.2793736,33.0348259 39.0485946,32.4695533 39.3084782,31.6391653 L40.7457556,27.046733 C40.9427189,26.4173901 40.5922059,25.7475366 39.962863,25.5505734 C39.8474318,25.5144473 39.7271817,25.4960697 39.6062295,25.4960697 L23.7175966,25.4960697 C22.1788928,25.4960697 20.9315269,24.2487038 20.9315269,22.71 C20.9315269,22.4679453 20.9630711,22.2269227 21.0253625,21.9930205 L21.317,20.895 L61.749,20.895 Z M25.763309,0 L20.3,19.104 L6.055,19.104 L11.5183332,0 L25.763309,0 Z M76.7734239,0 L77.138,19.104 L63.443,19.104 L63.2112409,6.96517413 L40.8309396,6.96517413 C39.9456439,6.96517413 39.166793,7.54999707 38.9198663,8.40015921 L37.9847995,11.6195699 C37.8008673,12.2528439 38.1651307,12.9153204 38.7984047,13.0992527 C38.9036366,13.1298169 39.012575,13.1457497 39.1221523,13.1466024 L53.3228947,13.257107 C55.5209764,13.2742117 57.2890077,15.069975 57.2719031,17.2680567 C57.2693417,17.5972164 57.2259566,17.9247872 57.1427417,18.2432648 L56.917,19.104 L21.794,19.104 L25.1043682,6.67649023 C26.1482259,2.75683967 29.696332,0.0282817947 33.752598,0.025844973 L76.7734239,0 Z M109,0 L105.26167,13.0737191 C104.723922,14.9543331 105.498862,16.96349 107.16018,17.9959161 L108.944,19.104 L89.292,19.104 L91.7940672,10.3552239 L86.344,19.104 L79.556,19.104 L91.4603489,0 L109,0 Z"
                    className="fill-black dark:fill-white"
                  />
                </g>
              </svg>
            </Link>
          </div>
          <div className="mt-2 flex flex-row">
            <ThemeSwitch />
            {headerItems.map(
              (link, i) =>
                link.contentfulMetadata.tags.some((tags) => tags.name === process.env.NODE_ENV) && (
                  <HeaderInfoLink
                    {...link}
                    i={i}
                    linksLength={headerItems.length}
                    key={link.sys.id}
                  />
                ),
            )}
          </div>
        </div>
        <p>
          Ivan Suvak Martinovic, Front-End Web Designer, iOS and Android Mobile App Designer, UX/UI,
          WordPress, Photographer Currently in Ottawa, Canada, looking for a new and challenging
          position as a Front-end developer or UI/UX designer where I can create digital magic and
          elevate user experience to the next level.
        </p>
        <p className="mb-0">
          <strong>Closed work permit holder</strong> willing to relocate anywhere in Canada.
        </p>
      </Container>
    </div>
  );
};

export default Navigation;
