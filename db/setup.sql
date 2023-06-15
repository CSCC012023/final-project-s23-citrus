CREATE TABLE users (
    username VARCHAR(32) PRIMARY KEY,
    pass VARCHAR(60) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE,
    socials TEXT[] NULL,
    premium BOOLEAN DEFAULT FALSE,
    attending_events TEXT[] NULL,
    attended_events TEXT[] NULL,
    interested_events TEXT[] NULL,
    organized_events TEXT[] NULL
);

CREATE TABLE experiences (
    event_id VARCHAR(255) PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    capacity INT,
    event_location TEXT,
    event_start TIMESTAMPTZ,
    event_end TIMESTAMPTZ,
    event_description TEXT,
    category TEXT,
    tags TEXT[],
    attendees TEXT[],
    org_id VARCHAR(255) FOREIGN KEY
);

CREATE TABLE user_experiences (
    event_id VARCHAR(255) PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    capacity INT,
    event_location TEXT,
    event_start TIMESTAMPTZ,
    event_end TIMESTAMPTZ,
    event_description TEXT,
    category TEXT,
    tags TEXT[],
    attendees TEXT[],
    user_id VARCHAR(255) FOREIGN KEY
);

CREATE TABLE organizers (
    org_id VARCHAR(32) PRIMARY KEY,
    display_name VARCHAR(64),
    organizer_description TEXT,
    pass VARCHAR(60) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(13) UNIQUE,
    socials TEXT[] NULL,
    premium BOOLEAN DEFAULT FALSE,
    events TEXT[] NULL
)
