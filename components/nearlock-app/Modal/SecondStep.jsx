const SecondStep = ({ isDarkMode }) => {
  return (
    <div className="flex grow flex-row px-5">
      <div className="ml-10 -mr-10 flex w-[300px] flex-col items-center justify-center py-5 text-center">
        <h5>Now use your iPhone to finish setting up Near Lock</h5>
        <small className="w-3/4">Your data is encrypted and stored only on your devices</small>

        <svg
          width="63px"
          height="60px"
          viewBox="0 0 99 96"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="ml-12 mt-10"
        >
          <g
            transform="translate(-1169.000000, -893.000000)"
            fill={isDarkMode ? '#444' : '#A4A4A4'}
            fillRule="nonzero"
          >
            <g transform="translate(766.000000, 362.000000)">
              <g transform="translate(48.000000, 64.000000)">
                <g transform="translate(355.037500, 467.916406)">
                  <path d="M1.65000004,0 C2.56126989,0 3.30000007,0.738730179 3.30000007,1.65000004 C3.30000007,22.5683551 6.4871097,38.2050521 16.4028869,51.8968411 C29.8165113,70.4184869 54.0530236,81.0116808 92.0045832,81.5148111 L84.8739546,74.2622621 C84.272555,73.6507811 84.2448703,72.6894149 84.7853521,72.0457011 L84.8933493,71.9288902 C85.5048303,71.3274906 86.4661965,71.2998059 87.1099102,71.8402877 L87.2267211,71.9482849 L98.2886144,83.1956093 L87.2147058,94.2248866 C86.5690409,94.8679493 85.5243208,94.8658398 84.8812582,94.2201749 C84.2760227,93.6124903 84.2422893,92.6513173 84.7787099,92.0042154 L84.8859699,91.8867272 L91.9846439,84.8147444 C53.0413277,84.3003832 27.8115612,73.2761546 13.7301737,53.8324559 C7.95822535,45.8625008 4.2388088,36.7133585 2.15159172,26.4729888 C0.559817674,18.6633771 0,10.9892047 0,1.65000004 C0,0.738730179 0.738730179,0 1.65000004,0 Z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div className="relative flex items-end">
        <img src="./second-step.png" alt="" className="h-[400px] object-contain" />
      </div>
    </div>
  );
};

export default SecondStep;
