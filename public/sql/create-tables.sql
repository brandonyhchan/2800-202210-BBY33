CREATE TABLE user (
  USER_ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email_adress VARCHAR(50),
  admin_user VARCHAR(1),
  password VARCHAR(50),
  PRIMARY KEY (USER_ID)
);

CREATE TABLE cart (
  CART_ID int NOT NULL AUTO_INCREMENT,
  product_id int NOT NULL,
  user_id int NOT NULL,
  quantity int NOT NULL,
  PRIMARY KEY (CART_ID),
  FOREIGN KEY (user_id) REFERENCES user(USER_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE package (
  PACKAGE_ID int NOT NULL AUTO_INCREMENT,
  cart_id int NOT NULL,
  package_name VARCHAR(50),
  package_price int NOT NULL,
  description_of_package VARCHAR(500),
  PRIMARY KEY (PACKAGE_ID),
  FOREIGN KEY (cart_id) REFERENCES cart(CART_ID) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE countries (
  COUNTRY_ID int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  description_of_country VARCHAR(250),
  PRIMARY KEY (COUNTRY_ID),
  FOREIGN KEY (user_id) REFERENCES user(USER_ID) ON UPDATE CASCADE ON DELETE CASCADE
);