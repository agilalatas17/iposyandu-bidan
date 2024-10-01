const baseUrl = process.env.NEXT_PUBLIC_URL_API;

export const jumlahIbuHamil = async () => {
  const res = await fetch(`${baseUrl}/api/ibu-hamil/jumlah-data`, {
    cache: 'no-store',
  });
  const jumlahIbuHamil = res.json();

  return jumlahIbuHamil;
};

export const getIbuHamil = async (id) => {
  const resource = id
    ? `${baseUrl}/api/ibu-hamil/${id}`
    : `${baseUrl}/api/ibu-hamil`;
  const res = await fetch(resource);
  const ibuHamil = await res.json();

  return ibuHamil.data;
};

export const createIbuHamil = async (body) => {
  try {
    const res = await fetch(`${baseUrl}/api/ibu-hamil`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const ibuHamil = await res.json();

    return ibuHamil;
  } catch (err) {
    return err.message;
  }
};

export const updateIbuHamil = async (id, body) => {
  try {
    const res = await fetch(`${baseUrl}/api/ibu-hamil/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const ibuHamil = res.json();
    return ibuHamil;
  } catch (err) {
    return err.message;
  }
};

export const deleteIbuHamil = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/ibu-hamil/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const ibuHamil = res.json();
    return ibuHamil;
  } catch (err) {
    return err.message;
  }
};
