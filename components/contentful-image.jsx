import { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

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
      className={cn(props.className, { isLoading })}
    />
  );
};

export default ContentfulImage;
