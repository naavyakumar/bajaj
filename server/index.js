const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(express.json()); 

app.get("/bfhl", (req, res) => {
    res.json({ "operation_code": "1" });
});




function f(filter, data) {
    let res = {
        numbers: [],
        alphabets: [],
        highest_lowercase_alphabet: null
    };

    let temp = JSON.parse(data);
    data = temp.data;

    
    if (filter.includes('numbers')) {
        res.numbers = data.filter(item => !isNaN(parseFloat(item)) && !isNaN(item - 0));

    }
    if (filter.includes('alphabets')) {
        res.alphabets = data.filter(item => /^[a-zA-Z]$/.test(item) && typeof item === 'string');
    }

    
    if (res.alphabets.length > 0) {
        const lowercaseAlphabets = res.alphabets.filter(item => item === item.toLowerCase());
        if (lowercaseAlphabets.length > 0) {
            res.highest_lowercase_alphabet = lowercaseAlphabets.sort().pop();
        }
    }

    return res;
}



app.post('/bfhl', (req, res) => {
    const { filter, data } = req.body;
    console.log(filter);
    console.log(data);
    const result = f(filter, data);
    
    
    res.json({
        "is_success": true,
        "user_id": "navya_kumar_27072003",
        "email": "naavyakumar27@gmail.com",
        "roll_number": "21BEC0912",
        "numbers": result.numbers,
        "alphabets": result.alphabets,
        "highest_lowercase_alphabet": result.highest_lowercase_alphabet
    });

  });



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});