export function getPriceRange(units) {
  if (!units.length) return "No units available";

  const prices = units.map(unit => unit.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return minPrice === maxPrice ? `${minPrice?.toLocaleString()}` : `${minPrice?.toLocaleString()} - ${maxPrice?.toLocaleString()}`;
}

export function getBathroomRange(units) {
  if (!units.length) return "No units available";

  const _bathroooms = units.map(unit => unit?.bathRooms);
  const minBathrooms = Math.min(..._bathroooms);
  const maxBathroooms = Math.max(..._bathroooms);

  return minBathrooms === maxBathroooms ? `${minBathrooms}` : `${minBathrooms} - ${maxBathroooms}`;
}

export function getBedroomRange(units) {
  if (!units.length) return "No units available";

  const _bedroooms = units.map(unit => unit?.bedRooms);
  const minBedrooms = Math.min(..._bedroooms);
  const maxBedroooms = Math.max(..._bedroooms);

  return minBedrooms === maxBedroooms ? `${minBedrooms}` : `${minBedrooms} - ${maxBedroooms}`;
}