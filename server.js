const express = require("express");
const bodyParser = require("body-parser");
const http = require('http')
const cors = require("cors");
const dbMysql = require("./app/config/mysql.config.js")
const connectionBdd = require("./app/services/ConnectionBdd")
const auth = require("./app/middleware/auth.js");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')






const app = express();
http.createServer(app).listen(8081)
console.log("Listening at:// port:%s (HTTP)", 8081)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// init connection to bdd
connectionBdd.connectionBdd()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//#region Add Disquette
app.post("/disquette", (req, res) => {
    try {
        req.body.idAutor = req.body.userId
        dbMysql.dbMysql.query('INSERT INTO disquette SET content = ? , idAutor =? , isValid = 0', [req.body.content, req.body.idAutor], function (error, results, fields) {
            if (error) throw error;
            res.status(200).json({ message: "disquette ajouté" })
        });
    } catch (error) { res.status(500).json({ message: "unknown error" }) }
});
//#endregion

//#region Validate disquette 
app.post("/acceptDisquette", (req, res) => {
    try {
        req.body.id = req.body.idDisquette
        dbMysql.dbMysql.query('Update disquette set isValid=1 WHERE id=?', [req.body.id], function (error, results, fields) {
            if (error) throw error;
            res.status(200).json({ message: "disquette Validé" })
        });
    } catch (error) { res.status(500).json({ message: "unknown error" }) }
});
//#endregion

//#region Delete disquette by an admin
app.delete('/deleteDisquette', function (req, res) {
    try {
        req.body.id = req.body.idDisquette
        dbMysql.dbMysql.query('DELETE FROM disquette WHERE id=?', [req.body.id], function (error, results, fields) {
            if (error) throw error;
            res.status(200).json({ message: "Disquette supprimé" })
        });
    } catch { res.status(500).json({ message: "unknown error" }) }
});
//#endregion

//#region Recover All Disquette
app.get("/getAllDisquette", (req, res) => {
    try {
        dbMysql.dbMysql.query("SELECT * FROM disquette ", function (err, result) {
            if (err) throw err;
            console.log(result);
            res.status(200).json(result)
        });
    } catch { res.status(500).json({ message: "unknown error" }) }
});
//#endregion

//#region Like Disquette 
app.post("/favori", (req, res) => {
    try {
        req.body.idUser = req.body.userId;
        dbMysql.dbMysql.query('INSERT INTO favori SET idUser=? , idDisquette=?', [req.body.idUser, req.body.idDisquette], function (error, results, fields) {
            if (error) throw error;
            res.status(200).json({ message: "Disquette liké" })
        });
    } catch { res.status(500).json({ message: "unknown error" }) }
});
//#endregion

//#region List Disquette LIKE
app.get("/favori/:userId", (req, res) => {
    try {
        req.params.idUser = req.params.userId
        dbMysql.dbMysql.query("SELECT content , idDisquette from favori join disquette ON favori.idDisquette = disquette.id WHERE idUser = ?", [req.params.idUser], function (err, result) {
            if (err) throw err;
            console.log(result);
            res.status(200).json(result)
        });
    } catch { res.status(500).json({ message: "unknown error" }) }
});
//#endregion

//#region  Delete Like
app.delete('/favori', function (req, res) {
    try {
        req.body.idUser = req.body.userId
        console.log(req.body.userId, req.body.idDisquette);
        dbMysql.dbMysql.query('DELETE FROM favori WHERE idUser=? and idDisquette=?', [req.body.idUser, req.body.idDisquette], function (error, results, fields) {
            if (error) throw error;
            res.status(200).json({ message: "Like supprimé" })
        });
    } catch { res.status(500).json({ message: "unknown error" }) }
});
//#endregion

//#region   Recover all User 
app.get("/getAllUser", (req, res) => {
    try {
        dbMysql.dbMysql.query("SELECT * FROM user where isAdmin=0", function (err, result) {
            if (err) throw err;
            console.log(result);
            res.status(200).json(result)
        })
    } catch { res.status(500).json({ message: "unknown error" }) }
});
//#endregion

//#region  Delete User
app.delete('/user', function (req, res) {
    try {
        console.log(req.body);
        req.body.id = req.body.userIdDelete
        dbMysql.dbMysql.query('DELETE FROM user WHERE id=? ', [req.body.id], function (error, results, fields) {
            if (error) throw error;
            res.status(200).json({ message: "utilisateur supprimer" })
        });
    } catch { res.status(500).json({ message: "unknown error" }) }
});
//#endregion

