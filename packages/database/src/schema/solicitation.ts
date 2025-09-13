import { relations } from "drizzle-orm";
import { date, varchar, text, pgTable, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { solicitationTopic } from "./solicitation-topic";

export const currentStatusEnum = pgEnum("currentStatus", ["open", "closed", "future"]);
export const phaseEnum = pgEnum("phase", ["Phase I", "Phase II", "BOTH"]);
export const programEnum = pgEnum("program", ["SBIR", "STTR", "BOTH"]);

export const solicitation = pgTable("solicitations", {
    solicitationId: integer("solicitation_id").primaryKey(),
    solicitationTitle: text("solicitation_title").notNull(),
    solicitationNumber: varchar("solicitation_number", { length: 20 }),
    program: programEnum("program").notNull(),
    phase: phaseEnum("phase").notNull(),
    agency: varchar("agency", { length: 4 }).notNull(),
    branch: varchar("branch", { length: 4 }),
    solicitationYear: integer("solicitation_year").notNull(),
    releaseDate: date("release_date").notNull(), // dash vs slash - will it be an issue?
    openDate: date("open_date").notNull(), // dash vs slash - will it be an issue?
    closeDate: date("close_date").notNull(), // dash vs slash - will it be an issue?
    applicationDueDate: date("application_due_dates").array(),
    occurrenceNumber: varchar("occurrence_number", { length: 1 }),
    solicitationAgencyUrl: text("solicitation_agency_url").notNull(),
    currentStatus: currentStatusEnum("current_status")
});

export const solicitationRelations = relations(solicitation, ({ many }) => ({
    solicitationTopics: many(solicitationTopic)
}));

export type SolicitationSelect = typeof solicitation.$inferSelect;
export type SolicitationInsert = typeof solicitation.$inferInsert;
export const SolicitationSelect = createSelectSchema(solicitation);
export const SolicitationInsert = createInsertSchema(solicitation);