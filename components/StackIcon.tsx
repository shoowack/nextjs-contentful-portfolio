import ContentfulImage from '@components/ContentfulImage';
import { Popover, Transition } from '@headlessui/react';
import { urlForImage } from '@sanity/lib/image';
import { useTheme } from 'next-themes';
import { Fragment, useEffect, useState } from 'react';

type Props = {
  name: string;
  logo: { asset: { _type: string; _ref: string }; alt?: string };
  isMobile: boolean;
};

const StackIcon: React.FC<Props> = ({
  name,
  // darkLogo: {
  //   fields: {
  //     file: { url: darkLogoUrl },
  //   },
  // },
  // lightLogo: {
  //   fields: {
  //     file: { url: lightLogoUrl },
  //   },
  // },
  logo,
  isMobile,
}) => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const imgUrl = urlForImage(logo).url();

  // eslint-disable-next-line consistent-return
  return isMobile ? (
    <tr>
      <td className="text-right">
        <div className="relative h-7 w-7">
          <ContentfulImage
            quality={100}
            fill
            aria-hidden
            // src={currentTheme === 'light' ? darkLogoUrl : lightLogoUrl}
            src={imgUrl}
            alt={name}
            className="inline object-contain"
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
            sizes="(max-width: 768px) 20vw, 10vw"
          />
        </div>
      </td>
      <td>
        <p className="m-0 text-left text-[#333333] dark:text-[#eeeeee]">{name}</p>
      </td>
    </tr>
  ) : (
    <Popover className="relative">
      <div className="relative mx-2 h-8 w-8">
        {/* <Image src={imgUrl} className="" loader={loader} fill alt={logo?.alt} /> */}
        {/* <img src={imgUrl} className="" alt={logo?.alt} /> */}
        <ContentfulImage
          quality={100}
          aria-hidden
          // src={currentTheme === 'light' ? darkLogoUrl : lightLogoUrl}
          src={imgUrl}
          alt={logo?.alt}
          className="inline object-contain"
          fill
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
          sizes="(max-width: 768px) 20vw, 10vw"
        />
      </div>

      <Transition
        as={Fragment}
        show={tooltipOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 top-0 -translate-x-1/2 translate-y-[calc(-100%-10px)] whitespace-nowrap text-center">
          <div className="rounded-lg bg-white px-2 py-1 text-black shadow-lg ring-1 ring-black/5 dark:bg-black/5 dark:text-white">
            {name}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default StackIcon;
