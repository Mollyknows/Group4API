const express = require("express");
const multer = require("multer");
const router = express.Router();

const extensionService = require("../services/extension.service");

// // GET /repository/metadata
// // Retrieves metadata from the repository
// router.get("/repository/metadata", async (req, res) => {
//   const metadata = await service.getMetadata();
//   res.get(metadata);
// });

// // GET /repository/extensions/{id}/{version}
// // Download a specific version of an extension from the repository
// router.get("/repository/extensions/:id/:version", async (req, res) => {
//   const { id, version } = req.params;
//   const extension = await service.getExtension(id, version);
//   res.get(extension);
// });

// // POST /extensions
// // Upload a new extension to the repository
// // User must be logged in to upload an extension
// router.post(
//   "/extensions",
//   upload.single("extension"),
//   async (req, res) => {
//     const upload = await service.uploadExtension(req, res);
//     res.post(upload);
//   }
// }

// POST /extensions
// Upload a new extension to the repository
// User must be logged in to upload an extension
// router.post(
//   "/extensions",
//   upload.single("file"),
//   extensionService.uploadExtension
// ),
//   async (req, res) => {
//     const upload = await service.uploadExtension(req, res);
//     res.post(upload);
//   };

// GET /extensions/:id
// Retrieve details of a specific extension from the repository
router.get("/extensions/:id", async (req, res) => {
  const { id } = req.params;
  const extensionDetails = await service.getExtensionDetails(id);
  res.get(extensionDetails);
});

// // GET /extensions/:id
// // Retrieve details of a specific extension from the repository
// router.get("/extensions/:id", async (req, res) => {
//   const { id } = req.params;
//   const extensionDetails = await service.getExtensionDetails(id);
//   res.get(extensionDetails);
// });

// // PUT /extensions/:id
// // Update an existing extension in the repository
// // User must be logged in to update an extension
// router.put("/extensions/:id", async (req, res) => {
//   const { id } = req.params;
//   const update = await service.updateExtension(id, req.body);
//   res.put(update);
// });

// // DELETE /extensions/:id
// // Delete an extension from the repository
// // User must be logged in to delete an extension
// router.delete("/extensions/:id", async (req, res) => {
//   const { id } = req.params;
//   const deleteExtension = await service.deleteExtension(id);
//   res.delete(deleteExtension);
// });

// // POST /extensions/:id/flags
// // Flags an extension for review
// router.post("/extensions/:id/flags", async (req, res) => {
//   const { id } = req.params;
//   const flag = await service.flagExtension(id, req.body);
//   res.post(flag);
// });

// // GET /plugins/:id
// // Retrieve a specific plugin by ID
// router.get("/plugins/:id", async (req, res) => {
//   const { id } = req.params;
//   const plugin = await service.getPlugin(id);
//   res.get(plugin);
// });

// // POST /plugins/:id
// // Upload a new plugin to the repository
// // User must be logged in to upload a plugin
// router.post("/plugins/:id", async (req, res) => {
//   const { id } = req.params;
//   const uploadPlugin = await service.uploadPlugin(id, req.body);
//   res.post(uploadPlugin);
// });

// // PUT /plugins/:id
// // Update an existing plugin in the repository
// // User must be logged in to update a plugin
// router.put("/plugins/:id", async (req, res) => {
//   const { id } = req.params;
//   const updatePlugin = await service.updatePlugin(id, req.body);
//   res.put(updatePlugin);
// });

// // DELETE /plugins/:id
// // Delete a plugin from the repository
// // User must be logged in to delete a plugin
// router.delete("/plugins/:id", async (req, res) => {
//   const { id } = req.params;
//   const deletePlugin = await service.deletePlugin(id);
//   res.delete(deletePlugin);
// });

// // PUT /Extenstionsion/SanitizeExtension
// // Sanitize an extension to remove any malicious code
// router.put("/extensions/sanitize", async (req, res) => {
//   const sanitize = await service.sanitizeExtension(req.body);
//   res.put(sanitize);
// });

router.get("/extensions", async (req, res) => {
  try {
    const extensions = await extensionService.getAllExtensions();
    res.status(200).json({
      success: true,
      data: extensions,
    });
  } catch (error) {
    console.error("Error in /extensions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PUT /Extenstionsion/SanitizeExtension
// Sanitize an extension to remove any malicious code
router.put("/extensions/sanitize", async (req, res) => {
  const sanitize = await extensionService.sanitizeExtension(req.body);
  res.put(sanitize);
});

// GET /Extension/searchExtensions/:searchQuery/:tags
// Search for extensions based on a search query and tags
router.get("/extensions/search/:searchQuery", async (req, res) => {
  try {
    const { searchQuery } = req.params;
    const search = await extensionService.searchExtensions(searchQuery);
    res.status(200).json(search);
  } catch (error) {
    console.error("Error in /extensions/search/:searchQuery:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/extensions/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const userExtensionFetch = await extensionService.getUsersExtensions(userID);
    res.status(200).json(userExtensionFetch);
  } catch (error) {
    console.error("Error in /extensions/userID:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
