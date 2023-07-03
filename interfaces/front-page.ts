export interface FrontPage {
  allCategories: {
    sys: { id: string };
    link: string;
    openInNewTab: boolean;
    title: string;
    subscript: string;
    superscript: string;
    backgroundImage: { url: string; description: string };
  }[];
}
