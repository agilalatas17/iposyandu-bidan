export const hitungUsiaKehamilan = (hpht, tanggalDaftar) => {
  const hphtDate = new Date(hpht);
  const daftarDate = new Date(tanggalDaftar);

  const selisihMilidetik = daftarDate - hphtDate;

  // Konversi ke minggu
  // 1 minggu = 7 * 24 * 60 * 60 * 1000 milidetik
  const usiaKehamilan = Math.floor(
    selisihMilidetik / (7 * 24 * 60 * 60 * 1000)
  );

  return usiaKehamilan;
};

export const tentukanTrimester = (usiaKehamilan) => {
  if (usiaKehamilan <= 12) {
    return 1;
  } else if (usiaKehamilan >= 13 && usiaKehamilan <= 27) {
    return 2;
  } else if (usiaKehamilan >= 28 && usiaKehamilan <= 40) {
    return 3;
  }
};

export const hitungIndeksMasaTubuh = (beratBadan, tinggiBadan) => {
  // mengubah cm ke m
  let konversiTB = tinggiBadan / 100;
  let imt = beratBadan / (konversiTB * konversiTB);

  if (beratBadan && tinggiBadan) {
    if (imt <= 18.5) {
      return 'Kurus';
    } else if (imt > 18.5 && imt <= 24.9) {
      return 'Normal';
    } else if (imt >= 25 && imt <= 29) {
      return 'Gemuk';
    } else if (imt > 30) {
      return 'Obesitas';
    }
  } else {
    return '-';
  }
};
