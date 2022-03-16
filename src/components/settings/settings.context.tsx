import React from 'react';

const siteSettings = {
  name: 'Patra Tilly Designs- Clothing',
  description: 'Patra Tilly Designs is a clothing company known for its trendy looks at reasonable prices. '
               +'Shop the latest Patra Tilly Designs clothing collection, '
               + 'which includes both Bespoke Wear and Ready to Wear options.',
  currencyCode: 'GHS',
  logo: '@assets/patra-tilly-variant.png',
};

type State = typeof initialState;

const initialState = {
  siteTitle: siteSettings.name,
  siteSubtitle: siteSettings.description,
  currency: siteSettings.currencyCode,
  logo: siteSettings.logo,
  seo: {
    metaTitle: siteSettings.name,
    metaDescription: siteSettings.description,
    ogTitle: '',
    ogDescription: '',
    ogImage: {
      id: 1,
      thumbnail: '',
      original: '',
    },
    twitterHandle: '',
    twitterCardType: '',
    metaTags: '',
    canonicalUrl: '',
  },
  google: {
    isEnable: false,
    tagManagerId: '',
  },
  facebook: {
    isEnable: false,
    appId: '',
    pageId: '',
  },
  contactDetails: {
    socials: [],
    contact: '',
  },
};

export const SettingsContext = React.createContext<State | any>(initialState);

SettingsContext.displayName = 'SettingsContext';

export const SettingsProvider: React.FC<{ initialValue: any }> = ({
  initialValue,
  ...props
}) => {
  const [state] = React.useState(initialValue ?? initialState);
  return <SettingsContext.Provider value={state} {...props} />;
};

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
};
