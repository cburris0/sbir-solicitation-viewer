CREATE TYPE "public"."currentStatus" AS ENUM('open', 'closed', 'future');--> statement-breakpoint
CREATE TYPE "public"."phase" AS ENUM('Phase I', 'Phase II', 'BOTH');--> statement-breakpoint
CREATE TYPE "public"."program" AS ENUM('SBIR', 'STTR', 'BOTH');--> statement-breakpoint
CREATE TABLE "solicitations" (
	"solicitation_id" integer PRIMARY KEY NOT NULL,
	"solicitation_title" text NOT NULL,
	"solicitation_number" varchar(20),
	"program" "program" NOT NULL,
	"phase" "phase" NOT NULL,
	"agency" varchar(4) NOT NULL,
	"branch" varchar(4),
	"solicitation_year" integer NOT NULL,
	"release_date" date NOT NULL,
	"open_date" date NOT NULL,
	"close_date" date NOT NULL,
	"application_due_dates" date[],
	"occurrence_number" varchar(1),
	"solicitation_agency_url" text NOT NULL,
	"current_status" "currentStatus"
);
--> statement-breakpoint
CREATE TABLE "solicitation_topics" (
	"topic_number" text PRIMARY KEY NOT NULL,
	"solicitation_id" integer,
	"topic_title" text NOT NULL,
	"branch" text,
	"topic_open_date" date,
	"topic_closed_date" date,
	"topic_description" text,
	"sbir_topic_link" text
);
--> statement-breakpoint
CREATE TABLE "subtopics" (
	"id" serial PRIMARY KEY NOT NULL,
	"solicitation_topic_id" text,
	"subtopic_title" varchar(255) NOT NULL,
	"branch" varchar(4),
	"subtopic_number" varchar(15) NOT NULL,
	"subtopic_description" text,
	"sbir_subtopic_link" text
);
--> statement-breakpoint
ALTER TABLE "solicitation_topics" ADD CONSTRAINT "solicitation_topics_solicitation_id_solicitations_solicitation_id_fk" FOREIGN KEY ("solicitation_id") REFERENCES "public"."solicitations"("solicitation_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtopics" ADD CONSTRAINT "subtopics_solicitation_topic_id_solicitation_topics_topic_number_fk" FOREIGN KEY ("solicitation_topic_id") REFERENCES "public"."solicitation_topics"("topic_number") ON DELETE no action ON UPDATE no action;