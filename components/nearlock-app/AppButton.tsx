import classnames from 'classnames';
import { MouseEventHandler, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
};

const AppButton = ({ children, onClick, className, disabled }: Props) => (
  <button
    type="button"
    className={classnames(
      'rounded-md border-none px-5 py-0.5 text-[13px] shadow-[0_0_0_1px_hsla(0,0%,0%,0.05),0_1px_1px_0_hsla(0,0%,0%,0.15)] [transition:background_0.5s,color_0.5s]',
      className,
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default AppButton;
