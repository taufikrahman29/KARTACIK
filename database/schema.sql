-- ==============================================================================
-- DATABASE SCHEMA: KARANG TARUNA KECAMATAN CIKANCUNG & GRAB KT PLATFORM
-- RDBMS: MySQL 8.0+ / MariaDB 10.5+
-- Framework Compatibility: Laravel 10+ / Express.js / Next.js
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `kartabacip_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `kartabacip_db`;

-- 1. USERS TABLE (Authentication & Roles: ADMIN, CUSTOMER, DRIVER)
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `phone` VARCHAR(30) UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('ADMIN', 'CUSTOMER', 'DRIVER') NOT NULL DEFAULT 'CUSTOMER',
  `status` ENUM('ACTIVE', 'SUSPENDED', 'PENDING') NOT NULL DEFAULT 'ACTIVE',
  `remember_token` VARCHAR(100) NULL,
  `email_verified_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PROFILES TABLE
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `avatar` VARCHAR(500) NULL,
  `address` TEXT NULL,
  `village_name` VARCHAR(100) NULL,
  `ktp_number` VARCHAR(30) NULL,
  `bio` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS `categories` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) UNIQUE NOT NULL,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. NEWS ARTICLES TABLE
CREATE TABLE IF NOT EXISTS `news` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `author_id` BIGINT UNSIGNED NOT NULL,
  `category_id` BIGINT UNSIGNED NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) UNIQUE NOT NULL,
  `thumbnail` VARCHAR(500) NULL,
  `summary` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `instagram_url` VARCHAR(500) NULL,
  `is_published` BOOLEAN DEFAULT TRUE,
  `views_count` INT UNSIGNED DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. AGENDAS TABLE
CREATE TABLE IF NOT EXISTS `agendas` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `event_date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NULL,
  `location` VARCHAR(255) NOT NULL,
  `organizer` VARCHAR(255) DEFAULT 'Karang Taruna Kecamatan Cikancung',
  `status` ENUM('AKAN DATANG', 'BERLANGSUNG', 'SELESAI') DEFAULT 'AKAN DATANG',
  `description` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS `announcements` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `is_important` BOOLEAN DEFAULT FALSE,
  `content` TEXT NOT NULL,
  `attachment_path` VARCHAR(500) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. GALLERIES TABLE
CREATE TABLE IF NOT EXISTS `galleries` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` ENUM('Kegiatan Sosial', 'Olahraga', 'Kepemudaan', 'PHBN', 'UMKM', 'Kegiatan Kecamatan') NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `event_date` DATE NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. ORGANIZATION MEMBERS TABLE
CREATE TABLE IF NOT EXISTS `organization_members` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `division` VARCHAR(150) NULL,
  `photo_url` VARCHAR(500) NULL,
  `phone` VARCHAR(30) NULL,
  `village_name` VARCHAR(100) NOT NULL,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. CONTACTS & INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `whatsapp` VARCHAR(30) NOT NULL,
  `subject` VARCHAR(255) NULL,
  `message` TEXT NOT NULL,
  `is_read` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. COMPLAINTS (PENGADUAN MASYARAKAT) TABLE
CREATE TABLE IF NOT EXISTS `complaints` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `ticket_number` VARCHAR(50) UNIQUE NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `whatsapp` VARCHAR(30) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `status` ENUM('PENDING', 'DIPROSES', 'SELESAI') DEFAULT 'PENDING',
  `redirected_to_dm` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. COMPLAINT ATTACHMENTS TABLE
CREATE TABLE IF NOT EXISTS `complaint_attachments` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `complaint_id` BIGINT UNSIGNED NOT NULL,
  `file_path` VARCHAR(500) NOT NULL,
  `file_type` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`complaint_id`) REFERENCES `complaints`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. INSTAGRAM POSTS INTEGRATION TABLE
CREATE TABLE IF NOT EXISTS `instagram_posts` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `instagram_url` VARCHAR(500) UNIQUE NOT NULL,
  `thumbnail_url` VARCHAR(500) NOT NULL,
  `caption` TEXT NULL,
  `post_date` DATE NULL,
  `likes_count` INT UNSIGNED DEFAULT 0,
  `comments_count` INT UNSIGNED DEFAULT 0,
  `category` VARCHAR(100) DEFAULT 'Kegiatan',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. GRAB KT CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS `grab_customers` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `village_name` VARCHAR(100) NULL,
  `address` TEXT NULL,
  `rating` DECIMAL(3,2) DEFAULT 5.00,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. GRAB KT DRIVER APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS `grab_driver_applications` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NULL,
  `applicant_name` VARCHAR(255) NOT NULL,
  `member_id` VARCHAR(100) NOT NULL, -- ID Anggota Karang Taruna
  `whatsapp` VARCHAR(30) NOT NULL,
  `address` TEXT NOT NULL,
  `village_name` VARCHAR(100) NOT NULL,
  `ktp_number` VARCHAR(30) NOT NULL,
  `sim_number` VARCHAR(30) NOT NULL,
  `vehicle_type` VARCHAR(100) NOT NULL,
  `vehicle_brand` VARCHAR(100) NOT NULL,
  `vehicle_color` VARCHAR(50) NOT NULL,
  `vehicle_year` VARCHAR(10) NOT NULL,
  `plate_number` VARCHAR(20) NOT NULL,
  `ktp_photo` VARCHAR(500) NOT NULL,
  `sim_photo` VARCHAR(500) NOT NULL,
  `vehicle_photo` VARCHAR(500) NOT NULL,
  `application_status` ENUM('WAITING_VERIFICATION', 'UNDER_REVIEW', 'APPROVED', 'REJECTED') DEFAULT 'WAITING_VERIFICATION',
  `rejection_reason` TEXT NULL,
  `verified_by` BIGINT UNSIGNED NULL,
  `verified_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. GRAB KT DRIVERS TABLE
CREATE TABLE IF NOT EXISTS `grab_drivers` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NULL,
  `driver_application_id` BIGINT UNSIGNED NULL,
  `driver_code` VARCHAR(50) UNIQUE NOT NULL,
  `member_id` VARCHAR(100) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `vehicle_type` VARCHAR(100) NOT NULL,
  `vehicle_brand` VARCHAR(100) NOT NULL,
  `vehicle_color` VARCHAR(50) NOT NULL,
  `plate_number` VARCHAR(20) NOT NULL,
  `rating` DECIMAL(3,2) DEFAULT 5.00,
  `total_trips` INT UNSIGNED DEFAULT 0,
  `is_online` BOOLEAN DEFAULT TRUE,
  `is_available` BOOLEAN DEFAULT TRUE,
  `village_name` VARCHAR(100) NOT NULL,
  `current_lat` DECIMAL(10,8) NULL,
  `current_lng` DECIMAL(11,8) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`driver_application_id`) REFERENCES `grab_driver_applications`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. GRAB KT ORDERS TABLE
CREATE TABLE IF NOT EXISTS `grab_orders` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_code` VARCHAR(50) UNIQUE NOT NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `customer_phone` VARCHAR(30) NOT NULL,
  `driver_id` BIGINT UNSIGNED NULL,
  `pickup_address` VARCHAR(255) NOT NULL,
  `pickup_lat` DECIMAL(10,8) NOT NULL,
  `pickup_lng` DECIMAL(11,8) NOT NULL,
  `destination_address` VARCHAR(255) NOT NULL,
  `destination_lat` DECIMAL(10,8) NOT NULL,
  `destination_lng` DECIMAL(11,8) NOT NULL,
  `distance_km` DECIMAL(5,2) NOT NULL,
  `base_fare` DECIMAL(10,2) NOT NULL,
  `distance_fare` DECIMAL(10,2) NOT NULL,
  `service_fee` DECIMAL(10,2) NOT NULL,
  `total_fare` DECIMAL(10,2) NOT NULL,
  `payment_method` ENUM('CASH', 'QRIS') DEFAULT 'CASH',
  `payment_status` ENUM('PENDING', 'PAID') DEFAULT 'PENDING',
  `order_status` ENUM('SEARCHING_DRIVER', 'DRIVER_ASSIGNED', 'DRIVER_ON_THE_WAY', 'DRIVER_ARRIVED', 'TRIP_STARTED', 'TRIP_COMPLETED', 'CANCELLED') DEFAULT 'SEARCHING_DRIVER',
  `cancellation_reason` TEXT NULL,
  `ordered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `accepted_at` TIMESTAMP NULL,
  `completed_at` TIMESTAMP NULL,
  FOREIGN KEY (`driver_id`) REFERENCES `grab_drivers`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. GRAB KT RATINGS & REVIEWS TABLE
CREATE TABLE IF NOT EXISTS `grab_ratings` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_id` BIGINT UNSIGNED NOT NULL,
  `driver_id` BIGINT UNSIGNED NOT NULL,
  `rating` INT NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
  `review` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `grab_orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`driver_id`) REFERENCES `grab_drivers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. GRAB KT TARIFF CONFIG TABLE
CREATE TABLE IF NOT EXISTS `grab_tariffs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `base_fare` DECIMAL(10,2) NOT NULL DEFAULT 5000.00,
  `price_per_km` DECIMAL(10,2) NOT NULL DEFAULT 3000.00,
  `service_fee` DECIMAL(10,2) NOT NULL DEFAULT 2000.00,
  `min_fare` DECIMAL(10,2) NOT NULL DEFAULT 8000.00,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 19. SYSTEM SETTINGS TABLE
CREATE TABLE IF NOT EXISTS `settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) UNIQUE NOT NULL,
  `setting_value` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- DEFAULT SEED DATA
-- ==============================================================================

-- Default Admin User (Password: admin123 hashed via bcrypt)
INSERT INTO `users` (`name`, `email`, `phone`, `password`, `role`, `status`) VALUES
('Administrator Karang Taruna', 'admin@cikancung.go.id', '081234567890', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.RAWef56O6', 'ADMIN', 'ACTIVE');

-- Default Tariff
INSERT INTO `grab_tariffs` (`base_fare`, `price_per_km`, `service_fee`, `min_fare`) VALUES
(5000.00, 3000.00, 2000.00, 8000.00);

-- Indexes for Query Performance
CREATE INDEX idx_news_slug ON `news`(`slug`);
CREATE INDEX idx_agendas_date ON `agendas`(`event_date`);
CREATE INDEX idx_orders_status ON `grab_orders`(`order_status`);
CREATE INDEX idx_drivers_online ON `grab_drivers`(`is_online`, `is_available`);
