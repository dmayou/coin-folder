CREATE DATABASE "coin_folder";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "user_name" VARCHAR (15) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT FALSE,
    "last_name" VARCHAR (50),
    "first_name" VARCHAR (30),
    "email_address" VARCHAR(255),
    "accepts_contact" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "collection_type" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(60) NOT NULL
);

INSERT INTO "collection_type" ("name")
VALUES('Statehood Quarters'), ('Monument Quarters');

CREATE TABLE "items" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(60) NOT NULL,
    "collection_id" INT NOT NULL REFERENCES "collection_type",
    "image_path" VARCHAR(255),
    "year" INT,
    "denomination" VARCHAR(20),
    "mint" VARCHAR(2)
);

CREATE TABLE "condition" (
    "id" SERIAL PRIMARY KEY,
    "grade" VARCHAR(20) NOT NULL,
    "description" VARCHAR(100)
);

CREATE TABLE "user_collections" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user" NOT NULL,
    "collection_id" INTEGER REFERENCES "collection_type" NOT NULL
);

CREATE TABLE "collection_items" (
    "id" SERIAL PRIMARY KEY,
    "user_collection_id" INTEGER REFERENCES "user_collections",
    "item_id" INTEGER REFERENCES "items",
    "found" BOOLEAN DEFAULT FALSE NOT NULL,
    "date_found" DATE,
    "condition_id" INTEGER REFERENCES "condition",
    "location_found" VARCHAR(60),
    "will_trade" BOOLEAN DEFAULT FALSE
);

--INSERT Items for Statehood Quarters Collection
DO $$
DECLARE 
  collection_name VARCHAR:='Statehood Quarters';
  collection_id INTEGER:=(SELECT id FROM "collection_type" WHERE "name"=collection_name);
BEGIN
RAISE NOTICE 'For collection_name = %, collection_id = %', collection_name, collection_id;
INSERT INTO "items" ("year", "mint", "name", "collection_id", "denomination")
VALUES
(1999, 'P', 'Delaware', collection_id, 'quarter'),
(1999, 'D', 'Delaware', collection_id, 'quarter'),
(1999, 'P', 'Pennsylvania', collection_id, 'quarter'),
(1999, 'D', 'Pennsylvania', collection_id, 'quarter'),
(1999, 'P', 'New Jersey', collection_id, 'quarter'),
(1999, 'D', 'New Jersey', collection_id, 'quarter'),
(1999, 'P', 'Georgia', collection_id, 'quarter'),
(1999, 'D', 'Georgia', collection_id, 'quarter'),
(1999, 'P', 'Connecticut', collection_id, 'quarter'),
(1999, 'D', 'Connecticut', collection_id, 'quarter'),
(2000, 'P', 'Massachusets', collection_id, 'quarter'),
(2000, 'D', 'Massachusets', collection_id, 'quarter'),
(2000, 'P', 'Maryland', collection_id, 'quarter'),
(2000, 'D', 'Maryland', collection_id, 'quarter'),
(2000, 'P', 'South Carolina', collection_id, 'quarter'),
(2000, 'D', 'South Carolina', collection_id, 'quarter'),
(2000, 'P', 'New Hampshire', collection_id, 'quarter'),
(2000, 'D', 'New Hampshire', collection_id, 'quarter'),
(2000, 'P', 'Virginia', collection_id, 'quarter'),
(2000, 'D', 'Virginia', collection_id, 'quarter'),
(2001, 'P', 'New York', collection_id, 'quarter'),
(2001, 'D', 'New York', collection_id, 'quarter'),
(2001, 'P', 'North Carolina', collection_id, 'quarter'),
(2001, 'D', 'North Carolina', collection_id, 'quarter'),
(2001, 'P', 'Rhode Island', collection_id, 'quarter'),
(2001, 'D', 'Rhode Island', collection_id, 'quarter'),
(2001, 'P', 'Vermont', collection_id, 'quarter'),
(2001, 'D', 'Vermont', collection_id, 'quarter'),
(2001, 'P', 'Kentucky', collection_id, 'quarter'),
(2001, 'D', 'Kentucky', collection_id, 'quarter'),
(2002, 'P', 'Tennessee', collection_id, 'quarter'),
(2002, 'D', 'Tennessee', collection_id, 'quarter'),
(2002, 'P', 'Ohio', collection_id, 'quarter'),
(2002, 'D', 'Ohio', collection_id, 'quarter'),
(2002, 'P', 'Louisiana', collection_id, 'quarter'),
(2002, 'D', 'Louisiana', collection_id, 'quarter'),
(2002, 'P', 'Indiana', collection_id, 'quarter'),
(2002, 'D', 'Indiana', collection_id, 'quarter'),
(2002, 'P', 'Mississippi', collection_id, 'quarter'),
(2002, 'D', 'Mississippi', collection_id, 'quarter'),
(2003, 'P', 'Illinois', collection_id, 'quarter'),
(2003, 'D', 'Illinois', collection_id, 'quarter'),
(2003, 'P', 'Alabama', collection_id, 'quarter'),
(2003, 'D', 'Alabama', collection_id, 'quarter'),
(2003, 'P', 'Maine', collection_id, 'quarter'),
(2003, 'D', 'Maine', collection_id, 'quarter'),
(2003, 'P', 'Missouri', collection_id, 'quarter'),
(2003, 'D', 'Missouri', collection_id, 'quarter'),
(2003, 'P', 'Arkansas', collection_id, 'quarter'),
(2003, 'D', 'Arkansas', collection_id, 'quarter'),
(2004, 'P', 'Michigan', collection_id, 'quarter'),
(2004, 'D', 'Michigan', collection_id, 'quarter'),
(2004, 'P', 'Florida', collection_id, 'quarter'),
(2004, 'D', 'Florida', collection_id, 'quarter'),
(2004, 'P', 'Texas', collection_id, 'quarter'),
(2004, 'D', 'Texas', collection_id, 'quarter'),
(2004, 'P', 'Iowa', collection_id, 'quarter'),
(2004, 'D', 'Iowa', collection_id, 'quarter'),
(2004, 'P', 'Wisconsin', collection_id, 'quarter'),
(2004, 'D', 'Wisconsin', collection_id, 'quarter'),
(2005, 'P', 'California', collection_id, 'quarter'),
(2005, 'D', 'California', collection_id, 'quarter'),
(2005, 'P', 'Minnesota', collection_id, 'quarter'),
(2005, 'D', 'Minnesota', collection_id, 'quarter'),
(2005, 'P', 'Oregon', collection_id, 'quarter'),
(2005, 'D', 'Oregon', collection_id, 'quarter'),
(2005, 'P', 'Kansas', collection_id, 'quarter'),
(2005, 'D', 'Kansas', collection_id, 'quarter'),
(2005, 'P', 'West Virginia', collection_id, 'quarter'),
(2005, 'D', 'West Virginia', collection_id, 'quarter'),
(2006, 'P', 'Nevada', collection_id, 'quarter'),
(2006, 'D', 'Nevada', collection_id, 'quarter'),
(2006, 'P', 'Nebraska', collection_id, 'quarter'),
(2006, 'D', 'Nebraska', collection_id, 'quarter'),
(2006, 'P', 'Colorado', collection_id, 'quarter'),
(2006, 'D', 'Colorado', collection_id, 'quarter'),
(2006, 'P', 'North Dakota', collection_id, 'quarter'),
(2006, 'D', 'North Dakota', collection_id, 'quarter'),
(2006, 'P', 'South Dakota', collection_id, 'quarter'),
(2006, 'D', 'South Dakota', collection_id, 'quarter'),
(2007, 'P', 'Montana', collection_id, 'quarter'),
(2007, 'D', 'Montana', collection_id, 'quarter'),
(2007, 'P', 'Washington', collection_id, 'quarter'),
(2007, 'D', 'Washington', collection_id, 'quarter'),
(2007, 'P', 'Idaho', collection_id, 'quarter'),
(2007, 'D', 'Idaho', collection_id, 'quarter'),
(2007, 'P', 'Wyoming', collection_id, 'quarter'),
(2007, 'D', 'Wyoming', collection_id, 'quarter'),
(2007, 'P', 'Utah', collection_id, 'quarter'),
(2007, 'D', 'Utah', collection_id, 'quarter'),
(2008, 'P', 'Oklahoma', collection_id, 'quarter'),
(2008, 'D', 'Oklahoma', collection_id, 'quarter'),
(2008, 'P', 'New Mexico', collection_id, 'quarter'),
(2008, 'D', 'New Mexico', collection_id, 'quarter'),
(2008, 'P', 'Arizona', collection_id, 'quarter'),
(2008, 'D', 'Arizona', collection_id, 'quarter'),
(2008, 'P', 'Alaska', collection_id, 'quarter'),
(2008, 'D', 'Alaska', collection_id, 'quarter'),
(2008, 'P', 'Hawaii', collection_id, 'quarter'),
(2008, 'D', 'Hawaii', collection_id, 'quarter'),
(2009, 'P', 'District of Columbia', collection_id, 'quarter'),
(2009, 'D', 'District of Columbia', collection_id, 'quarter'),
(2009, 'P', 'Puerto Rico', collection_id, 'quarter'),
(2009, 'D', 'Puerto Rico', collection_id, 'quarter'),
(2009, 'P', 'Guam', collection_id, 'quarter'),
(2009, 'D', 'Guam', collection_id, 'quarter'),
(2009, 'P', 'American Samoa', collection_id, 'quarter'),
(2009, 'D', 'American Samoa', collection_id, 'quarter'),
(2009, 'P', 'U.S. Virgin Islands', collection_id, 'quarter'),
(2009, 'D', 'U.S. Virgin Islands', collection_id, 'quarter'),
(2009, 'P', 'Northern Mariana Islands', collection_id, 'quarter'),
(2009, 'D', 'Northern Mariana Islands', collection_id, 'quarter');

--Generate Image Paths for Items
UPDATE "items" SET "image_path"=REPLACE(CONCAT("items"."year", '-', "items"."name", '.jpeg'), ' ', '-')
WHERE "image_path" IS NULL;

END$$;
