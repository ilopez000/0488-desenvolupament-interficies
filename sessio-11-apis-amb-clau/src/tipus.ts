// ─────────────────────────────────────────────────────────────
// La forma (el «tipus») del JSON que ens tornen les dues APIs.
// Només hi posem els camps que pintarem: les respostes reals
// en porten molts més, però TypeScript no ens obliga a posar-los.
// ─────────────────────────────────────────────────────────────

// OpenWeather · /data/2.5/weather
export type Temps = {
  name: string; // nom de la ciutat: "Barcelona"
  sys: { country: string }; // codi del país: "ES"
  main: {
    temp: number; // temperatura (°C, perquè demanem units=metric)
    feels_like: number; // sensació tèrmica
    humidity: number; // humitat en %
  };
  weather: {
    main: string; // grup del temps en anglès: "Rain", "Clear", "Clouds"…
    description: string; // descripció en català: "pluja lleugera"
    icon: string; // codi de la icona: "10d"
  }[];
  wind: { speed: number }; // vent en metres per segon
};

// TMDB · una pel·lícula
export type Pellicula = {
  id: number;
  title: string; // títol en l'idioma demanat (language=es-ES)
  release_date: string; // data d'estrena: "2021-09-15" (pot ser "")
  vote_average: number; // nota mitjana, de 0 a 10
  poster_path: string | null; // tros final de l'URL del cartell (o null)
};

// TMDB · les llistes (cerca, descobrir, populars) venen dins de "results"
export type LlistaPellicules = {
  page: number;
  total_results: number;
  results: Pellicula[];
};
