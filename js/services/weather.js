import { API_KEI, BASE_API } from "../constants.js";

async function getCurrentWeather(lat, lon) {
  const response = await fetch(
    `${BASE_API}weather?lat=${lat}&lon=${lon}&appid=${API_KEI}&units=metric`
  );
  https: if (!response.ok)
    return {
      isError: true,
      data: null,
    };
  const data = await response.json();
  return {
    isError: false,
    data,
  };
}

async function getWeeklyWeather(lat, lon) {
  const response = await fetch(
    `${BASE_API}forecast?lat=${lat}&lon=${lon}&appid=${API_KEI}&units=metric`
  );
  https: if (!response.ok)
    return {
      isError: true,
      data: null,
    };
  const data = await response.json();
  return {
    isError: false,
    data,
  };
}

export { getCurrentWeather, getWeeklyWeather };
