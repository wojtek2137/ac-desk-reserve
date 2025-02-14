ALTER TABLE "reservations" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "reservations" ADD COLUMN "user_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ADD COLUMN "user_name" varchar(255) NOT NULL;