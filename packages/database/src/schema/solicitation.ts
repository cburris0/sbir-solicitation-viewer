import { relations } from "drizzle-orm";
import { date, varchar, text, pgTable, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { solicitationTopic } from "./solicitation-topic";

export const solicitation = pgTable("solicitations", {
    solicitationId: integer("solicitation_id").primaryKey(),
    solicitationTitle: text("solicitation_title"),
    solicitationNumber: varchar("solicitation_number", { length: 255 }),
    program: varchar("program", { length: 255 }),
    phase: varchar("phase", { length: 255 }),
    agency: varchar("agency", { length: 255 }),
    branch: varchar("branch", { length: 255 }),
    solicitationYear: integer("solicitation_year"),
    releaseDate: date("release_date"), // dash vs slash - will it be an issue?
    openDate: date("open_date"), // dash vs slash - will it be an issue?
    closeDate: date("close_date"), // dash vs slash - will it be an issue?
    applicationDueDate: date("application_due_dates").array(),
    occurrenceNumber: varchar("occurrence_number", { length: 255 }),
    solicitationAgencyUrl: text("solicitation_agency_url"),
    currentStatus: varchar("current_status", { length: 255 }), //make enum for this value?
});

export const solicitationRelations = relations(solicitation, ({ many }) => ({
    solicitationTopics: many(solicitationTopic)
}));

export type SolicitationSelect = typeof solicitation.$inferSelect;
export type SolicitationInsert = typeof solicitation.$inferInsert;
export const SolicitationSelect = createSelectSchema(solicitation);
export const SolicitationInsert = createInsertSchema(solicitation);