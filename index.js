const express = require('express');
const app = express();

// Хранилище: у каждого пользователя — текущее количество пуль (1..6)
const bullets = {};

app.get('/roulette', (req, res) => {
    const user = req.query.user;
    if (!user) return res.send('Ошибка: не указан пользователь');

    // Текущий риск (по умолчанию 1)
    let current = bullets[user] || 1;
    if (current > 6) current = 6;

    // Выстрел: true = смерть
    const die = Math.random() < current / 6;

    if (die) {
        // Сброс после смерти
        bullets[user] = 1;
        res.send(`💀 Бах! ${user}, вы проиграли! Барабан пустеет и в нем вновь виднеется одна гильза...`);
    } else {
        // Увеличиваем риск (до 6)
        const next = Math.min(current + 1, 6);
        bullets[user] = next;
        res.send(`🔫 Щёлк! ${user}, вы выжили! В барабан досылается еще один патрон. Теперь патронов: ${next}/6`);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));
