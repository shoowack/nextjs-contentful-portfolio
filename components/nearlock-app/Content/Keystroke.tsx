import { NearLockAppType } from '@interfaces/nearlock-app';
import classnames from 'classnames';

type Props = {
  children: React.ReactNode;
  className: string;
  isDarkMode: NearLockAppType['isDarkMode'];
};

const Keystroke: React.FC<Props> = ({ children, className, isDarkMode }) => (
  <div
    className={classnames(
      'inline rounded-[10px] px-[8px] py-[5px] text-[11px] uppercase ring-[1.5px] [transition:box-shadow_0.5s]',
      className,
      isDarkMode ? 'ring-[#666666]' : 'ring-[#d9d9d9]',
    )}
  >
    {children}
  </div>
);

export default Keystroke;
