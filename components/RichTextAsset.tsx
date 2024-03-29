import Image from 'next/image';

export default function RichTextAsset({ id, assets }) {
  const asset = assets?.find((item) => item.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} alt={asset.description} fill sizes="100vw" />;
  }

  return null;
}
