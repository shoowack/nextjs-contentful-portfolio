import classnames from 'classnames';

export default function Container({ children, className }) {
  return <div className={classnames(className, 'mx-auto max-w-7xl px-4 sm:px-6')}>{children}</div>;
}
