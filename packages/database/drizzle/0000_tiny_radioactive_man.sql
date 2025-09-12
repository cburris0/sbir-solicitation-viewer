CREATE TABLE "solicitations" (
	"solicitation_id" integer PRIMARY KEY NOT NULL,
	"solicitation_title" text,
	"solicitation_number" varchar(255),
	"program" varchar(255),
	"phase" varchar(255),
	"agency" varchar(255),
	"branch" varchar(255),
	"solicitation_year" integer,
	"release_date" date,
	"open_date" date,
	"close_date" date,
	"application_due_dates" date[],
	"occurrence_number" varchar(255),
	"solicitation_agency_url" text,
	"current_status" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "solicitation_topics" (
	"topic_number" text PRIMARY KEY NOT NULL,
	"solicitation_id" integer,
	"topic_title" text,
	"branch" text,
	"topic_open_date" date,
	"topic_closed_date" date,
	"topic_description" text,
	"sbir_topic_link" text
);
--> statement-breakpoint
CREATE TABLE "subtopics" (
	"id" serial PRIMARY KEY NOT NULL,
	"solicitation_topic_id" text
);
--> statement-breakpoint
ALTER TABLE "solicitation_topics" ADD CONSTRAINT "solicitation_topics_solicitation_id_solicitations_solicitation_id_fk" FOREIGN KEY ("solicitation_id") REFERENCES "public"."solicitations"("solicitation_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtopics" ADD CONSTRAINT "subtopics_solicitation_topic_id_solicitation_topics_topic_number_fk" FOREIGN KEY ("solicitation_topic_id") REFERENCES "public"."solicitation_topics"("topic_number") ON DELETE no action ON UPDATE no action;