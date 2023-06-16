-- Not tested yet

CREATE SCHEMA users;
CREATE TABLE users.users (
    username VARCHAR(32) PRIMARY KEY,
    pass VARCHAR(60) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE,
    socials TEXT[] NULL,
    premium BOOLEAN DEFAULT FALSE
);

CREATE SCHEMA organizers;
CREATE TABLE organizers.organizers (
    org_id VARCHAR(32) PRIMARY KEY,
    display_name VARCHAR(64),
    organizer_description TEXT,
    pass VARCHAR(60) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(13) UNIQUE,
    socials TEXT[] NULL,
    premium BOOLEAN DEFAULT FALSE
);

CREATE SCHEMA experiences;
CREATE TABLE experiences.experiences (
    event_id UUID PRIMARY key default gen_random_uuid(),
    event_name VARCHAR(255) NOT NULL,
    capacity INT,
    event_location TEXT,
    event_start TIMESTAMPTZ,
    event_end TIMESTAMPTZ,
    event_description TEXT,
    category TEXT,
    tags TEXT[],
    attendees TEXT[],
    org_id VARCHAR(32) references organizers.organizers(org_id),
    user_id VARCHAR(32) references users.users(username),
    CHECK ((org_id IS NOT NULL AND user_id IS NULL) OR (org_id IS NULL AND user_id IS NOT NULL)),
    CHECK (event_start < event_end),
    CHECK (capacity > 0),
    UNIQUE (event_name, org_id),
    UNIQUE (event_name, user_id)
);

CREATE TYPE attending_status_type AS ENUM ('attending', 'attended', 'interested');
CREATE TABLE users.user_attending_status (
    username VARCHAR(32) PRIMARY KEY references users(username),
    event_id VARCHAR(255) references experiences.experiences(event_id),
    attending attending_status_type
);
