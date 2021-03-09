const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbMysql = require("./app/config/mysql.config.js")
const connectionBdd = require("./app/services/ConnectionBdd")
var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
const auth = require("./app/middleware/auth.js");

const app = express();



// init connection to bdd

connectionBdd.connectionBdd()


app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//#region Add Disquette
app.post("/disquette", (req, res) => {
    try {
        req.body.idAutor = req.body.userId
        dbMysql.dbMysql.query('INSERT INTO disquette SET content = ? , idAutor =? , isValid = 0', [req.body.content, req.body.idAutor], function (error, results, fields) {
            if (error) throw error;
            res.end("OK");
        });
    } catch (error) { res.end("NOK") }
});
//#endregion

//#region Recover All Disquette
app.get("/getAllDisquette", (req, res) => {
    try {
        dbMysql.dbMysql.query("SELECT * FROM disquette", function (err, result) {
            if (err) throw err;
            console.log(result);
            res.end(JSON.stringify(result))
        });
    } catch { console.log(error) }
});
//#endregion

//#region Like Disquette 
app.post("/favori", (req, res) => {
    try {
        req.body.idUser = req.body.userId;
        dbMysql.dbMysql.query('INSERT INTO favori SET idUser=? , idDisquette=?', [req.body.idUser, req.body.idDisquette], function (error, results, fields) {
            if (error) throw error;
            res.end("Favori ajouté");
        });
    } catch { console.log(error) }
});
//#endregion

//#region List Disquette LIKE
app.get("/favori/:userId", (req, res) => {
    try {
        req.params.idUser = req.params.userId
        dbMysql.dbMysql.query("SELECT * FROM favori WHERE idUser=?", [req.params.idUser], function (err, result) {
            if (err) throw err;
            console.log(result);
            res.end(JSON.stringify(result))
        });
    } catch { console.log(error) }
});
//#endregion

//#region  Delete Like
app.delete('/favori', function (req, res) {
    try {
        req.body.idUser = req.body.userId
        console.log(req.body.userId, req.body.idDisquette);
        dbMysql.dbMysql.query('DELETE FROM favori WHERE idUser=? and idDisquette=?', [req.body.idUser, req.body.idDisquette], function (error, results, fields) {
            if (error) throw error;
            res.end("Favori supprimer");
        });
    } catch { console.log(error) }
});
//#endregion

//#region   Recover all User 
app.get("/getAllUser", (req, res) => {
    try {
        dbMysql.dbMysql.query("SELECT * FROM user where isAdmin=0", function (err, result) {
            if (err) throw err;
            console.log(result);
            res.end(JSON.stringify(result))
        })
    } catch { console.log(error) }
});
//#endregion

//#region  Delete User
app.delete('/user', function (req, res) {
    try {
        console.log(req.body);
        req.body.id = req.body.userIdDelete
        dbMysql.dbMysql.query('DELETE FROM user WHERE id=? ', [req.body.id], function (error, results, fields) {
            if (error) throw error;
            res.end("OK");
        });
    } catch { console.log(error) }
});
//#endregion

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);

});