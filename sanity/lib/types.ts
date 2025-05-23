export interface GROQImage {
  src: string;
  width: number;
  height: number;
  lqip: string;
  name: string;
}

export interface IPageSettingsMetaFields {
  shouldIndex?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: GROQImage;
  metaKeywords?: string[];
}

export interface IPageSettings extends IPageSettingsMetaFields {
  _type: 'pageSettings';
  name: string;
  slug: {
    _type: 'slug';
    current: string;
  };
}
