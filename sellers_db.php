<?php
// Database configuration
$host = 'localhost';
$db = 'seller_db'; // The database name created above
$user = 'root';    // MySQL username (default is 'root' for local setup)
$password = '';    // MySQL password (empty for local setup)

// Create a database connection
$conn = new mysqli($host, $user, $password, $db);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
