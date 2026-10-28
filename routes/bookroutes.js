import express from "express";
//import router from "express";
import bookSchema from "../models/book.js";
const router = express.Router();
router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;    

   const book = await bookSchema.find().skip(skip).limit(limit);
    res.status(200).json({
        message: "Books find successfly",
        data: book
    });
});

router.post("/", async (req, res) => {
    const { title, author, category } = req.body;

    if (!title ||!author||!category) {
        return res.status(400).json({
            message: "please fill all the field"
        });
    }
    await bookSchema.create({
        title: title,
        author: author,
        category: category
    });

    res.status(200).json({
        message: "Book added success"
    });
});

router.put("/:id", async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    const book = await bookSchema.findById(id);

    if (!book) {
        return res.status(404).json({
            message: "Book not exists in the database"
        });
    }

    await bookSchema.findByIdAndUpdate(id, {
        status: status
    });

    return res.status(200).json({
        message: "Book status updated "
    });
});

export default router;