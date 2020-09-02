export interface NoteJoke {
    type: string;
    value: [JokeList];
}

export interface JokeList {
    id: number;
    joke: string;
    categories: [string];
}

export interface Joke {
    id: number;
    text: string;
}