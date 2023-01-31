import classnames from 'classnames';

export default function Container({ children, className, style }) {
  return (
    <div className={classnames(className, 'mx-auto max-w-7xl px-4 sm:px-6')} style={style}>
      {children}
    </div>
  );
}
