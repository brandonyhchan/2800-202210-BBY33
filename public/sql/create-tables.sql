CREATE TABLE BBY_33_user (
  USER_ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email_address VARCHAR(50),
  admin_user VARCHAR(1),
  user_removed VARCHAR(1),
  user_image VARCHAR(200),
  password VARCHAR(100),
  PRIMARY KEY (USER_ID)
);

CREATE TABLE BBY_33_cart (
  CART_ID int NOT NULL AUTO_INCREMENT,
  product_id int NOT NULL,
  product_quantity int NOT NULL,
  user_id int NOT NULL,
  quantity int NOT NULL,
  PRIMARY KEY (CART_ID),
  FOREIGN KEY (user_id) REFERENCES BBY_33_user(USER_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE BBY_33_package (
  PACKAGE_ID int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  cart_id int NOT NULL,
  package_name VARCHAR(50),
  package_price int NOT NULL,
  description_of_package VARCHAR(500),
  PRIMARY KEY (PACKAGE_ID),
  FOREIGN KEY (cart_id) REFERENCES BBY_33_cart(CART_ID) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES BBY_33_user(USER_ID) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE BBY_33_countries (
  COUNTRY_ID int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  description_of_country VARCHAR(250),
  PRIMARY KEY (COUNTRY_ID),
  FOREIGN KEY (user_id) REFERENCES BBY_33_user(USER_ID) ON UPDATE CASCADE ON DELETE CASCADE
);