export async function getWeather(
    { lat, lon }: { lat: number; lon: number }) {
    const res = await fetch(`https://api.openweathermap.org/data/4.0/onecall/timeline/1min?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${import.meta.env.VITE_API_KEY}`);
    const data = await res.json();
    return data;
}