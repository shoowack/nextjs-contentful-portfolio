import { Gallery } from '@interfaces/gallery';

export interface ContentfulDataType {
  sys: {
    id: string;
  };
  title: string;
  description: string;
  gallery: Gallery[];
  stack: {
    fields: {
      name: string;
      darkLogo: { fields: { file: { url: string } } };
      lightLogo: { fields: { file: { url: string } } };
    };
    sys: { id: string };
  };
  newProject: boolean;
}
