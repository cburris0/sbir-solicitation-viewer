import { relations } from "drizzle-orm";
import { date, text, pgTable, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { subtopic } from "./subtopic";
import { solicitation } from "./solicitation";

export const solicitationTopic = pgTable("solicitation_topics", {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    topicNumber: text("topic_number").notNull(),
    solicitationId: uuid("solicitation_id").references(() => solicitation.id).notNull(),
    topicTitle: text("topic_title").notNull(),
    branch: text("branch"),
    topicOpenDate: date("topic_open_date"),
    topicClosedDate: date("topic_closed_date"),
    topicDescription: text("topic_description"),
    sbirTopicLink: text("sbir_topic_link"),
});

export const solicitationTopicsRelations = relations(solicitationTopic, ({ one, many }) => ({
    solicitation: one(solicitation, {
        fields: [solicitationTopic.solicitationId],
        references: [solicitation.id]
    }),
    subtopics: many(subtopic)
}));

export type SolicitationTopicSelect = typeof solicitationTopic.$inferSelect;
export type SolicitationTopicInsert = typeof solicitationTopic.$inferInsert;
export const SolicitationTopicSelect = createSelectSchema(solicitationTopic);
export const SolicitationTopicInsert = createInsertSchema(solicitationTopic);