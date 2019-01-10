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
    "image_path" VARCHAR(255),
    "description" VARCHAR(120)
);

INSERT INTO "collection_type" ("name", "image_path", "description")
VALUES
('50 State Quarters', 'Collection-State-Quarters.jpeg', ''),
('D.C. and U.S. Territories Quarters', 'Collection-Territory-Quarters.jpeg', ''),
('America the Beautiful Quarters', 'Collection-America-Quarters.jpeg', '');

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
    "grade" VARCHAR(30) NOT NULL,
    "description" VARCHAR(120)
);

INSERT INTO "condition" ("grade", "description")
VALUES
('Fair', 'Mostly worn, though some detail is visible'),
('About Good', 'Worn rims but most lettering is readable though worn'),
('Good', 'Complete or slightly worn rims, flat detail, peripheral lettering full or nearly full'),
('Very Good', 'Design worn with slight detail'),
('Fine', 'Some deeply recessed areas with detail, all lettering sharp'),
('Very Fine', 'Some definition of detail, all lettering full and sharp'),
('Choice Very Fine', 'Almost complete detail with flat areas'),
('About Uncirculated', 'Full detail with friction over most of the surface, slight flatness on high points'),
('Choice About Uncirculated', 'Full detail with slight friction on less than 1/2 of surface, on high points');

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
  collection_name VARCHAR:='50 State Quarters';
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
(2008, 'D', 'Hawaii', collection_id, 'quarter');

--Generate Image Paths for Items
UPDATE "items" SET "image_path"=REPLACE(CONCAT("items"."year", '-', "items"."name", '.jpeg'), ' ', '-')
WHERE "image_path" IS NULL;

END$$;

--INSERT Items for DC and US Territories Quarters Collection
DO $$
DECLARE 
  collection_name VARCHAR:='D.C. and U.S. Territories Quarters';
  collection_id INTEGER:=(SELECT id FROM "collection_type" WHERE "name"=collection_name);
BEGIN
RAISE NOTICE 'For collection_name = %, collection_id = %', collection_name, collection_id;
INSERT INTO "items" ("year", "mint", "name", "collection_id", "denomination")
VALUES
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

--INSERT Items for America the Beautiful Quarters Collection
DO $$
DECLARE 
  collection_name VARCHAR:='America the Beautiful Quarters';
  collection_id INTEGER:=(SELECT id FROM "collection_type" WHERE "name"=collection_name);
BEGIN
RAISE NOTICE 'For collection_name = %, collection_id = %', collection_name, collection_id;
INSERT INTO "items" ("year", "mint", "name", "collection_id", "denomination")
VALUES
(2010, 'P', 'Hot Springs National Park', collection_id, 'quarter'),
(2010, 'D', 'Hot Springs National Park', collection_id, 'quarter'),
(2010, 'P', 'Yellowstone National Park', collection_id, 'quarter'),
(2010, 'D', 'Yellowstone National Park', collection_id, 'quarter'),
(2010, 'P', 'Yosemite National Park', collection_id, 'quarter'),
(2010, 'D', 'Yosemite National Park', collection_id, 'quarter'),
(2010, 'P', 'Grand Canyon National Park', collection_id, 'quarter'),
(2010, 'D', 'Grand Canyon National Park', collection_id, 'quarter'),
(2010, 'P', 'Mount Hood National Forest', collection_id, 'quarter'),
(2010, 'D', 'Mount Hood National Forest', collection_id, 'quarter'),
(2011, 'P', 'Gettysburg National Military Park', collection_id, 'quarter'),
(2011, 'D', 'Gettysburg National Military Park', collection_id, 'quarter'),
(2011, 'P', 'Glacier National Park', collection_id, 'quarter'),
(2011, 'D', 'Glacier National Park', collection_id, 'quarter'),
(2011, 'P', 'Olympic National Park', collection_id, 'quarter'),
(2011, 'D', 'Olympic National Park', collection_id, 'quarter'),
(2011, 'P', 'Vicksburg National Military Park', collection_id, 'quarter'),
(2011, 'D', 'Vicksburg National Military Park', collection_id, 'quarter'),
(2011, 'P', 'Chickasaw National Recreation Area', collection_id, 'quarter'),
(2011, 'D', 'Chickasaw National Recreation Area', collection_id, 'quarter'),
(2012, 'P', 'El Yunque National Forest', collection_id, 'quarter'),
(2012, 'D', 'El Yunque National Forest', collection_id, 'quarter'),
(2012, 'P', 'Chaco Culture National Historical Park', collection_id, 'quarter'),
(2012, 'D', 'Chaco Culture National Historical Park', collection_id, 'quarter'),
(2012, 'P', 'Acadia National Park', collection_id, 'quarter'),
(2012, 'D', 'Acadia National Park', collection_id, 'quarter'),
(2012, 'P', 'Hawaii Volcanoes National Park', collection_id, 'quarter'),
(2012, 'D', 'Hawaii Volcanoes National Park', collection_id, 'quarter'),
(2012, 'P', 'Denali National Park and Preserve', collection_id, 'quarter'),
(2012, 'D', 'Denali National Park and Preserve', collection_id, 'quarter'),
(2013, 'P', 'White Mountain National Park', collection_id, 'quarter'),
(2013, 'D', 'White Mountain National Park', collection_id, 'quarter'),
(2013, 'P', 'Perry''s Victory and International Peace Memorial', collection_id, 'quarter'),
(2013, 'D', 'Perry''s Victory and International Peace Memorial', collection_id, 'quarter'),
(2013, 'P', 'Great Basin National Park', collection_id, 'quarter'),
(2013, 'D', 'Great Basin National Park', collection_id, 'quarter'),
(2013, 'P', 'Fort McHenry National Monument and Historic Shrine', collection_id, 'quarter'),
(2013, 'D', 'Fort McHenry National Monument and Historic Shrine', collection_id, 'quarter'),
(2013, 'P', 'Mount Rushmore National Memorial', collection_id, 'quarter'),
(2013, 'D', 'Mount Rushmore National Memorial', collection_id, 'quarter'),
(2014, 'P', 'Great Smoky Mountains National Park', collection_id, 'quarter'),
(2014, 'D', 'Great Smoky Mountains National Park', collection_id, 'quarter'),
(2014, 'P', 'Shenandoah National Park', collection_id, 'quarter'),
(2014, 'D', 'Shenandoah National Park', collection_id, 'quarter'),
(2014, 'P', 'Arches National Park', collection_id, 'quarter'),
(2014, 'D', 'Arches National Park', collection_id, 'quarter'),
(2014, 'P', 'Great Sand Dunes National Park', collection_id, 'quarter'),
(2014, 'D', 'Great Sand Dunes National Park', collection_id, 'quarter'),
(2014, 'P', 'Everglades National Park', collection_id, 'quarter'),
(2014, 'D', 'Everglades National Park', collection_id, 'quarter'),
(2015, 'P', 'Homestead National Monument of America', collection_id, 'quarter'),
(2015, 'D', 'Homestead National Monument of America', collection_id, 'quarter'),
(2015, 'P', 'Kisatchie National Forest', collection_id, 'quarter'),
(2015, 'D', 'Kisatchie National Forest', collection_id, 'quarter'),
(2015, 'P', 'Blue Ridge Parkway', collection_id, 'quarter'),
(2015, 'D', 'Blue Ridge Parkway', collection_id, 'quarter'),
(2015, 'P', 'Bombay Hook National Wildlife Refuge', collection_id, 'quarter'),
(2015, 'D', 'Bombay Hook National Wildlife Refuge', collection_id, 'quarter'),
(2015, 'P', 'Saratoga National Historical Park', collection_id, 'quarter'),
(2015, 'D', 'Saratoga National Historical Park', collection_id, 'quarter'),
(2016, 'P', 'Shawnee National Forest', collection_id, 'quarter'),
(2016, 'D', 'Shawnee National Forest', collection_id, 'quarter'),
(2016, 'P', 'Cumberland Gap National Historical Park', collection_id, 'quarter'),
(2016, 'D', 'Cumberland Gap National Historical Park', collection_id, 'quarter'),
(2016, 'P', 'Harpers Ferry National Historical Park', collection_id, 'quarter'),
(2016, 'D', 'Harpers Ferry National Historical Park', collection_id, 'quarter'),
(2016, 'P', 'Theodore Roosevelt National Park', collection_id, 'quarter'),
(2016, 'D', 'Theodore Roosevelt National Park', collection_id, 'quarter'),
(2016, 'P', 'Fort Moultrie at Fort Sumter National Monument', collection_id, 'quarter'),
(2016, 'D', 'Fort Moultrie at Fort Sumter National Monument', collection_id, 'quarter'),
(2017, 'P', 'Effigy Mounds National Monument', collection_id, 'quarter'),
(2017, 'D', 'Effigy Mounds National Monument', collection_id, 'quarter'),
(2017, 'P', 'Frederick Douglass National Historic Site', collection_id, 'quarter'),
(2017, 'D', 'Frederick Douglass National Historic Site', collection_id, 'quarter'),
(2017, 'P', 'Ozark National Scenic Riverways', collection_id, 'quarter'),
(2017, 'D', 'Ozark National Scenic Riverways', collection_id, 'quarter'),
(2017, 'P', 'Ellis Island', collection_id, 'quarter'),
(2017, 'D', 'Ellis Island', collection_id, 'quarter'),
(2017, 'P', 'George Rogers Clark National Historical Park', collection_id, 'quarter'),
(2017, 'D', 'George Rogers Clark National Historical Park', collection_id, 'quarter'),
(2018, 'P', 'Pictured Rocks National Lakeshore', collection_id, 'quarter'),
(2018, 'D', 'Pictured Rocks National Lakeshore', collection_id, 'quarter'),
(2018, 'P', 'Apostle Islands National Lakeshore', collection_id, 'quarter'),
(2018, 'D', 'Apostle Islands National Lakeshore', collection_id, 'quarter'),
(2018, 'P', 'Voyageurs National Park', collection_id, 'quarter'),
(2018, 'D', 'Voyageurs National Park', collection_id, 'quarter'),
(2018, 'P', 'Cumberland Island National Seashore', collection_id, 'quarter'),
(2018, 'D', 'Cumberland Island National Seashore', collection_id, 'quarter'),
(2018, 'P', 'Block Island National Wildlife Refuge', collection_id, 'quarter'),
(2018, 'D', 'Block Island National Wildlife Refuge', collection_id, 'quarter'),
(2019, 'P', 'Lowell National Historical Park', collection_id, 'quarter'),
(2019, 'D', 'Lowell National Historical Park', collection_id, 'quarter'),
(2019, 'P', 'American Memorial Park', collection_id, 'quarter'),
(2019, 'D', 'American Memorial Park', collection_id, 'quarter'),
(2019, 'P', 'War in the Pacific National Historical Park', collection_id, 'quarter'),
(2019, 'D', 'War in the Pacific National Historical Park', collection_id, 'quarter'),
(2019, 'P', 'San Antonio Missions National Historical Park', collection_id, 'quarter'),
(2019, 'D', 'San Antonio Missions National Historical Park', collection_id, 'quarter'),
(2019, 'P', 'Frank Church River of No Return Wilderness', collection_id, 'quarter'),
(2019, 'D', 'Frank Church River of No Return Wilderness', collection_id, 'quarter');

--Generate Image Paths for Items
UPDATE "items" SET "image_path"=REPLACE(CONCAT("items"."year", '-', "items"."name", '.jpeg'), ' ', '-')
WHERE "image_path" IS NULL;

END$$;