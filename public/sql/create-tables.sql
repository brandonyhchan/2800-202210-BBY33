CREATE TABLE BBY_33_user (
  USER_ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email_address VARCHAR(50),
  admin_user VARCHAR(1),
  charity_user VARCHAR(1),
  user_removed VARCHAR(1),
  user_image VARCHAR(200),
  password VARCHAR(100),
  PRIMARY KEY (USER_ID)
);

CREATE TABLE BBY_33_country (
  COUNTRY_ID int NOT NULL AUTO_INCREMENT,
  country VARCHAR(50),
  description_of_country VARCHAR(250),
  PRIMARY KEY (COUNTRY_ID)
);

CREATE TABLE BBY_33_package (
  PACKAGE_ID int NOT NULL AUTO_INCREMENT,
  country_id int NOT NULL,
  package_name VARCHAR(50),
  package_price int NOT NULL,
  description_of_package VARCHAR(500),
  package_image VARCHAR(50),
  package_destination VARCHAR(50),
  package_info VARCHAR(500),
  PRIMARY KEY (PACKAGE_ID),
  FOREIGN KEY (country_id) REFERENCES BBY_33_country(COUNTRY_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE BBY_33_order (
  ORDER_ID int,
  order_date VARCHAR(50),
  user_id int,
  PRIMARY KEY (ORDER_ID)
);


CREATE TABLE BBY_33_cart (
  CART_ID int NOT NULL AUTO_INCREMENT,
  package_id int NOT NULL,
  product_quantity int NOT NULL,
  user_id int,
  price int,
  package_purchased VARCHAR(1),
  order_id int,
  package_date DATE,
  cart_destination VARCHAR(50),
  PRIMARY KEY (CART_ID),
  FOREIGN KEY (user_id) REFERENCES BBY_33_user(USER_ID) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (package_id) REFERENCES BBY_33_package(PACKAGE_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

