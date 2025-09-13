import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { solicitationTopic } from "./solicitation-topic";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const subtopic = pgTable("subtopics", {
    id: serial("id").primaryKey(),
    solicitationTopicId: text("solicitation_topic_id").references(() => solicitationTopic.topicNumber)
});

export const subtopicRelations = relations(subtopic, ({ one }) => ({
    solicitation: one(solicitationTopic, {
        fields: [subtopic.solicitationTopicId],
        references: [solicitationTopic.topicNumber]
    })
}));

export type SubtopicSelect = typeof subtopic.$inferSelect;
export type SubtopicInsert = typeof subtopic.$inferInsert;
export const SubtopicSelect = createSelectSchema(subtopic);
export const SubtopicInsert = createInsertSchema(subtopic);