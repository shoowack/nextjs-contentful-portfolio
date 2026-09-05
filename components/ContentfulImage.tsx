import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ContentfulImage = (props) => {
  const [isLoading, setLoading] = useState(true);

  return (
    // alt is always supplied by callers via the props spread below; eslint's
    // static analysis can't see through the spread to confirm that.
    // eslint-disable-next-line jsx-a11y/alt-text
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
