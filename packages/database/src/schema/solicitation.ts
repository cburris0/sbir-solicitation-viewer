import { relations } from "drizzle-orm";
import { date, varchar, text, pgTable, integer, pgEnum, unique, uuid, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { solicitationTopic } from "./solicitation-topic";

export const currentStatusEnum = pgEnum("currentStatus", ["open", "closed", "future"]);
export const phaseEnum = pgEnum("phase", ["Phase I", "Phase II", "BOTH"]);
export const programEnum = pgEnum("program", ["SBIR", "STTR", "BOTH"]);

export const solicitation = pgTable("solicitations", {
    id: uuid("id").defaultRandom().primaryKey(),
    solicitationNumber: varchar("solicitation_number", { length: 20 }),
    solicitationId: integer("solicitation_id"),
    solicitationTitle: text("solicitation_title").notNull(),
    program: programEnum("program").notNull(),
    phase: phaseEnum("phase").notNull(),
    agency: varchar("agency", { length: 4 }).notNull(),
    branch: varchar("branch", { length: 4 }),
    solicitationYear: integer("solicitation_year").notNull(),
    releaseDate: date("release_date").notNull(),
    openDate: date("open_date").notNull(),
    closeDate: date("close_date").notNull(),
    applicationDueDate: date("application_due_dates").array(),
    occurrenceNumber: varchar("occurrence_number", { length: 1 }),
    solicitationAgencyUrl: text("solicitation_agency_url").notNull(),
    currentStatus: currentStatusEnum("current_status")
}, (table) => ({
		uniqueSolicitation: unique().on(table.solicitationId, table.solicitationTitle),
		solicitationNumberIdx: index("solicitation_number_idx").on(table.solicitationNumber),
		solicitationIdIdx: index("solicitation_id_idx").on(table.solicitationId),
		programIdx: index("program_idx").on(table.program),
	}),
);

export const solicitationRelations = relations(solicitation, ({ many }) => ({
	solicitationTopics: many(solicitationTopic),
}));

export type SolicitationSelect = typeof solicitation.$inferSelect;
export type SolicitationInsert = typeof solicitation.$inferInsert;
export const SolicitationSelect = createSelectSchema(solicitation);
export const SolicitationInsert = createInsertSchema(solicitation);
