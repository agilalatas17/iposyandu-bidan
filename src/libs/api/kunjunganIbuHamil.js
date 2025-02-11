const baseUrl = process.env.NEXT_PUBLIC_URL_API;

export const getAllKunjungan = async (ibuHamilId) => {
  try {
    const res = await fetch(`${baseUrl}/api/ibu-hamil/${ibuHamilId}/kunjungan`);
    const kunjungan = res.json();

    return kunjungan;
  } catch (err) {
    return err.message;
  }
};

export const getKunjunganById = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/ibu-hamil/kunjungan/${id}`);

    const kunjungan = res.json();
    return kunjungan;
  } catch (err) {
    return err.message;
  }
};

export const createKunjunganIbuHamil = async (body) => {
  try {
    const res = await fetch(`${baseUrl}/api/ibu-hamil/kunjungan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const kunjungan = await res.json();

    return kunjungan;
  } catch (err) {
    return err.message;
  }
};

export const updateKunjunganIbuHamil = async (id, body) => {
  try {
    const res = await fetch(`${baseUrl}/api/ibu-hamil/kunjungan/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = res.json();
    return data;
  } catch (err) {
    return err.message;
  }
};
