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

-- ===== Utilisateurs =====
INSERT INTO Users (admin, username, first_name, last_name, email, phone, password)
VALUES
(FALSE, 'jdoe', 'John', 'Doe', 'john.doe@example.com', '+33611111111', 'hashed_pw1'),
(TRUE,  'asmith', 'Alice', 'Smith', 'alice.smith@example.com', '+33622222222', 'hashed_pw2'),
(FALSE, 'bwhite', 'Bob', 'White', 'bob.white@example.com', '+33633333333', 'hashed_pw3'),
(FALSE, 'cmartin', 'Claire', 'Martin', 'claire.martin@example.com', '+33644444444', 'hashed_pw4'),
(FALSE, 'dlee', 'David', 'Lee', 'david.lee@example.com', '+33655555555', 'hashed_pw5');

-- ===== Posts =====
INSERT INTO Posts (user_id, content)
VALUES
(1, 'Hello, c’est mon premier post !'),
(2, 'Bienvenue sur la plateforme'),
(3, 'Quelqu’un veut coder en pair ce soir ?'),
(4, 'Je teste la messagerie privée...'),
(5, 'Bon lundi à tous !');

-- ===== Messages =====
-- John envoie un message à Alice et Bob
INSERT INTO Messages (author_id, content)
VALUES
(1, 'Salut Alice et Bob, comment ça va ?');

-- Alice envoie un message à Claire
INSERT INTO Messages (author_id, content)
VALUES
(2, 'Salut Claire, tu es dispo pour une réunion demain ?');

-- Bob envoie un message à David
INSERT INTO Messages (author_id, content)
VALUES
(3, 'David, peux-tu revoir mon code ?');

-- ===== Receiver_message =====
-- Message 1 (John → Alice et Bob)
INSERT INTO receiver_message (message_id, sender_id, receiver_id, read, read__date)
VALUES
(1, 1, 2, TRUE,  '2025-09-20 10:15:00'),
(1, 1, 3, FALSE, NULL);

-- Message 2 (Alice → Claire)
INSERT INTO receiver_message (message_id, sender_id, receiver_id, read, read__date)
VALUES
(2, 2, 4, FALSE, NULL);

-- Message 3 (Bob → David)
INSERT INTO receiver_message (message_id, sender_id, receiver_id, read, read__date)
VALUES
(3, 3, 5, TRUE,  '2025-09-21 14:30:00');