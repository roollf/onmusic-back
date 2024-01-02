require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

const uri = process.env.DB_CONNECTION_STRING;
const app = express()
const port = 3001
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.use(express.json());
app.use(cors());

const onMusic = client.db("onmusic");
const users = onMusic.collection("users");
const songs = onMusic.collection("songs");
const playlists = onMusic.collection("playlists");
const albums = onMusic.collection("albums");

client.connect();

app.get('/playlists', async (request, response) => {
    const allPlaylists = await playlists.find().toArray();
    response.json(allPlaylists);
})

app.get('/playlists/detail/:id', async (request, response) => {
    const playlistId = request.params.id;

    const playlistDetail = await playlists.aggregate(
        [
            {
                $match: { _id: new ObjectId(playlistId) }
            },
            {
                $lookup: {
                    from: 'songs',
                    localField: 'songs',
                    foreignField: '_id',
                    let: { songs: '$songs' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ['$_id', '$$songs'] }
                            }
                        },
                        {
                            $sort: { indexedDB: 1 }
                        }
                    ],
                    as: 'songs'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    type: 1,
                    songs: {
                        _id: 1,
                        song: 1,
                        duration: 1,
                        audio: 1
                    }
                }
            }
        ]
    ).toArray();

    response.json(playlistDetail);
})

app.post('/playlists', async (request, response) => {
    const playlist = request.body;

    const playlistSongs = playlist.songs.map((songId) => new ObjectId(songId));

    await playlists.insertOne(
        {
            ...playlist,
            songs: playlistSongs
        }
    );
    const allPlaylists = await playlists.find().toArray();

    response.json(allPlaylists);
})

// app.post('/playlists', async (request, response) => {
//     const { name, type, addMusics, removeMusics } = request.body;

//     const playlist = await playlists.insertOne({ name, type, songs: [] });
//     const playlistId = playlist.insertedId;

//     if (addMusics && addMusics.length > 0) {
//         const addMusicsIds = addMusics.map(music => new ObjectId(music.$oid));
//         await playlists.findOneAndUpdate(
//             { _id: new ObjectId(playlistId) },
//             { $addToSet: { songs: { $each: addMusicsIds } } },
//             { returnDocument: 'after' }
//         );
//     }

//     if (removeMusics && removeMusics.length > 0) {
//         const removeMusicsIds = removeMusics.map(music => new ObjectId(music.$oid));
//         await playlists.findOneAndUpdate(
//             { _id: new ObjectId(playlistId) },
//             { $pull: { songs: { $in: removeMusicsIds } } },
//             { returnDocument: 'after' }
//         );
//     }

//     const allPlaylists = await playlists.find().toArray();

//     response.json(allPlaylists);
// })

// app.post('/playlists', async (request, response) => {
//     const playlist = request.body;

//     await playlists.insertOne(playlist);
//     const allPlaylists = await playlists.find().toArray();

//     response.json(allPlaylists);
// })

// app.put('/playlists/add/:id', async (request, response) => {
//     const playlistId = request.params.id;
//     const musicsToAdd = request.body.musicIds.map(musicId => new ObjectId(musicId));

//     const updatedPlaylist = await playlists.findOneAndUpdate(
//         { _id: new ObjectId(playlistId) },
//         { $addToSet: { songs: { $each: musicsToAdd } } },
//         { returnDocument: 'after' }
//     );

//     response.json(updatedPlaylist);
// })

// app.delete('/playlists/remove/:id', async (request, response) => {
//     const playlistId = request.params.id;
//     const musicsToRemove = request.body.musicIds.map(musicId => new ObjectId(musicId));

//     const updatedPlaylist = await playlists.findOneAndUpdate(
//         { _id: new ObjectId(playlistId) },
//         { $pull: { songs: { $in: musicsToRemove } } },
//         { returnDocument: 'after' }
//     );

//     response.json(updatedPlaylist);
// })

app.get('/users', async (request, response) => {
    const { email } = request.query;

    const user = await users.find(
        { email: email }
    ).toArray();

    response.json(user);
})

app.get('/users/profile/:id', async (request, response) => {
    const userId = request.params.id;

    const user = await users.find(
        { _id: new ObjectId(userId) }
    ).toArray();

    response.json(user);
})

app.post('/users', async (request, response) => {
    const user = request.body;

    await users.insertOne(user);
    const allUsers = await users.find().toArray();

    response.json(allUsers);
})

app.patch('/users/profile/:id', async (request, response) => {
    const userId = request.params.id;
    const updatedData = request.body;

    await users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: updatedData }
    );

    const user = await users.find(
        { _id: new ObjectId(userId) }
    ).toArray();

    response.json(user);
})

app.get('/albums', async (request, response) => {
    const allAlbums = await albums.find().toArray();
    response.json(allAlbums);
})

app.get('/albums/detail/:id', async (request, response) => {
    const albumId = request.params.id;

    const albumDetail = await albums.aggregate(
        [
            {
                $match: { _id: new ObjectId(albumId) }
            },
            {
                $lookup: {
                    from: 'songs',
                    localField: 'musics',
                    foreignField: '_id',
                    let: { musics: '$musics' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ['$_id', '$$musics'] }
                            }
                        },
                        {
                            $sort: { track: 1 }
                        }
                    ],
                    as: 'musics'
                }
            },
            {
                $project: {
                    _id: 1,
                    artist: 1,
                    name: 1,
                    genre: 1,
                    image: 1,
                    about: 1,
                    musics: {
                        _id: 1,
                        song: 1,
                        duration: 1,
                        audio: 1,
                        track: 1
                    }
                }
            }
        ]
    ).toArray();

    response.json(albumDetail);
})

app.get('/search', async (request, response) => {
    const { term } = request.query;

    const search = await songs.aggregate(
        [
            {
                $match: {
                    song: {
                        $regex: new RegExp(term, 'i')
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    song: 1,
                    duration: 1,
                    audio: 1
                }
            }
        ]
    ).toArray();

    response.json(search);
})

app.get('/songs', async (request, response) => {
    const allSongs = await songs.find().toArray();
    response.json(allSongs);
})

app.listen(port, () => {
    console.log(`Aplicação iniciada na porta ${port}`)
})