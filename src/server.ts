import { crearApp } from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = crearApp();

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
