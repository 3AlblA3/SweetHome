-- Table des utilisateurs
CREATE TABLE Users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   admin BOOLEAN NOT NULL DEFAULT FALSE,
   username VARCHAR(50) NOT NULL UNIQUE,
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   email VARCHAR(100) NOT NULL UNIQUE,
   phone VARCHAR(20) NOT NULL,
   password VARCHAR(255) NOT NULL
);

-- Table des messages (expéditeur unique, destinataires dans une autre table)
CREATE TABLE Messages (
   id INT AUTO_INCREMENT PRIMARY KEY,
   author_id INT NOT NULL,
   content TEXT NOT NULL,
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (author_id) REFERENCES Users(id)
);

-- Table des posts
CREATE TABLE Posts (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT NOT NULL,
   content TEXT NOT NULL,
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Table de liaison messages ↔ destinataires
CREATE TABLE receiver_message (
   message_id INT NOT NULL,
   sender_id INT NOT NULL,
   receiver_id INT NOT NULL,
   read BOOLEAN NOT NULL DEFAULT FALSE,
   read__date DATETIME NULL,
   PRIMARY KEY (message_id, receiver_id, sender_id),
   FOREIGN KEY (message_id) REFERENCES Messages(id) ON DELETE CASCADE,
   FOREIGN KEY (receiver_id) REFERENCES Users(id) ON DELETE CASCADE,
   FOREIGN KEY (sender_id) REFERENCES Users(id) ON DELETE CASCADE
);