import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://127.0.0.1:27017/crudwithredux';

function validate (data) {
    let errors = {};

    if (data.title === '') errors.title = 'Can\'t be empty.';
    if (data.cover === '') errors.cover = 'Can\'t be empty.';

    const isValid = !Object.keys(errors).length;

    return { errors, isValid};
}

mongodb.MongoClient.connect(dbUrl, (err, db) => {
    app.get('/api/games', (req, res) => {
        console.log(111);
        db.collection('games').find({}).toArray((err, games) => {
            console.log(games);
            res.json({ games });
        });
    });
    app.get('/api/games/:_id', (req, res) => {
        db.collection('games').findOne({
            _id: new mongodb.ObjectId(req.params._id)
        }, (err, game) => {
            res.json({game});
        });
    });
    app.delete('/api/games/:_id', (req, res) => {
        db.collection('games').deleteOne({
            _id: new mongodb.ObjectId(req.params._id)
        }, (err, r) => {
            if (err) {
                res.status(500).json({errors: {global: err}});
                return;
            }

            res.json({});
        });
    });
    app.post('/payload', (req, res) => {
        console.log(req, res);
    });
    app.post('/authorize', (req, res) => {
        console.log(req, res);
    });
    app.post('/api/games', (req, res) => {
        const {errors, isValid} = validate(req.body);

        if (isValid) {
            const { title, cover } = req.body;

            db.collection('games').insert({title, cover}, (err, result) => {
                if (err) {
                    res.status(500).json({
                        errors: {
                            global: 'Something went wrong'
                        }
                    });
                } else {
                    res.json({
                        game: result.ops[0]
                    });
                }
            });
        } else {
            res.status(404).json({errors});
        }
    });
    app.put('/api/games/:_id', (req, res) => {
        const { errors, isValid } = validate(req.body);

        if (isValid) {
            const { title, cover } = req.body;

            db.collection('games').findOneAndUpdate({
                _id: new mongodb.ObjectId(req.params._id)
            }, {
                $set: { title, cover }
            }, {
                returnOriginal: false
            }, (err, result) => {
                if (err) {
                    res.status(500).json({errors: {global: err}});
                    return;
                }

                res.json({
                    game: result.value
                });
            });
        } else {
            res.status(400).json({errors});
        }
    });
    app.use((req, res) => {
        res.status(404).json({
            errors: {
                global: 'Please try again later.'
            }
        });
    });

    app.listen(4567, () => console.log('Server is running on localhost:8080'));
});

