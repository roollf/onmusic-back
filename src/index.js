const express = require('express')
const app = express()
const port = 3001

app.use(express.json());

const playlists = [
    {
        "name": "Teste Playlist Karol",
        "type": "Estudar",
        "musics": [
            "3",
            "6"
        ],
        "id": 2
    },
    {
        "name": "Relax 2023",
        "type": "Relaxar",
        "musics": [
            "13",
            "20",
            "14",
            "9",
            "2"
        ],
        "id": 3
    },
    {
        "name": "Teste Playlist Rolf",
        "type": "Positividade",
        "musics": [
            "1",
            "5",
            "7",
            "18",
            "22",
            "20",
            "11"
        ],
        "id": 5
    },
    {
        "name": "Playlist 4",
        "type": "Positividade",
        "musics": [
            "4",
            "8",
            "19"
        ],
        "id": 6
    }
]

const users = [
    {
        "email": "miguelmlfilho77@gmail.com",
        "senha": "oin2ioc",
        "id": 1
    },
    {
        "email": "",
        "senha": "",
        "id": 2
    },
    {
        "email": "miguelmlfilho77@gmail.com",
        "senha": "teste",
        "id": 3
    },
    {
        "email": "miguelmlfilho77@gmail.com",
        "senha": "rrrrrrrrrrr",
        "id": 4
    },
    {
        "email": "miguelmlfilho@gmail.com",
        "senha": "teste",
        "id": 5
    },
    {
        "email": "c@gmail.com",
        "senha": "hapvida",
        "id": 6
    },
    {
        "email": "l@gmail.com",
        "senha": "unifor",
        "id": 7
    },
    {
        "email": "miguelmlfilho77@gmail.com",
        "senha": "ij2b",
        "id": 8
    },
    {
        "email": "miguelmlfilho77@gmail.com",
        "senha": "jo1dh",
        "id": 9
    },
    {
        "email": "miguelmlfilho77@gmail.com",
        "senha": "uyfuy",
        "id": 10
    },
    {
        "email": "miguelmlfilho77@gmail.com",
        "senha": "iugiy",
        "id": 11
    },
    {
        "email": "miguelmlfilho77@gmail.com",
        "senha": "uod1'gh",
        "id": 12
    },
    {
        "email": "y@gmail.com",
        "senha": "1234",
        "id": 13
    },
    {
        "email": "rolf@gmail.com",
        "senha": "123",
        "id": 14
    }
]

const songs = [
    {
        "id": "1",
        "song": "Omicidio virtuale",
        "duration": "4:33",
        "audio": "/audios/loba-walk/01-omicidio-virtuale.mp3"
    },
    {
        "id": "2",
        "song": "Ultima luce",
        "duration": "2:48",
        "audio": "/audios/loba-walk/02-ultima-luce.mp3"
    },
    {
        "id": "3",
        "song": "Fetish mystic night",
        "duration": "4:39",
        "audio": "/audios/loba-walk/03-fetish-mystic-night.mp3"
    },
    {
        "id": "4",
        "song": "Scilito",
        "duration": "5:14",
        "audio": "/audios/loba-walk/04-scilto.mp3"
    },
    {
        "id": "5",
        "song": "So bad (Richman at voice)",
        "duration": "2:40",
        "audio": "/audios/loba-walk/05-so-bad-richman-at-voice.mp3"
    },
    {
        "id": "6",
        "song": "Midnight Peace",
        "duration": "2:16",
        "audio": "/audios/lofi-days-volume-1/01-midnight-peace.mp3"
    },
    {
        "id": "7",
        "song": "midnight jam_3",
        "duration": "2:48",
        "audio": "/audios/lofi-days-volume-1/02-midnight-jam-3.mp3"
    },
    {
        "id": "8",
        "song": "eyes are closing",
        "duration": "2:16",
        "audio": "/audios/lofi-days-volume-1/03-eyes-are-closing.mp3"
    },
    {
        "id": "9",
        "song": "midnight jam_2",
        "duration": "3:12",
        "audio": "/audios/lofi-days-volume-1/04-midnight-jam-2.mp3"
    },
    {
        "id": "10",
        "song": "Intro",
        "duration": "0:30",
        "audio": "/audios/uislobae/01-intro.mp3"
    },
    {
        "id": "11",
        "song": "Cykady Przedostaja Sie Kominem",
        "duration": "4:57",
        "audio": "/audios/uislobae/02-cykady-przedostaja-sie-kominem.mp3"
    },
    {
        "id": "12",
        "song": "Zaklinacz Krawatow",
        "duration": "0:37",
        "audio": "/audios/uislobae/03-zaklinacz-krawatow.mp3"
    },
    {
        "id": "13",
        "song": "Zaklinacz Robakow",
        "duration": "5:15",
        "audio": "/audios/uislobae/04-zaklinacz-robakow.mp3"
    },
    {
        "id": "14",
        "song": "Rozbzykanie",
        "duration": "5:38",
        "audio": "/audios/uislobae/05-rozbzykanie.mp3"
    },
    {
        "id": "15",
        "song": "Gadka, Co Rabie Drwa",
        "duration": "5:02",
        "audio": "/audios/uislobae/06-gadka-,-co-rabie-drwa.mp3"
    },
    {
        "id": "16",
        "song": "Bright and Clear",
        "duration": "6:03",
        "audio": "/audios/liborio-conti/01-bright-and-clear.mp3"
    },
    {
        "id": "17",
        "song": "I Believe",
        "duration": "5:13",
        "audio": "/audios/liborio-conti/02-i-believe.mp3"
    },
    {
        "id": "18",
        "song": "Inspiring Ambient",
        "duration": "5:07",
        "audio": "/audios/liborio-conti/03-inspiring-ambient.mp3"
    },
    {
        "id": "19",
        "song": "why",
        "duration": "3:56",
        "audio": "/audios/lofi-fofi/01-why.mp3"
    },
    {
        "id": "20",
        "song": "four",
        "duration": "2:08",
        "audio": "/audios/lofi-fofi/02-four.mp3"
    },
    {
        "id": "21",
        "song": "summer memories",
        "duration": "0:51",
        "audio": "/audios/lofi-fofi/03-summer-memories.mp3"
    },
    {
        "id": "22",
        "song": "fofi",
        "duration": "3:03",
        "audio": "/audios/lofi-fofi/04-fofi.mp3"
    }
]

app.get('/playlists', (request, response) => {
    response.json(playlists)
})

app.get('/playlists/:id', (request, response) => {
    const playlistId = request.params.id;
    const playlist = playlists.find(playlist => playlist.id == playlistId);
    response.json(playlist);
})

app.post('/playlists', (request, response) => {
    const playlist = request.body;
    playlists.push(playlist);
    response.json(playlists);
})

app.put('/playlists/add/:id', (request, response) => {
    const playlistId = request.params.id;
    const musicsToAdd = request.body.musicIds;

    const playlistIndex = playlists.findIndex(playlist => playlist.id == playlistId);

    playlists[playlistIndex].musics = [...new Set([...playlists[playlistIndex].musics, ...musicsToAdd])];

    response.json(playlists[playlistIndex]);
})

app.delete('/playlists/remove/:id', (request, response) => {
    const playlistId = request.params.id;
    const musicsToRemove = request.body.musicIds;

    const playlistIndex = playlists.findIndex(playlist => playlist.id == playlistId);

    playlists[playlistIndex].musics = playlists[playlistIndex].musics.filter(id => !musicsToRemove.includes(id));

    response.json(playlists[playlistIndex]);
})

app.get('/users', (request, response) => {
    const { email } = request.query;
    const user = users.find(user => user.email === email);
    response.json(user);
})

app.post('/users', (request, response) => {
    const user = request.body;
    users.push(user);
    response.json(users);
})

app.put('/users/:id', (request, response) => {
    const userId = request.params.id;
    const updatedData = request.body;

    const userIndex = users.findIndex(user => user.id == userId);
    users[userIndex] = { ...users[userIndex], ...updatedData };

    response.json(users);
})

app.get('/songs', (request, response) => {
    const { song } = request.query;
    const musics = songs.filter(music => music.song.toLocaleLowerCase().includes(song.toLocaleLowerCase()));
    response.json(musics);
})

app.listen(port, () => {
    console.log(`Aplicação iniciada na porta ${port}`)
})