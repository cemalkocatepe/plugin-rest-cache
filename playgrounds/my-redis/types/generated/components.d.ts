import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_decoration_heroes';
  info: {
    icon: 'address-card';
    name: 'Hero';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHighlight extends Struct.ComponentSchema {
  collectionName: 'components_sections_highlights';
  info: {
    displayName: 'Highlight';
    icon: 'award';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    category: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    highlights: Schema.Attribute.Component<'sections.highlight', false>;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.hero': SectionsHero;
      'sections.highlight': SectionsHighlight;
      'shared.seo': SharedSeo;
    }
  }
}
