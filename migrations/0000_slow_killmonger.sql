CREATE TABLE `reservations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`desk_id` integer NOT NULL,
	`date_from` text NOT NULL,
	`date_to` text NOT NULL
);
