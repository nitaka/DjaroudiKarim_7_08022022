const { pool } = require('../config/db');
const fs = require("fs");

exports.getAll = (req, res, next) => {
    // Ordre des post sur le mur
    let sql = "SELECT * FROM post p JOIN user WHERE user.id=authorId ORDER BY date DESC LIMIT 50;";
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.getByAuthor = (req, res, next) => {
    // Recupére les données par auteur
    let sql = `SELECT * FROM post JOIN user WHERE user.id=authorId AND authorId=? ORDER BY date DESC;`;
    pool.execute(sql, [req.body.id], function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.create = (req, res, next) => {
    // Definition des champs 
    const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}` : "";
    const textSend = (req.body.text) ? req.body.text : " ";
    const post = {
        text: textSend,
        imageUrl: image,
        like: 0,
        date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" }),
        authorId: req.body.userId,
    };
    
    //Post add valeurs via multer
    let sql = `INSERT INTO post (text, imageUrl, date, authorId) VALUES (?,?,?,?);`;
    pool.execute(sql, [post.text, post.imageUrl, post.date, post.authorId], function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: `Post ajouté` });
    })
};

exports.delete = (req, res, next) => {
    let sql = `SELECT * FROM post WHERE postId = ?`;
    pool.execute(sql, [req.params.id], function (err, result) {
        if (err) res.status(400).json({ err });
        if (!result[0]) res.status(400).json({ message: "Aucun id ne correspond dans la table" });
        else {
            if (result[0].authorId == req.body.userId || req.body.admin == true) {
                // supp l'image du post
                if (result[0].imageUrl != "") {
                    const name = result[0].imageUrl.split('/images/post/')[1];
                    fs.unlink(`images/post/${name}`, () => {
                        if (err) console.log(err);
                        else console.log('Image supprimée  !');
                    })
                }
                // supp post dans bdd
                let sql2 = `DELETE FROM post WHERE postId = ?`;
                pool.execute(sql2, [req.params.id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: `Post supprimé` });
                });
            } else {
                res.status(401).json({message : "Bien essayé petit malin"});
            }

        }
    });
};

exports.modify = (req, res, next) => {
    if (req.file) {
        let sql = `SELECT * FROM post WHERE id = ?`;
        pool.execute(sql, [req.params.id], function (err, result) {
            if (err) res.status(400).json({ e });
            if (!result[0]) res.status(400).json({ message: "Aucun id ne correspond dans la table" });
            else {
                // Remplace image du post par la nouvelle
                if (result[0].imageUrl != "") {
                    const name = result[0].imageUrl.split('/images/post/')[1];
                    fs.unlink(`images/${name}`, () => {
                        if (err) console.log(err);
                        else console.log('Image modifiée !');
                    })
                }
                // Recu les infos de la page
                let image = (req.file) ? `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}` : "";
                let textSend = (req.body.post) ? req.body.post.text : " ";
                const post = {
                    text: textSend,
                    imageUrl: image,
                    date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" })
                };
                // Maj bdd
                let sql2 = `UPDATE post
                SET text = ?, imageUrl= ?, date = ?
                WHERE id = ?`;
                pool.execute(sql2, [post.textSend, post.imageUrl, post.date, req.params.id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: `Post udpate` });
                });
            }
        });
    } else {
        // Recup les infos de la page
        const textSend = (req.body.post) ? req.body.post.text : " ";
        const post = {
            text: textSend,
            date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" })
        };
        // Maj bdd
        let sql2 = `UPDATE post SET text = ?, date =? WHERE id = ?`;
        pool.execute(sql2, [post.text, post.date, req.params.id], function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: `Post update` });
        });
    }
};
