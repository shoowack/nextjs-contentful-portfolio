import cn from 'classnames';
import Image from 'next/legacy/image';
import { useState } from 'react';

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ContentfulImage = (props) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      loader={contentfulLoader}
      onLoadingComplete={() => setLoading(false)}
      {...props}
      // eslint-disable-next-line react/destructuring-assignment
      className={cn(props.className, { isLoading })}
    />
  );
};

export default ContentfulImage;
