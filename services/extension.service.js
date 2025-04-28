const { connectDB, sql } = require("../db");

const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const storage = multer.memoryStorage(); // Store files
const upload = multer({ storage });

// GET /repository/metadata
// Retrieves metadata from the repository
module.exports.getMetadata = async (req, res) => {
  try {
    //implement logic to retrieve metadata from the repository <<-----Need DB structure to implement this

    return res.status(200).json({
      success: true,
      data: metadata,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve repository metadata",
    });
  }
};

// GET /repository/extensions/{id}/{version}
// Download a specific version of an extension from the repository
module.exports.getExtension = async (req, res) => {
  try {
    const { id, version } = req.params;

    // implement logic to retrieve the extension package

    const filePath = `path/to/repository/extensions/${id}/${version}/package.zip`;

    // Send the file for download
    return res.download(filePath, `extension-${id}-v${version}.zip`, (err) => {
      if (err) {
        return res.status(404).json({
          success: false,
          error: "Extension package not found",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to download extension package",
    });
  }
};

// POST /extensions
// Upload a new extension to the repository
//User must be logged in to upload an extension
module.exports.uploadExtension = async (req, res) => {
  try {
    const extensionData = req.body;
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    // Define the directory to save the file
    const extensionsDir = path.join(__dirname, "../extensions");

    // Ensure the directory exists
    if (!fs.existsSync(extensionsDir)) {
      fs.mkdirSync(extensionsDir, { recursive: true });
    }

    // Define the file path
    const filePath = path.join(extensionsDir, uploadedFile.originalname);

    // Save the file to the directory
    fs.writeFileSync(filePath, uploadedFile.buffer);

    return res.status(201).json({
      success: true,
      message: "Extension uploaded successfully",
      data: {
        id: "new-extension-id", // Replace with actual ID after saving to DB
        filePath,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to upload extension",
    });
  }
};

// GET /extensions/:id
// Retrieves a specific version of an extension from the repository
module.exports.getExtensionDetails = async (req, res) => {
  try {
    const { id, version } = req.params;

    // implement logic to retrieve the extension

    return res.status(200).json({
      success: true,
      data: extension,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve extension",
    });
  }
};

// PUT /extensions/:id/:version
// Update a specific version of an extension in the repository
// User must be logged in to update an extension
module.exports.updateExtension = async (req, res) => {
  try {
    const { id, version } = req.params;
    const updateData = req.body;

    // implement logic to update the extension metadata and file

    return res.status(200).json({
      success: true,
      message: "Extension updated successfully",
      data: { id, version }, // Replace with actual updated extension data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to update extension",
    });
  }
};

// DELETE /extensions/:id/:version
// Delete a specific version of an extension from the repository
// User must be logged in to delete an extension
module.exports.deleteExtension = async (req, res) => {
  try {
    const { id, version } = req.params;

    // implement logic to delete the extension from the repository

    return res.status(200).json({
      success: true,
      message: "Extension deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete extension",
    });
  }
};

// POST /extensions/:id/flags
// Flags an extension for review
module.exports.flagExtension = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, details } = req.body;

    // implement logic to flag the extension for review

    return res.status(200).json({
      success: true,
      message: "Extension flagged successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to flag extension",
    });
  }
};

// GET /plugins/:id
// Retrieve a specific plugin by ID
module.exports.getPlugin = async (req, res) => {
  try {
    const { id } = req.params;

    // implement logic to retrieve the plugin by ID

    return res.status(200).json({
      success: true,
      data: plugin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve plugin",
    });
  }
};

// POST /plugins/:id
// Upload a new plugin to the repository
// User must be logged in to upload a plugin
module.exports.uploadPlugin = async (req, res) => {
  try {
    const { id } = req.params;
    const pluginData = req.body;

    // implement logic to save the plugin data and file

    return res.status(201).json({
      success: true,
      message: "Plugin uploaded successfully",
      data: { id: "new-plugin-id" }, // Replace with actual saved plugin data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to upload plugin",
    });
  }
};

// PUT /plugins/:id
// Update an existing plugin in the repository
// User must be logged in to update a plugin
module.exports.updatePlugin = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // implement logic to update the plugin metadata and file

    return res.status(200).json({
      success: true,
      message: "Plugin updated successfully",
      data: { id }, // Replace with actual updated plugin data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to update plugin",
    });
  }
};

// DELETE /plugins/:id
// Delete a plugin from the repository
// User must be logged in to delete a plugin
module.exports.deletePlugin = async (req, res) => {
  try {
    const { id } = req.params;

    // implement logic to delete the plugin from the repository

    return res.status(200).json({
      success: true,
      message: "Plugin deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete plugin",
    });
  }
};

// PUT /Extension/SanitizeExtension
// Sanitize the extension data before uploading
module.exports.sanitizeExtension = async (req, res) => {
  try {
    const extensionData = req.body;

    // implement logic to sanitize the extension data

    return res.status(200).json({
      success: true,
      message: "Extension sanitized successfully",
      data: sanitizationResults,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to sanitize extension",
    });
  }
};

module.exports.getAllExtensions = async () => {
  try {
    const pool = await connectDB();

    const query = `SELECT * FROM Extension`; // Replace "Extensions" with your actual table name
    const queryResult = await pool.request().query(query);

    return queryResult.recordset;
  } catch (error) {
    console.error("Error in getAllExtensions method:", error);
    throw new Error("Failed to fetch all extensions");
  }
};

// GET /Extension/searchExtensions/:searchQuery/:tags
// Search for extensions based on a query and optional tags
module.exports.searchExtensions = async (searchQuery) => {
  try {
    
    const pool = await connectDB();

    let query = `SELECT * FROM Extension WHERE name LIKE @searchQuery OR description LIKE @searchQuery`;
    
    const queryResult = await pool.request().input("searchQuery", sql.NVarChar, `%${searchQuery}%`).query(query);

    return {
      success: true,
      data: queryResult.recordset
    };
  } catch (error) {
    console.error("Error in searchExrensions method:", error);
    throw new Error("Failed to search extensions");
  }
};
