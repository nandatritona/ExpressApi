import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import db from "./database/dbConnections.js"

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create
app.post('/api/createUser', (req, res) => {
    const { username, useremail, password } = req.body;
    const sqlQuery = `INSERT INTO tbl_user (username, useremail, password) VALUES ('${username}', '${useremail}', '${password}')`;
    db.query(sqlQuery, (err, result) => {
      if (err) throw err;
        res.send(result);
        console.log('Good Job !');
    });
})

// read
app.get('/api/readData', (req, res) => {
    const sqlQuery = "SELECT * FROM tbl_user"

    db.query(sqlQuery, (err, result) => {
        if (err) throw err
        res.send(result)

        // if (err) {
        //     console.log(err)
        // } else {
        //     res.send(result)
        //     console.log(result)
        // }
    })
})

// read user by id
app.get('/api/getUser/:id', (req, res) => {
    const id = req.params.id
    const sqlQuery = "SELECT * FROM tbl_user WHERE id = ?"
    db.query(sqlQuery, id, (err, result) => {
        if (err) throw err
        res.send(result)
    } )
})

// updatw
app.put('/api/updateUser/:id', (req, res) => {
    const id = req.params.id
    const { username, useremail, password } = req.body
    const sqlQuery = "UPDATE tbl_user SET username = ?, useremail = ?, password = ? WHERE id = ?"
    db.query(sqlQuery, [username, useremail, password, id], (err, result) => {
        if (err) throw err
        res.send(result)
        console.log(`User berhasil diupdate !`);
    } )
})

app.delete('/api/deleteUser/:id', (req, res) => {
    const id = req.params.id
    const sqlQuery = "DELETE FROM tbl_user WHERE id = ?"
    db.query(sqlQuery, id, (err, result) => {
        if (err) throw err
        res.send(result)
        console.log(`User berhasil dihapus !`);
    } )
})


app.get("/", (req, res) => res.send("WELCOME TO IN EXPRESS API"));

app.listen(PORT, () =>
    console.log(`Server Running on port: http://127.0.0.1:${PORT}`)
);