CREATE TYPE "public"."currentStatus" AS ENUM('open', 'closed', 'future');--> statement-breakpoint
CREATE TYPE "public"."phase" AS ENUM('Phase I', 'Phase II', 'BOTH');--> statement-breakpoint
CREATE TYPE "public"."program" AS ENUM('SBIR', 'STTR', 'BOTH');--> statement-breakpoint
CREATE TABLE "solicitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"solicitation_number" varchar(20),
	"solicitation_id" integer,
	"solicitation_title" text NOT NULL,
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
	"current_status" "currentStatus",
	CONSTRAINT "solicitations_solicitation_id_solicitation_title_unique" UNIQUE("solicitation_id","solicitation_title")
);
--> statement-breakpoint
CREATE TABLE "solicitation_topics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic_number" text NOT NULL,
	"solicitation_id" uuid NOT NULL,
	"topic_title" text NOT NULL,
	"branch" text,
	"topic_open_date" date,
	"topic_closed_date" date,
	"topic_description" text,
	"sbir_topic_link" text
);
--> statement-breakpoint
CREATE TABLE "subtopics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"solicitation_topic_id" uuid NOT NULL,
	"subtopic_title" varchar(255) NOT NULL,
	"branch" varchar(4),
	"subtopic_number" varchar(15) NOT NULL,
	"subtopic_description" text,
	"sbir_subtopic_link" text
);
--> statement-breakpoint
ALTER TABLE "solicitation_topics" ADD CONSTRAINT "solicitation_topics_solicitation_id_solicitations_id_fk" FOREIGN KEY ("solicitation_id") REFERENCES "public"."solicitations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtopics" ADD CONSTRAINT "subtopics_solicitation_topic_id_solicitation_topics_id_fk" FOREIGN KEY ("solicitation_topic_id") REFERENCES "public"."solicitation_topics"("id") ON DELETE no action ON UPDATE no action;