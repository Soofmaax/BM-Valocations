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
    defineField({ name: 'price', title: 'Prix (€)', type: 'number' }),
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