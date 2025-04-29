const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');
const fs = require('fs');



// GET /repository/metadata
// Retrieves metadata from the repository
router.get("/repository/metadata", async (req, res) => {
  const metadata = await service.getMetadata();
  res.get(metadata);
});

// GET /repository/extensions/{id}/{version}
// Download a specific version of an extension from the repository
router.get("/repository/extensions/:id/:version", async (req, res) => {
  const { id, version } = req.params;
  const extension = await service.getExtension(id, version);
  res.get(extension);
});

// POST /extensions
// Upload a new extension to the repository
// User must be logged in to upload an extension
const storeFile = (file) => {
  const targetPath = path.join(__dirname, '../extensions', file.originalname);

  return new Promise((resolve, reject) => {
      fs.rename(file.path, targetPath, (err) => {
          if (err) {
              return reject(err);
          }
          resolve(targetPath);
      });
  });
};

// GET /extensions/:id
// Retrieve details of a specific extension from the repository
router.get("/extensions/:id", async (req, res) => {
  const { id } = req.params;
  const extensionDetails = await service.getExtensionDetails(id);
  res.get(extensionDetails);
});

// PUT /extensions/:id
// Update an existing extension in the repository
// User must be logged in to update an extension
router.put("/extensions/:id", async (req, res) => {
  const { id } = req.params;
  const update = await service.updateExtension(id, req.body);
  res.put(update);
});

// DELETE /extensions/:id
// Delete an extension from the repository
// User must be logged in to delete an extension
router.delete("/extensions/:id", async (req, res) => {
  const { id } = req.params;
  const deleteExtension = await service.deleteExtension(id);
  res.delete(deleteExtension);
});

// POST /extensions/:id/flags
// Flags an extension for review
router.post("/extensions/:id/flags", async (req, res) => {
  const { id } = req.params;
  const flag = await service.flagExtension(id, req.body);
  res.post(flag);
});

// PUT /Extenstionsion/SanitizeExtension
// Sanitize an extension to remove any malicious code
router.put("/extensions/sanitize", async (req, res) => {
  const sanitize = await service.sanitizeExtension(req.body);
  res.put(sanitize);
});

// GET /Extension/searchExtensions/:searchQuery/:tags
// Search for extensions based on a search query and tags
router.get("/extensions/search/:searchQuery/:tags?", async (req, res) => {
  const { searchQuery, tags } = req.params;
  const search = await service.searchExtensions(searchQuery, tags);
  res.get(search);
});

module.exports = {router, storeFile};