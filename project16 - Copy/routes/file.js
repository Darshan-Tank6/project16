const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const File = require('../models/File');

const router = express.Router();

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/uploadfile', upload.single('pdf'), async (req, res) => {
    try {
      const { originalname, buffer, mimetype } = req.file;
  
      const file = new File({
        name: originalname,
        data: buffer,
        contentType: mimetype,
      });
  
      await file.save();
      res.status(201).json({ message: 'File uploaded successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading the file.');
    }
  });

// Route to display a list of uploaded files
router.get('/files', async (req, res) => {
    try {
      const files = await File.find();
      res.send(files);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving files from the database.');
    }
  });

// Route to display an individual file based on its ID
router.get('/files/:id', async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
  
      if (!file) {
        return res.status(404).send('File not found');
      }
  
      // Send the file data as a response
      res.contentType(file.contentType);
      res.send(file.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving the file from the database.');
    }
  });

  // Route for deleting a file based on its ID
router.delete('/files/:id', async (req, res) => {
    try {
      const file = await File.findByIdAndDelete(req.params.id);
  
      if (!file) {
        return res.status(404).send('File not found');
      }
  
      res.send('File deleted successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting the file from the database.');
    }
  });

// Route to download an individual file based on its ID
router.get('/files/:id/download', async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
  
      if (!file) {
        return res.status(404).send('File not found');
      }
  
      res.set({
        'Content-Disposition': `attachment; filename="${file.name}"`,
        'Content-Type': file.contentType,
      });
      res.send(file.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error downloading the file from the database.');
    }
  });


  module.exports = router;