<?php
// Include the database connection
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $username = $_POST['username'];
    $password = $_POST['password'];
    $location = $_POST['location'];
    $aadhar = $_POST['aadhar'];

    // Sanitize input to prevent SQL injection
    $username = $conn->real_escape_string($username);
    $password = $conn->real_escape_string($password);
    $location = $conn->real_escape_string($location);
    $aadhar = $conn->real_escape_string($aadhar);

    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Insert data into the database
    $sql = "INSERT INTO sellers (username, password, location, aadhar) 
            VALUES ('$username', '$hashed_password', '$location', '$aadhar')";

    if ($conn->query($sql) === TRUE) {
        echo "Seller registered successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the database connection
$conn->close();
?>
