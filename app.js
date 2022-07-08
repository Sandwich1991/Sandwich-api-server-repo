const express = require('express');

const app = express();

const db = require('./models/index')

const { Member } = db;

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.query);

    next();
})

// route handler
app.get('/api/members', async (req, res) => {
    const { team, position } = req.query;

    if (team) {
        const teamMembers = await Member.findAll({
            where : { team }, order : [['id', 'ASC']]
        });
        res.send(teamMembers);
    } 
    else if (position) {
        const teamMembers = await Member.findAll({
            where : { position }, order : [['id', 'ASC']]
        });
        res.send(teamMembers);
        }
    
    else {
        const members = await Member.findAll({order : [['id', 'ASC']]});
        res.send(members);
    }
    // res.send(members);
});

// route parameter
app.get('/api/members/:id', async (req, res) => {
    const { id } = req.params;
    const member = await Member.findOne( { where: { id }});
    if (member) {
        res.send(member);
    } else {
        res.status(404).send({message : 'There is no such member'});
    }
});

app.post('/api/members', async (req, res) => {
    const newMember = req.body;
    const member = Member.build(newMember);
    await member.save();
    res.send(member);
});

// app.put('/api/members/:id', async (req, res) => {
//     const { id } = req.params;
//     const newInfo = req.body;
//     const result = await Member.update(newInfo, { where : { id }});
//     if (result[0]) {
//         res.send( { message : `${result[0]} row(s) has affected`});
//     } else {
//         res.status(404).send({ message : `There is no member with id!`});
//     }
// });

app.put('/api/members/:id', async (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;
    const member = await Member.findOne({where : {id}});
    if (member) {Object.keys(newInfo).forEach((prop) => {
        member[prop] = newInfo[prop];
    });
    await member.save();
    res.send(member);
    } else {
        res.send( { message: `There is no member with id!`});
    };
})

// app.delete('/api/members/:id', async (req, res) => {
//     const {id} = req.params;
//     const deleteCount = await Member.destroy({ where : { id }});
//     if (deleteCount) {
//         res.send({message : `${deleteCount} row(s) deleted`});
//     } else {
//         res.status(404).send({message : `There is no member with id!`});
//     };
// })

app.delete('/api/members/:id', async (req, res) => {
    const { id } = req.params;
    const member = await Member.findOne({ where : { id }});
    if (member) {
        const result = await member.destroy();
        res.send({ message : `1 row has deleted`});
    } else {
        res.status(404).send({ message : `There is no member with id! `});
    };
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening...');
});
