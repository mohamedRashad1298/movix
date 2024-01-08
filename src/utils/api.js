import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzUzYTNjMDg2NTA0OGM1YTdhMjZjZmYzNTE3ZjYwZSIsInN1YiI6IjY0N2JhMWVhOGQyZjhkMDBmY2MxMmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CfA6lA_KaZE6pf-eizCQ4eECKae-jPUlZnGc0_IoNPo`;

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};


