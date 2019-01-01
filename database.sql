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