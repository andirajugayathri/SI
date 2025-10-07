<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize and collect form data
    $firstName = htmlspecialchars(trim($_POST['firstName']));
    $lastName = htmlspecialchars(trim($_POST['lastName']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Recipient email (change to your actual email)
    $to = "yourmail@example.com"; 
    $subject = "New Contact Message from Website";

    // Email content
    $body = "
    You have received a new message from your website contact form.

    Name: $firstName $lastName
    Phone: $phone
    Email: $email

    Message:
    $message
    ";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send mail
    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }

} else {
    echo "invalid";
}
?>
