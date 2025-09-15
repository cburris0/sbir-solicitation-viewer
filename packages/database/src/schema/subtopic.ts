import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { solicitationTopic } from "./solicitation-topic";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const subtopic = pgTable("subtopics", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    solicitationTopicId: uuid("solicitation_topic_id").references(() => solicitationTopic.id).notNull(),
    subtopicTitle: varchar("subtopic_title", { length: 255 }).notNull(),
    branch: varchar("branch", { length: 4 }),
    subtopicNumber: varchar("subtopic_number", { length: 15 }).notNull(),
    subtopicDescription: text("subtopic_description"),
    sbirSubtopicLink: text("sbir_subtopic_link")
});

export const subtopicRelations = relations(subtopic, ({ one }) => ({
    solicitation: one(solicitationTopic, {
        fields: [subtopic.solicitationTopicId],
        references: [solicitationTopic.id]
    })
}));

export type SubtopicSelect = typeof subtopic.$inferSelect;
export type SubtopicInsert = typeof subtopic.$inferInsert;
export const SubtopicSelect = createSelectSchema(subtopic);
export const SubtopicInsert = createInsertSchema(subtopic);