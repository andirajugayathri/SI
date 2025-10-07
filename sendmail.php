<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Collect form data safely
    $name = htmlspecialchars(trim($_POST['fullname']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $email = htmlspecialchars(trim($_POST['email']));
    $state = htmlspecialchars(trim($_POST['state']));
    $property = htmlspecialchars(trim($_POST['property']));
    $service = htmlspecialchars(trim($_POST['service']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Set recipient email
    $to = "yourmail@example.com"; // ← Replace with your email
    $subject = "New Consultation Request from Space Designs Website";

    // Compose email content
    $body = "
    You have received a new consultation request from the website.\n\n
    Full Name: $name\n
    Phone Number: $phone\n
    Email Address: $email\n
    State: $state\n
    Property Type: $property\n
    Services Required: $service\n
    Message: $message\n
    ";

    // Set email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }

} else {
    echo "invalid";
}
?>
