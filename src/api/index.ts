const baseUrl = "https://rickandmortyapi.com/api";
const pageParams = "/character/?page=";
const nameParams = "/character/?name=";
const statusParams = "/character/?status=";

const getRequest = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { baseUrl, pageParams, nameParams, statusParams, getRequest };
