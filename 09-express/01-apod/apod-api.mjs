const API_URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function getApodByDate(dateStr) {
    const res = await fetch(`${API_URL}?date=${dateStr}&api_key=${API_KEY}`);
    if (res.ok) {
        const json = await res.json();
        return json;
    } else {
        throw new Error(`API return a ${res.status} code`);
    }
}
