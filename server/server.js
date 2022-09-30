const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.json({ users: ['UserOne', 'UserTwo', 'UserThree'] });
});

app.listen(5000, () => {
  console.log('started on 5000');
});
