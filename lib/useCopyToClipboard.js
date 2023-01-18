import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { faLink, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function useCopyToClipboard() {
  const [value, setValue] = useState();
  const [copyIcon, setCopyIcon] = useState(faLink);

  const copyToClipboard = (text, options) => {
    const result = copy(text, options);
    if (result) setValue(text);

    if (result) {
      setCopyIcon(faCheck);

      setTimeout(() => {
        setCopyIcon(faLink);
      }, 2100);
    }
  };

  return [copyToClipboard, { value, copyIcon }];
}
