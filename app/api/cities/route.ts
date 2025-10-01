import citiesData from '../../../public/cities.json' with { type: 'json' };

export async function GET() {
  // Используем citiesData вместо cities
  const filteredCities = citiesData.filter(city => parseInt(city.population) > 50000);

  // Сортируем по алфавиту
  filteredCities.sort((a, b) => a.city.localeCompare(b.city));

  // Находим город с максимальным населением
  const maxPopCity = filteredCities.reduce((max, city) =>
    parseInt(city.population) > parseInt(max.population) ? city : max
  );

  // Удаляем его из массива и ставим первым
  const sortedCities = filteredCities.filter(city => city.city !== maxPopCity.city);
  sortedCities.unshift(maxPopCity);

  return Response.json(sortedCities);
}