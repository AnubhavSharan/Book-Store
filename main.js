const express = require('express');
const app = express()
const database = require('./db.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const books = require('./Book_Store/Books.js');
const Books = require('./Book_Store/Books.js');

// Introduction Page

app.get('/', (req, res) => {
    res.send("Welocome to my book store!!!!!");

});
// Get all information
app.get('/Books', async (req,res)=> {
    try{
        const data = await Books.find();
        console.log("data fetched");
        res.status(200).json(data); 
}
catch(err){
     console.log(err);
     res.status(500).json({error: "Internal Server Error"});
    }

   
})
// Add info in database
app.post('/Books', async (req,res)=> {
    try{
    const data = req.body;
    const NewBook = new Books(data);
    const response = await NewBook.save();
    console.log("response data saved");
    res.status(200).json(response); 
}
catch(err){
     console.log(err);
     res.status(500).json({error: "Internal Server Error"});
    }
})
// Get specific book
app.get('/Books/:bookname', async (req,res)=> {
        const bookname = req.params.bookname;
        try {
            const book = await Books.findOne({title: bookname});
    
            if (!book) { // Check for book existence
                throw new Error('Book not found');
            }
            res.json(book);
        } catch (err) {
            console.log(err);
            res.status(404).json({ message: 'Book not found' }); // Send 404 error for both Mongoose errors and thrown errors
        } 
        
    })
//Edit specific information
app.put('/Books/:id', async (req,res) =>{
        var BookId = req.params.id;
        var UpdateInfo = req.body;
    try{        
        const data = await Books.findByIdAndUpdate(BookId,UpdateInfo,{
            new: true,
            runValidators: true
        })
        if (!data){
            throw new Error("we are not able to find the bookID")
        }
        console.log("information Updated")
        res.status(200).json(data)


    }catch{
        console.log(err);
        res.status(404).json({ message: 'Data not updated' });

    } 
})
app.delete('/Books/:id', async (req,res) =>{
    var BookId = req.params.id;

try{        
    const data = await Books.findByIdAndDelete(BookId)
    if (!data){
        throw new Error("we are not able to find the ")
    }
    console.log("information Deleted")
    res.status(200).json({message:"successfully deleted"})


}catch{
    
    res.status(404).json({ message: 'Data Not Deleted' });

}


})

app.listen(3000,()=>{
    console.log("server started")
}
)

