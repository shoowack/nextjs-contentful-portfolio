export interface Gallery {
  metadata: { tags: { sys: { id: string } }[] };
  fields: {
    type: string;
    images: {
      fields: {
        file: { url: string; details: { image: { width: string; height: string } } };
        description: string;
      };
      sys: { id: string };
    }[];
    deviceBezel: { fields: { file: { url: string } } };
    browserThemeColor: string;
  };
  sys: { id: string };
}
