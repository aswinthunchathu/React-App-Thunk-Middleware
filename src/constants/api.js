const BASE_YEAR = 1950;

export const BASE_URL = "http://ergast.com/api/f1";
export const QUERY_SEASONS = "/seasons.json?limit="+((new Date()).getFullYear() - BASE_YEAR + 1) +"&offset=0";
export const QUERY_CHAMPIONS = "/driverstandings/1.json?limit="+((new Date()).getFullYear() - BASE_YEAR + 1) +"&offset=0";
export const QUERY_WINNERS = "/results/1.json";