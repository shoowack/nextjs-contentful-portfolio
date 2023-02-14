import Image from 'next/legacy/image';

export default function RichTextAsset({ id, assets }) {
  const asset = assets?.find((item) => item.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} layout="fill" alt={asset.description} />;
  }

  return null;
}
