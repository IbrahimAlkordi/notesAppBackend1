import Notes from '../../models/notes.js';
import path from 'path';
import user from '../../models/user.js';
import categories from '../../models/category.js';

import { getUser } from '../../utils/getUser.js';
import { noteSchema } from '../../middleware/validation/notesValidation.js';
import {
    pushFile,
    pushImage,
    pushImageFile,
} from '../../services/notesServices/createNotes.js';

import { addTags } from '../../utils/addTags.js';


export const createNote = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const id = getUser(authHeader);

        //check is note exists with creator id and noteid
        const UserInfo = await user.findOne({ _id: id });
        const __dirname = path.resolve();
        //validate input
        const { title, content, tags, category } =
            await noteSchema.validateAsync(req.body);
        const cat = await categories.findOne({
            categoryName: category,
            creatorID: id,
        });
        if (!cat)
            return res.status(404).json({
                success: false,
                error: 'NotFound',
                message: 'no such category found..',
            });
        const newNote = await Notes.create({
            creatorID: id,
            title: title,
            content: content,
            categoryID: cat._id,
            creatorEmail: UserInfo.email,
            creatorName: UserInfo.name,
        });

        //call helper function to add tags and create documents
        addTags(tags, newNote, UserInfo);
        //initialize image and file chaining operators
        const image = req?.files?.image;
        const file = req?.files?.file;

        /* ADDITIONAL CONDITIONS OF WHEN USER INSERTS FILES AND IMAGES */
        if (image == (undefined || null) && file != (undefined || null)) {
            pushFile(file, __dirname, newNote);
            return res.status(201).json({
                success: true,
                message: 'Note added!',
            });
        }
        if (image != (undefined || null) && file == (undefined || null)) {
            pushImage(image, __dirname, newNote);

            return res.status(201).json({
                success: true,
                message: 'Note added!',
            });
        }
        if (image != (undefined || null) && file != (undefined || null)) {
            pushImageFile(image, file, __dirname, newNote);
            return res.status(201).json({
                success: true,
                message: 'Note added!',
            });
        }
        if (!(req.files && req.files.image) && !(req.files && req.files.file)) {
            return res.status(201).json({
                success: true,
                message: 'Note added!',
                note: newNote,
            });
        }
    } catch (e) {
        next(e);
    }
};