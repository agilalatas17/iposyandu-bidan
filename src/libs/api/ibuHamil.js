const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchIbuHamil = async (id = null) => {
  const resource = id ? `${baseUrl}/ibu-hamil/${id}` : `${baseUrl}/ibu-hamil`;
  const res = await fetch(resource);
  const ibuHamil = await res.json();

  return ibuHamil.data;
};
