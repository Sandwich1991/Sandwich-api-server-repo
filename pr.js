const express = require('express');
const members = require('./members');

const app = express();

app.use(express.json());
// 여기에 두 번째 미들웨어를 설정해보세요.

app.use((req, res, next) => {
    console.log(req.query);

    next();
})

app.get('/api/members', (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = members.filter((m) => m.team === team);
    res.send(teamMembers);
  } else {
    res.send(members);
  }
});

app.get('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: 'There is no such member' });
  }
});

app.post('/api/members', (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember);
});

app.listen(3000, () => {
  console.log('Server is listening...');
});
