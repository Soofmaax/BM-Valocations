import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'car',
  title: 'Voiture',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({ name: 'brand', title: 'Marque', type: 'string' }),
    defineField({ name: 'model', title: 'Modèle', type: 'string' }),
    defineField({ name: 'year', title: 'Année', type: 'number' }),

    // Type d'annonce: Vente ou Location
    defineField({
      name: 'listingType',
      title: 'Type d\'annonce',
      type: 'string',
      options: { list: [
        { title: 'Vente', value: 'sale' },
        { title: 'Location', value: 'rental' },
      ]},
      initialValue: 'rental',
      validation: r => r.required(),
    }),

    // Prix de vente
    defineField({ name: 'price', title: 'Prix de vente (€)', type: 'number' }),

    // Prix location / jour
    defineField({ name: 'rentalPricePerDay', title: 'Prix location / jour (€)', type: 'number' }),

    defineField({ name: 'mileage', title: 'Kilométrage', type: 'number' }),
    defineField({ name: 'fuel', title: 'Carburant', type: 'string' }),
    defineField({ name: 'transmission', title: 'Transmission', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: { list: ['Disponible', 'Réservée', 'Louée', 'Vendu'] },
    }),
    defineField({ name: 'features', title: 'Options', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'publishedAt', title: 'Publication', type: 'datetime' }),
  ],
});