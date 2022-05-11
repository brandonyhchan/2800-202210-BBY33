INSERT INTO BBY_33_user (USER_ID, user_name, first_name, last_name, email_address, admin_user, user_removed, user_image, password) VALUES (1, 'Ryan', 'Ryan', 'Lee', 'rlee@gmai.com', 'y', 'n', 'stock-profile.png', '$2b$05$g5VHP8khA5O9xkGcdlM/3ul6vZZdOsOP9gO5hatfXUG0/E8tO97DO');
INSERT INTO BBY_33_user (USER_ID, user_name, first_name, last_name, email_address, admin_user, user_removed, user_image, password) VALUES (2, 'Brandon', 'Brandon', 'Chan', 'bchan@gmail.com', 'n', 'n', 'stock-profile.png', '$2b$05$K92x1ZJamdrrqmDP1.6hmevOWvXIUAOHppSQ9Ayz6W1CWCQe7zoty');
INSERT INTO BBY_33_user (USER_ID, user_name, first_name, last_name, email_address, admin_user, user_removed, user_image, password) VALUES (3, 'Stanley', 'Stanley', 'Chow', 'schow@gmail.com', 'n', 'n', 'stock-profile.png', '$2b$05$w7sUSvF5EHM48mzq97saL.U0qq3J0WrZwbK7JNCbBWV6pGaJI0VXu');
INSERT INTO BBY_33_user (USER_ID, user_name, first_name, last_name, email_address, admin_user, user_removed, user_image, password) VALUES (4, 'Artem', 'Artem', 'Khan', 'akhan@gmail.com', 'y', 'n', 'stock-profile.png', '$2b$05$BHarNBknV0SGrHLzg4dUteihG9/Js12Wvl3reyfahX66xxd9OiYb2');

INSERT INTO BBY_33_country (COUNTRY_ID, user_id, country, description_of_country) VALUES (1, 1, 'Ukraine', 'Country invaded by Russia');
INSERT INTO BBY_33_country (COUNTRY_ID, user_id, country, description_of_country) VALUES (2, 1, 'Afghanistan', 'Ongoing war');
INSERT INTO BBY_33_country (COUNTRY_ID, user_id, country, description_of_country) VALUES (3, 1, 'Yemen', 'Food Shortage');
INSERT INTO BBY_33_country (COUNTRY_ID, user_id, country, description_of_country) VALUES (4, 1, 'Ethiopia', 'Heavy flooding');

INSERT INTO BBY_33_package (PACKAGE_ID, user_id, country_id, package_name, package_price, description_of_package, package_image) VALUES (1, 'Package 1', 20, 'Contains Water, Canned food and Clothing', '/img/landing1.jpg');
INSERT INTO BBY_33_package (PACKAGE_ID, user_id, country_id, package_name, package_price, description_of_package, package_image) VALUES (2, 'Package 2', 30, 'Contains Water, Canned food and Medicine', '/img/landing1.jpg');
INSERT INTO BBY_33_package (PACKAGE_ID, user_id, country_id, package_name, package_price, description_of_package, package_image) VALUES (3, 'Package 3', 35, 'Contains Water, Canned food and Clothing', '/img/landing1.jpg');
INSERT INTO BBY_33_package (PACKAGE_ID, user_id, country_id, package_name, package_price, description_of_package, package_image) VALUES (4, 'Package 4', 30, 'Contains Water, and Water', '/img/landing1.jpg');