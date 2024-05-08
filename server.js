const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "n6j.h.filess.io",
  user: "chatmessagesforblooket1_cornerrain",
  password: "9a08aac1a1ad3dcd1bf6c59764d75bbb2afbb422",
  database: "chatmessagesforblooket1_cornerrain",
  port: "3305"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});

app.get('/messages', (req, res) => {
  con.query("SELECT * FROM messages", function (err, result, fields) {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).json({ error: 'Internal server error.' });
    }
    res.json(result);
  });
});

app.post('/messages', (req, res) => {
  const { username, message, userid } = req.body;
  if (!username || !message || !userid) {
    return res.status(400).json({ error: 'Username, userID and message are required.' });
  }

  const newMessage = {
    username,
    message,
    userid
  };

  con.query("INSERT INTO messages SET ?", newMessage, function (err, result) {
    if (err) {
      console.error('Error saving message:', err);
      return res.status(500).json({ error: 'Failed to save message.' });
    }
    res.status(201).json({ message: 'Message sent successfully.', newMessage });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
