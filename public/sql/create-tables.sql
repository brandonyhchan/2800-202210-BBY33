CREATE TABLE users (
  USER_ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email_adress VARCHAR(50),
  admin_user VARCHAR(1),
  password VARCHAR(50),
  PRIMARY KEY (USER_ID)
);

CREATE TABLE posts (
  POST_ID int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  date_of_post DATE NOT NULL,
  desciption VARCHAR(250),
  PRIMARY KEY (POST_ID),
  FOREIGN KEY (user_id) REFERENCES users(USER_ID) ON UPDATE CASCADE ON DELETE CASCADE
);