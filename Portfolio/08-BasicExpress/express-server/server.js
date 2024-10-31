const express = require("express");

const app = express();

app.get('/', (req, res) => { 

  res.send("<h1>This is a page</h1>" +

    "<p>Lorem ipsum dolor sit amet, consectetur adipiscing " +

    "elit, sed do eiusmod tempor incididunt ut labore et " +

    "dolore magna aliqua. Ut enim ad minim veniam, quis " +

    "nostrud exercitation ullamco laboris nisi ut aliquip " +

    "ex ea commodo consequat. Duis aute irure dolor in " +

    "reprehenderit in voluptate velit esse cillum dolore eu " +

    "fugiat nulla pariatur.</p><br/>" +

    "<input type='text' name='fname'><br/>" +

    "<input type='text' name='lname'><br/>" +

    "<input type='submit' value='Submit'>");

});

app.get('/contact', (req, res) => { 

    res.send("Contact me at my email: email@domain.com");

});



app.get('/about', (req, res) => { 

    res.send("If you want to know more about me... ask.");

});

app.listen(3000, ()=>{ 

    console.log("Example app listening on port 3000"); 

});