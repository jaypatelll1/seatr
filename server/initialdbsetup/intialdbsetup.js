// Function to initialize the database schema
const {query} = require('../config/db')



// SQL queries to create tables
const createTablesQuery = `
-- Enums Table
CREATE TABLE IF NOT EXISTS Enums (
    enum_id SERIAL PRIMARY KEY,
    enum_type VARCHAR(255) NOT NULL,
    enum_value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (enum_type, enum_value)
);

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role INT NOT NULL, -- FK referencing Enums for role
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role) REFERENCES Enums(enum_id) ON DELETE CASCADE
);

-- Restaurants Table
CREATE TABLE IF NOT EXISTS Restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    contact_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Tables Table
CREATE TABLE IF NOT EXISTS Tables (
    table_id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    capacity INT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS Bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    table_id INT NOT NULL,
    booking_time TIMESTAMP NOT NULL,
    status INT NOT NULL, -- FK referencing Enums for status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    FOREIGN KEY (table_id) REFERENCES Tables(table_id) ON DELETE CASCADE,
    FOREIGN KEY (status) REFERENCES Enums(enum_id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

-- ModerationLogs Table
CREATE TABLE IF NOT EXISTS ModerationLogs (
    log_id SERIAL PRIMARY KEY,
    admin_id INT NOT NULL,
    action INT NOT NULL, -- FK referencing Enums for action
    target_id INT NOT NULL,
    target_type INT NOT NULL, -- FK referencing Enums for target_type
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (action) REFERENCES Enums(enum_id) ON DELETE CASCADE,
    FOREIGN KEY (target_type) REFERENCES Enums(enum_id) ON DELETE CASCADE
);
`;

const seedEnumsQuery = `
-- Insert initial data into Enums table
INSERT INTO Enums (enum_type, enum_value) VALUES
('role', 'admin'),
('role', 'restaurant'),
('role', 'user'),
('action', 'delete_review'),
('action', 'block_user'),
('action', 'update_restaurant'),
('action', 'other'),
('target_type', 'user'),
('target_type', 'restaurant'),
('target_type', 'review'),
('status', 'pending'),
('status', 'confirmed'),
('status', 'cancelled')
ON CONFLICT (enum_type, enum_value) DO NOTHING;
`;







async function initializeDB() {
    try {
        console.log('Creating tables...');
        await query(createTablesQuery);
    
        console.log('Seeding initial enum values...');
        await query(seedEnumsQuery);
        console.log('Database setup completed successfully!');
    } catch (error) {
      console.log(error);
    } 
  }
  initializeDB();
  