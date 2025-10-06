<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST['name']);
    $mobile = htmlspecialchars($_POST['mobile']);
    $location = htmlspecialchars($_POST['location']);

    $to = "rajaadonai@gmail.com"; // Replace with your email
    $subject = "New Full Home Interior Estimate Request";
    $message = "
    New estimate request details:

    Name: $name
    Mobile: $mobile
    Location: $location
    ";
    $headers = "From: noreply@yourdomain.com\r\n";
    $headers .= "Reply-To: $mobile\r\n";

    if (mail($to, $subject, $message, $headers)) {
        header("Location: thank-you.html");
        exit;
    } else {
        echo "Error sending email. Please try again.";
    }
}
?>
