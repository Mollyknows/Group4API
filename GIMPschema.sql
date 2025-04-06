-- 1. User Table
CREATE TABLE User (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    userDonationPath VARCHAR(500)
);

-- 2. Extensions Table
CREATE TABLE Extension (
    extensionID INT AUTO_INCREMENT PRIMARY KEY,
    creator VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    summary VARCHAR(500),
    metadataLicense VARCHAR(255),
    projectLicense VARCHAR(255),
    description TEXT,
    FOREIGN KEY (creator) REFERENCES User(username) ON DELETE CASCADE
);

-- 3. ExtensionTag Table
CREATE TABLE ExtensionTag (
    extensionID INT NOT NULL,
    tag VARCHAR(100) NOT NULL,
    FOREIGN KEY (extensionID) REFERENCES Extension(extensionID) ON DELETE CASCADE
);

-- 4. ExtensionRelease Table
CREATE TABLE ExtensionRelease (
    extensionID INT NOT NULL,
    releaseVersion VARCHAR(50) NOT NULL,
    releaseDate DATE,
    releaseMetadata
    FOREIGN KEY (extensionID) REFERENCES Extension(extensionID) ON DELETE CASCADE
);

-- 5. ExtensionBug Table
CREATE TABLE ExtensionBug (
    bugID INT AUTO_INCREMENT PRIMARY KEY,
    bugTitle VARCHAR(255) NOT NULL,
    bugDescription TEXT,
    extensionID INT NOT NULL,
    FOREIGN KEY (extensionID) REFERENCES Extension(extensionID) ON DELETE CASCADE
);

-- ExtensionScreenshot Table
CREATE TABLE ExtensionScreenshot (
    ScreenshotURL1 TEXT NOT NULL,
    ScreenshotURL2 TEXT,
    ScreenshotURL3 TEXT,
    ScreenshotURL4 TEXT,
    ScreenshotURL5 TEXT
    extensionID INT NOT NULL,
    FOREIGN KEY (extensionID) REFERENCES Extension(extensionID) ON DELETE CASCADE
);
