CREATE EXTENSION pgcrypto;
CREATE TABLE "user" ("id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(), "username" text NOT NULL, "password" text NOT NULL);
CREATE TABLE "category" ("id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "name" text NOT NULL, "colour" text NOT NULL, "budget" numeric, "type" text NOT NULL);
CREATE TABLE "transaction" ("id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "category_id" uuid NOT NULL, "amount" numeric NOT NULL, "date" bigint NOT NULL, "note" text, "upcoming" boolean);