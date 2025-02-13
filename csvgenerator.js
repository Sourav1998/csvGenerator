const express = require('express');
const app = express();
const axios = require('axios'); //for making HTTP requests
const fs = require('fs'); //for file handling
const path = require('path'); //for managing file path
const { Parser } = require('json2csv'); //for converting JSON data to CSV
const { log } = require('console');
const PORT = 8080;

const API_USERS = 'https://jsonplaceholder.typicode.com/users';
const API_POSTS = 'https://jsonplaceholder.typicode.com/posts';
const API_COMMENTS = 'https://jsonplaceholder.typicode.com/comments';

app.get('/generate-csv', async (req, res) => {
    try {
        // Fetch data from APIs in parallel
        const [usersRes, postsRes, commentsRes] = await Promise.all([
            axios.get(API_USERS).catch(err => { throw new Error('Failed to fetch users data'); }),
                        axios.get(API_POSTS).catch(err => { throw new Error('Failed to fetch posts data'); }),
                        axios.get(API_COMMENTS).catch(err => { throw new Error('Failed to fetch comments data'); })
                    ]);
            
                    const users = usersRes?.data || [];
                    const posts = postsRes?.data || [];
                    const comments = commentsRes?.data || [];
        
        //console.log("User:-",users[0]);
        //console.log("Post:-",posts[0]);
        //console.log("Comment:-",comments[0]);
        
        // Mapping data by ID
        const dataMap = {};

        users.forEach(user => {
            dataMap[user.id] = { name: user.name, title: '', body: '' };
        });
        //console.log("Data:" , dataMap);
        posts.forEach(post => {
            if (dataMap[post.id]) {
                dataMap[post.id].title = post.title;
            }
        });
        //console.log("Data:" , dataMap[1]);
        comments.forEach(comment => {
            if (dataMap[comment.id]) {
                dataMap[comment.id].body = comment.body;
            }
        });
        //console.log("Data:" , dataMap[1])

        // Convert data to CSV format
        const csvData = Object.values(dataMap);
        //console.log(csvData[0]);
        const parser = new Parser({ fields: ['name', 'title', 'body'] });
        const csv = parser.parse(csvData);
        //console.log(csv);
        
        const timestamp = new Date().toISOString().replace(/[-T:]/g, '_').split('.')[0]; // To create unique csv file name based on current time stamp(Timestamp will be in GMT -- YYYY_MM_DD_HH_MM_SS) 
        //console.log(timestamp);
        const fileName = `output_${timestamp}.csv`;
        const filePath = path.join(__dirname, fileName);

        fs.writeFileSync(filePath, csv);

                console.log(filePath);
                //res.json({ filePath });
                res.send(`The file path is '${filePath}'`);

    }   catch (error) {
        console.error('Error generating CSV:', error);
        res.status(500).send(`Error :- Failed to generate CSV`);
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});