// Single source of truth for the business NAP (name, address, phone) details.
// These must match the Google Business Profile exactly. Edit here only.

export const BUSINESS = {
  name: 'Phel Arts',
  addressLines: [
    'Eliminigwe Housing Estate, Phase 1,',
    'Opposite Jehovah Witness, Elelenwo,',
    'Obio/Akpor, Port Harcourt, Rivers State, Nigeria.',
  ],
  phone: '0708 661 3704',
  phoneIntl: '+234 708 661 3704',
  phoneHref: 'tel:+2347086613704',
  whatsappHref: 'https://wa.me/2347086613704',
  email: 'phelarts@gmail.com',
  emailHref: 'mailto:phelarts@gmail.com',
  hours: 'Monday to Friday, 9:00am to 6:00pm. Closed Saturday and Sunday.',
  instagram: { handle: '@phelarts', href: 'https://www.instagram.com/phelarts' },
  facebook: { label: 'facebook.com/phelarts', href: 'https://www.facebook.com/phelarts' },
  // Google Maps embed. To pin the exact listing, replace with the src from
  // Google Maps > Phel Arts > Share > Embed a map.
  mapEmbedSrc:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('Phel Arts, Eliminigwe Housing Estate, Elelenwo, Port Harcourt, Rivers State, Nigeria') +
    '&output=embed',
} as const;
