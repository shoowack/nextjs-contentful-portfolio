import { NearLockAppType } from '@interfaces/nearlock-app';

type Props = Pick<NearLockAppType, 'owner' | 'device'>;

const FirstStep: React.FC<Props> = ({ owner, device }) => (
  <div className="flex grow flex-col justify-center p-5 text-center">
    <svg
      className="mx-auto my-5"
      width="102px"
      height="100px"
      viewBox="0 0 102 187"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-1757.000000, -739.000000)" fill="#000000" fillRule="nonzero">
          <path
            d="M1839,739 C1850.04569,739 1859,747.954305 1859,759 L1859,906 C1859,917.045695 1850.04569,926 1839,926 L1777,926 C1765.95431,926 1757,917.045695 1757,906 L1757,759 C1757,747.954305 1765.95431,739 1777,739 L1839,739 Z M1839,746 L1777,746 C1769.8203,746 1764,751.820298 1764,759 L1764,906 C1764,913.179702 1769.8203,919 1777,919 L1839,919 C1846.1797,919 1852,913.179702 1852,906 L1852,759 C1852,751.820298 1846.1797,746 1839,746 Z M1827,909 C1828.10457,909 1829,909.895431 1829,911 C1829,912.104569 1828.10457,913 1827,913 L1789,913 C1787.89543,913 1787,912.104569 1787,911 C1787,909.895431 1787.89543,909 1789,909 L1827,909 Z M1818.5,752 C1821.53757,752 1824,754.462434 1824,757.5 C1824,760.537566 1821.53757,763 1818.5,763 L1797.5,763 C1794.46243,763 1792,760.537566 1792,757.5 C1792,754.462434 1794.46243,752 1797.5,752 L1818.5,752 Z"
            className="[transition:fill_0.5s]"
            fill="#368EFC"
          />
        </g>
      </g>
    </svg>
    <h5>
      {owner}’s {device}
      <br />
      wants to connect
    </h5>
  </div>
);

export default FirstStep;
