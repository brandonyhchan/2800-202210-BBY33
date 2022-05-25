INSERT INTO BBY_33_user (USER_ID, user_name, first_name, last_name, email_address, admin_user, charity_user, user_removed, user_image, password) VALUES (1, 'Ryan', 'Ryan', 'Lee', 'rlee@gmai.com', 'y', 'n', 'n', 'stock-profile.png', '$2b$05$g5VHP8khA5O9xkGcdlM/3ul6vZZdOsOP9gO5hatfXUG0/E8tO97DO');
INSERT INTO BBY_33_user (USER_ID, user_name, first_name, last_name, email_address, admin_user, charity_user, user_removed, user_image, password) VALUES (2, 'Brandon', 'Brandon', 'Chan', 'bchan@gmail.com', 'n', 'n', 'n', 'stock-profile.png', '$2b$05$K92x1ZJamdrrqmDP1.6hmevOWvXIUAOHppSQ9Ayz6W1CWCQe7zoty');
INSERT INTO BBY_33_user (USER_ID, user_name, first_name, last_name, email_address, admin_user, charity_user, user_removed, user_image, password) VALUES (3, 'Stanley', 'Stanley', 'Chow', 'schow@gmail.com', 'n', 'n', 'n', 'stock-profile.png', '$2b$05$w7sUSvF5EHM48mzq97saL.U0qq3J0WrZwbK7JNCbBWV6pGaJI0VXu');
INSERT INTO BBY_33_user (USER_ID, user_name, first_name, last_name, email_address, admin_user, charity_user, user_removed, user_image, password) VALUES (4, 'Artem', 'Artem', 'Khan', 'akhan@gmail.com', 'y', 'n', 'n', 'stock-profile.png', '$2b$05$BHarNBknV0SGrHLzg4dUteihG9/Js12Wvl3reyfahX66xxd9OiYb2');
INSERT INTO BBY_33_user (USER_ID, user_name, first_name, last_name, email_address, admin_user, charity_user, user_removed, user_image, password) VALUES (5, 'Patrick', 'Patrick', 'Guichon', 'pg@gmail.com', 'n', 'y', 'n', 'stock-profile.png', '$2b$05$BHarNBknV0SGrHLzg4dUteihG9/Js12Wvl3reyfahX66xxd9OiYb2');

INSERT INTO BBY_33_country (COUNTRY_ID, country, description_of_country) VALUES (1, 'Ukraine', 'Country invaded by Russia');
INSERT INTO BBY_33_country (COUNTRY_ID, country, description_of_country) VALUES (2, 'Afghanistan', 'Ongoing war');
INSERT INTO BBY_33_country (COUNTRY_ID, country, description_of_country) VALUES (3, 'Yemen', 'Food Shortage');
INSERT INTO BBY_33_country (COUNTRY_ID, country, description_of_country) VALUES (4, 'Ethiopia', 'Heavy flooding');
INSERT INTO BBY_33_country (COUNTRY_ID, country, description_of_country) VALUES (5, 'Democratic Republic of Congo', 'Civil unrest');

INSERT INTO BBY_33_package (PACKAGE_ID, country_id, package_name, package_price, description_of_package, package_image, package_info, package_destination) VALUES (1, 1, 'Ukraine Package 1', 20, 'Contains non-perishable food, clothing, and a first-aid kit', '/img/landing1.jpg', 'Ukraine Package 1 was curated by the Ukrainian Red Cross Society, containing non-perishable food, clothing, and a first aid kit.
This care package will be distributed to a family that has been impacted by the invasion of Ukraine.', 'Ukraine');

INSERT INTO BBY_33_package (PACKAGE_ID, country_id, package_name, package_price, description_of_package, package_image, package_info, package_destination) VALUES (2, 2, 'Afghanistan Package 1', 30, 'Contains non-perishable food, children''s clothing and medicine', '/img/landing1.jpg', 'Afghanistan Package 1 was curated by Afghan Charity Organisation, containing non-perishable food, children''s clothing, and medicine. This care package
will be distributed to a family that has been displaced by due to war.', 'Afghanistan');

INSERT INTO BBY_33_package (PACKAGE_ID, country_id, package_name, package_price, description_of_package, package_image, package_info, package_destination) VALUES (3, 3, 'Yemen Package 1', 35, 'Contains non-perishable food, and drinking water', '/img/landing1.jpg', 'Yemen Package 1 was curated by the Yemen Relief and Reconstruction Foundation, containing non-perishable food and water. This care package
will be distributed to an individual in Yemen, which has been facing a prolonged famine.', 'Yemen');

INSERT INTO BBY_33_package (PACKAGE_ID, country_id, package_name, package_price, description_of_package, package_image, package_info, package_destination) VALUES (4, 4, 'Ethiopia Package 1', 30, 'Contains drinking water', '/img/landing1.jpg', 'Ethiopia Package 1 was curated by imagine1day, a non-profit organization working in Ethiopia. This care package contains drinking water,
and will be distributed to individuals in Ethiopia. Ethiopia is currently experiencing heaving flooding, which has contaminated the water supply.', 'Ethiopia');

INSERT INTO BBY_33_package (PACKAGE_ID, country_id, package_name, package_price, description_of_package, package_image, package_info, package_destination) VALUES (5, 5, 'DR Congo Package 1', 40, 'Contains non-perishable food, children''s clothing and medicine', '/img/landing1.jpg', 'DR Congo Package 1 was curated by Save the Children, containing non-perishable food, medicine and children''s clothing. This care package will be distributed to families in the
Democratic Republic of Congo, which is currently facing civil unrest.', 'Democratic Republic of Congo');

INSERT INTO BBY_33_package (PACKAGE_ID, country_id, package_name, package_price, description_of_package, package_image, package_info, package_destination) VALUES (6, 1, 'Ukraine Package 2', 40, 'Contains non-perishable food, children''s clothing, and medicine', '/img/landing1.jpg', 'Ukraine Package 2 was curated by the Ukrainian Red Cross Society, containing non-perishable food, children''s clothing, and medicine.
This care package will be distributed to a family that has been impacted by the invasion of Ukraine.', 'Ukraine');

INSERT INTO BBY_33_package (PACKAGE_ID, country_id, package_name, package_price, description_of_package, package_image, package_info, package_destination) VALUES (7, 2, 'Afghanistan Package 2', 50, 'Contains non-perishable food, children''s clothing and women''s hygiene products', '/img/landing1.jpg', 'Afghanistan Package 2 was curated by Afghan Charity Organisation, containing non-perishable food, children''s clothing, and women''s hygiene products. This care package
will be distributed to a family that has been displaced by due to war.', 'Afghanistan');

INSERT INTO BBY_33_package (PACKAGE_ID, country_id, package_name, package_price, description_of_package, package_image, package_info, package_destination) VALUES (8, 3, 'Yemen Package 2', 50, 'Contains non-perishable food, and drinking water', '/img/landing1.jpg', 'Yemen Package 2 was curated by the Yemen Relief and Reconstruction Foundation, containing non-perishable food and water. This care package
will be distributed to an individual in Yemen, which has been facing a prolonged famine.', 'Yemen');

INSERT INTO BBY_33_package (PACKAGE_ID, country_id, package_name, package_price, description_of_package, package_image, package_info, package_destination) VALUES (9, 4, 'Ethiopia Package 2', 50, 'Contains non-perishable food, and drinking water', '/img/landing1.jpg', 'Ethiopia Package 2 was curated by imagine1day, a non-profit organization working in Ethiopia. This care package contains non-perishable food, and drinking water,
and will be distributed to individuals in Ethiopia. Ethiopia is currently experiencing heaving flooding, which has contaminated the water supply.', 'Ethiopia');

INSERT INTO BBY_33_package (PACKAGE_ID, country_id, package_name, package_price, description_of_package, package_image, package_info, package_destination) VALUES (10, 5, 'DR Congo Package 2', 20, 'Contains non-perishable food, and clothing', '/img/landing1.jpg', 'DR Congo Package 2 was curated by Save the Children, containing non-perishable food, and clothing. This care package will be distributed to families in the
Democratic Republic of Congo, which is currently facing civil unrest.', 'Democratic Republic of Congo');