const asyncHandler = require("express-async-handler");
const Contact      = require("../models/contactModel")


// @desc Get all contacts
// @route GET /api/contacts
// @access private

const getContacts = asyncHandler(async (req, res)=>{
    const contacts = await Contact.find({ user_id : req.user.id });
    res.status(200).json(contacts);
});

// @desc Create contacts
// @route POST /api/contacts
// @access private

const createContact = asyncHandler(async (req,res)=>{
    console.log("The request body is",req.body);
    const {name,email,designation,mobile} = req.body;
    if(!name || !email || !designation || !mobile){
        res.status(400);
        throw new Error("All fields are mandatory !!");
    }

    const contacts = await Contact.create({name, email, designation, mobile, user_id: req.user.id});
    res.status(201).json(contacts);
});

// @desc Get contact
// @route GET /api/contacts
// @access private

const getContact = asyncHandler(async (req,res)=>{
    const contacts  = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contacts);
});

// @desc update contacts
// @route PUT /api/contacts
// @access private

const updateContact = asyncHandler(async (req,res)=>{
    const contacts  = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contacts.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other contact details! ");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updateContact);
});

// @desc Delete contacts
// @route DELETE /api/contacts
// @access private

const deleteContact = asyncHandler(async (req,res)=>{
    const contacts  = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contacts.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete other contact details! ");
    } 

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contacts);
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };