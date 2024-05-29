const mysql  = require('mysql');
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.static('assets')); // Замените 'assets' на путь к вашим изображениям
app.use(cors());
app.use(express.json())

const dbPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO Users (`name`, `phone`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.phone,
        req.body.email,
        req.body.password
    ]
    dbPool.query(sql, [values], (err, data) => {
        if (err) {
            console.error('Ошибка выполнения INSERT запроса', err)
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.get('/products', async (req, res) => {
    const sql = "SELECT * FROM products"
    dbPool.query(sql, (err, data) => {
        if (err) {
            console.error('Ошибка выполнения SELECT запроса', err)
            return res.json("Error");
        }
        if (data.length > 0) {
            //console.log(res.json(data))
            return res.json(data)
        } else {
            return res.json("Failed")
        }
    })
})

app.post('/makeOrder', (req, res) => {
    const sql = "INSERT INTO orders (`userId`, `totalAmount`) VALUES (?)";
    const values = [
        req.body.userId,
        req.body.totalAmount,
    ]
    dbPool.query(sql, [values], (err, data) => {
        if (err) {
            console.error('Ошибка выполнения INSERT запроса', err)
            return res.json("Error");
        }
        return res.json(data);
    })
})


app.get('/getUserInfo/:id', async (req, res) => {
    const sql = "SELECT * FROM Users WHERE id = ?";

    dbPool.query(sql, req.params.id, (err, data) => {
        if (err) {
            console.error('Ошибка выполнения SELECT запроса', err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.status(404).json({ error: 'Продукт не найден' });
        }
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM Users WHERE `email` = ? and `password` = ?";
    dbPool.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Ошибка выполнения SELECT запроса', err)
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json(data)
        } else {
            return res.json("Failed")
        }
    })
})

app.listen(8081, () => {
    console.log('listening')
})
