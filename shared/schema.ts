import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// No need for a database model for this application as we're not storing data
// But we'll define the types for our API responses

export const seoAnalysisSchema = z.object({
  url: z.string().url(),
  title: z.string().optional(),
  description: z.string().optional(),
  charset: z.string().optional(),
  viewport: z.string().optional(),
  language: z.string().optional(),
  canonical: z.string().optional(),
  robots: z.string().optional(),
  ogTags: z.record(z.string(), z.string()).optional(),
  twitterTags: z.record(z.string(), z.string()).optional(),
  otherTags: z.record(z.string(), z.string()).optional(),
  score: z.number().optional(),
  issues: z.array(
    z.object({
      type: z.enum(["error", "warning", "info"]),
      message: z.string(),
      recommendation: z.string(),
    })
  ).optional(),
  bestPractices: z.array(
    z.object({
      name: z.string(),
      implemented: z.boolean(),
      description: z.string().optional(),
    })
  ).optional(),
});

export type SEOAnalysis = z.infer<typeof seoAnalysisSchema>;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
