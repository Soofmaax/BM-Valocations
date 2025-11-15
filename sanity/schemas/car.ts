import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'car',
  title: 'Voiture',
  type: 'document',

  fieldsets: [
    { name: 'details', title: 'Détails', options: { collapsible: true, collapsed: false } },
    { name: 'pricing', title: 'Tarification', options: { collapsible: true, collapsed: false } },
    { name: 'media', title: 'Médias', options: { collapsible: true, collapsed: true } },
    { name: 'publication', title: 'Publication', options: { collapsible: true, collapsed: true } },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      fieldset: 'details',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'details',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'brand',
      title: 'Marque',
      type: 'string',
      fieldset: 'details',
    }),
    defineField({
      name: 'model',
      title: 'Modèle',
      type: 'string',
      fieldset: 'details',
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'number',
      fieldset: 'details',
    }),

    // Type d'annonce: Vente ou Location
    defineField({
      name: 'listingType',
      title: 'Type d\'annonce',
      type: 'string',
      fieldset: 'pricing',
      options: {
        list: [
          { title: 'Vente', value: 'sale' },
          { title: 'Location', value: 'rental' },
        ],
        layout: 'radio',
      },
      initialValue: 'rental',
      validation: r => r.required(),
      description: 'Choisissez "Vente" ou "Location". Les champs de prix s’adaptent automatiquement.',
    }),

    // Prix de vente (affiché si Vente)
    defineField({
      name: 'price',
      title: 'Prix de vente (€)',
      type: 'number',
      fieldset: 'pricing',
      description: 'Saisir uniquement pour une annonce "Vente".',
      hidden: ({ parent }) => parent?.listingType !== 'sale',
      validation: r => r.custom((val, ctx) => {
        return ctx?.parent?.listingType === 'sale'
          ? (typeof val === 'number' && val >= 0) || 'Le prix de vente est requis et doit être positif.'
          : true;
      }),
    }),

    // Prix location / jour (affiché si Location)
    defineField({
      name: 'rentalPricePerDay',
      title: 'Prix location / jour (€)',
      type: 'number',
      fieldset: 'pricing',
      description: 'Saisir uniquement pour une annonce "Location".',
      hidden: ({ parent }) => parent?.listingType !== 'rental',
      validation: r => r.custom((val, ctx) => {
        return ctx?.parent?.listingType === 'rental'
          ? (typeof val === 'number' && val >= 0) || 'Le prix location/jour est requis et doit être positif.'
          : true;
      }),
    }),

    defineField({ name: 'mileage', title: 'Kilométrage', type: 'number', fieldset: 'details' }),
    defineField({ name: 'fuel', title: 'Carburant', type: 'string', fieldset: 'details' }),
    defineField({ name: 'transmission', title: 'Transmission', type: 'string', fieldset: 'details' }),

    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      fieldset: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      fieldset: 'details',
      options: { list: ['Disponible', 'Réservée', 'Louée', 'Vendu'], layout: 'radio' },
      initialValue: 'Disponible',
    }),

    defineField({
      name: 'features',
      title: 'Options',
      type: 'array',
      fieldset: 'details',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      fieldset: 'details',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publication',
      type: 'datetime',
      fieldset: 'publication',
      description: 'Renseignez la date de publication pour rendre la voiture visible sur le site.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      brand: 'brand',
      model: 'model',
      year: 'year',
      listingType: 'listingType',
      price: 'price',
      rentalPricePerDay: 'rentalPricePerDay',
    },
    prepare(sel) {
      const title = sel.title || `${sel.brand ?? ''} ${sel.model ?? ''}`.trim();
      const kind = sel.listingType === 'sale' ? 'Vente' : 'Location';
      const pricetxt = sel.listingType === 'sale'
        ? (sel.price ? `${sel.price}€` : 'Prix ?')
        : (sel.rentalPricePerDay ? `${sel.rentalPricePerDay}€/jour` : 'Prix/jour ?');
      const subtitle = `${kind} • ${sel.year ?? 'Année ?'} • ${pricetxt}`;
      return { title, subtitle };
    },
  },
});