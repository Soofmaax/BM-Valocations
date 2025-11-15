import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import car from './schemas/car';

export default defineConfig({
  name: 'bmva-cms',
  title: 'BM-VA CMS',
  projectId: process.env.SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: process.env.SANITY_DATASET || 'production',
  plugins: [deskTool()],
  schema: { types: [car] },
});