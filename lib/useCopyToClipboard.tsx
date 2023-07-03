import copy from 'copy-to-clipboard';
import { ReactNode, useState } from 'react';
import { FaCheck, FaLink } from 'react-icons/fa';

type CopiedValue = string | null;
// eslint-disable-next-line @typescript-eslint/ban-types
type CopiedResult = [Function, { value: CopiedValue; copyIcon: ReactNode }];

export default function useCopyToClipboard(): CopiedResult {
  const [value, setValue] = useState<CopiedValue>(null);
  const [copyIcon, setCopyIcon] = useState(<FaLink className="inline h-5 w-5" />);

  const copyToClipboard = (text, options) => {
    const result = copy(text, options);
    if (result) setValue(text);

    if (result) {
      setCopyIcon(<FaCheck className="inline h-5 w-5" />);

      setTimeout(() => {
        setCopyIcon(<FaLink className="inline h-5 w-5" />);
      }, 2100);
    }
  };

  return [copyToClipboard, { value, copyIcon }];
}
