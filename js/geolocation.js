function geolocationSupport() {
  if ("geolocation" in navigator) {
    return true;
  }
  return false;
}

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 1000000,
};

export function getCurrentPosition(options = defaultOptions) {
  if (!geolocationSupport()) {
    throw new Error("No hay soporte de geolocalización en tu navegador");
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      () => {
        reject(new Error("no hemos podido obtener tu ubicación"));
      },
      options
    );
  });
}

export async function getLatLon(options = defaultOptions) {
  try {
    const {
      coords: { latitude: lat, longitude: lon },
    } = await getCurrentPosition(options);
    return { lat, lon };
  } catch {
    return {
      isError: true,
      lat: null,
      lon: null,
    };
  }
}
