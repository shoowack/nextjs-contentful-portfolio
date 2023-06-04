import type ContainerType from '@interfaces/container';
import classnames from 'classnames';

const Container: React.FC<ContainerType> = ({ children, className, style }: ContainerType) => (
  <div className={classnames(className, 'mx-auto max-w-7xl px-4 sm:px-6')} style={style}>
    {children}
  </div>
);

export default Container;
