const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const PORT = process.env.PORT || 8080;

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
);

const User = sequelize.define('users', {
    id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    surname: { type: DataTypes.STRING },
    number_group: { type: DataTypes.STRING },
}, { timestamps: false });

app.use(cors());
app.use(express.json());

app.get('/main', (req, res) => {
    res.send('<h1>Hello world!</h1>');
});

app.get('/getUser/:id_user', async (req, res) => {
    const data = req.params;
    const user = await User.findOne({ where: { id_user: data.id_user } });
    if (!user) {
        return res.json('Запись не найдена!');
    }
    return res.json(user);
});

app.post('/insertUser', async (req, res) => {
    const data = req.body;
    try {
        const newUser = await User.create({ surname: data.surname, number_group: data.number_group });
        return res.json({ message: 'Запись создана!', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка', error: error.message });
    }
});

app.delete('/deleteAll', async (req, res) => {
    try {
        await User.destroy({ where: {} });
        return res.json({ message: 'Все записи удалены!' });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка', error: error.message });
    }
});

app.delete('/deleteId/:id_user', async (req, res) => {
    const data = req.params;
    try {
        const deleteUser = await User.destroy({ where: { id_user: data.id_user } });

        if (deleteUser === 0) {
            return res.json(`Запись с ID=${data.id_user} не найдена!`);
        }
        return res.json({ message: `Запись по ID=${data.id_user} удалена` });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка', error: error.message });
    }
});

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT);
    } catch (error) {
        console.error('Ошибка подключения к базе данных:', error.message);
    }
}

start();