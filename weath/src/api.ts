interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function getWeather(
    { lat, lon }: { lat: number; lon: number }) {
    const res = await fetch(`https://api.openweathermap.org/data/4.0/onecall/timeline/1min?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${import.meta.env.VITE_API_KEY}`);
    const data = await res.json();
    return data;
}

export async function getPost() : Promise<PostData[]>{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    return data;
}

export async function deletePost(id: number){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    });
    return res.json();
}

export async function editPost(id: number, title: string, body: string, userId: number) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            title: title,
            body: body,
            userId: userId,
        })
    });
    return res.json();
}