import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { FaCheck, FaLink } from 'react-icons/fa';

export default function useCopyToClipboard() {
  const [value, setValue] = useState();
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
