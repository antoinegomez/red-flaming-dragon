CREATE TABLE `sleep_tracking` (
	`sleep_tracking_id` text PRIMARY KEY NOT NULL,
	`name` text,
	`gender` text,
	`tracked_date` text,
	`duration` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text
);
