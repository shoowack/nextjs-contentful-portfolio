export interface HeaderItemsType {
  link: string;
  contentfulMetadata: { tags: { name: 'development' | 'production' }[] };
  icon: string;
  iconColor: string;
  openInNewTab: boolean;
  order: number;
  size: number;
  sys: { id: string };
  tooltipText: string;
  className?: string;
}
