-- 1. User Table
CREATE TABLE [User] (
    userID INT IDENTITY(1,1) PRIMARY KEY,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    username NVARCHAR(100) NOT NULL UNIQUE
);

-- 2. Extensions Table
CREATE TABLE Extension (
    extensionID INT IDENTITY(1,1) PRIMARY KEY,
    creator INT NOT NULL,
    name NVARCHAR(255) NOT NULL,
    summary NVARCHAR(500),
    metadataLicense NVARCHAR(255),
    projectLicense NVARCHAR(255),
    description NVARCHAR(MAX),
    FOREIGN KEY (creator) REFERENCES [User](userID) ON DELETE CASCADE
);

-- 3. ExtensionRelease Table
CREATE TABLE ExtensionRelease (
    extensionID INT NOT NULL,
    releaseVersion NVARCHAR(50) NOT NULL,
    releaseDate DATE,
    releaseMetadata NVARCHAR(MAX),
    FOREIGN KEY (extensionID) REFERENCES Extension(extensionID) ON DELETE CASCADE
);

-- 4. ExtensionScreenshot Table
CREATE TABLE ExtensionScreenshot (
    ScreenshotURL1 NVARCHAR(MAX) NOT NULL,
    ScreenshotURL2 NVARCHAR(MAX),
    ScreenshotURL3 NVARCHAR(MAX),
    ScreenshotURL4 NVARCHAR(MAX),
    ScreenshotURL5 NVARCHAR(MAX),
    extensionID INT NOT NULL,
    FOREIGN KEY (extensionID) REFERENCES Extension(extensionID) ON DELETE CASCADE
);
