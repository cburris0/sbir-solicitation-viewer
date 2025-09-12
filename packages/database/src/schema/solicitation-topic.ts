import { relations } from "drizzle-orm";
import { date, varchar, text, serial, pgTable, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { subtopic } from "./subtopic";
import { solicitation } from "./solicitation";

export const solicitationTopic = pgTable("solicitation_topics", {
    topicNumber: text("topic_number").primaryKey(),
    solicitationId: integer("solicitation_id").references(() => solicitation.solicitationId),
    topicTitle: text("topic_title"),
    branch: text("branch"),
    topicOpenDate: date("topic_open_date"),
    topicClosedDate: date("topic_closed_date"),
    topicDescription: text("topic_description"),
    sbirTopicLink: text("sbir_topic_link"),
});

export const solicitationTopicsRelations = relations(solicitationTopic, ({ one, many }) => ({
    solicitation: one(solicitation, {
        fields: [solicitationTopic.solicitationId],
        references: [solicitation.solicitationId]
    }),
    subtopics: many(subtopic)
}));

export type SolicitationTopicSelect = typeof solicitationTopic.$inferSelect;
export type SolicitationTopicInsert = typeof solicitationTopic.$inferInsert;
export const SolicitationTopicSelect = createSelectSchema(solicitationTopic);
export const SolicitationTopicInsert = createInsertSchema(solicitationTopic);