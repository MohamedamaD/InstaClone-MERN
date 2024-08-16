const otpGenerator = require("otp-generator");

function generateOTP() {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
}

function OTP_HTML(otpCode, email) {
  return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 60px;
            background-color: #f6f6f6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            max-width: 100px;
        }
        .content {
            text-align: center;
        }
        .otp {
            display: inline-block;
            background-color: #f0f0f0;
            padding: 10px 20px;
            font-size: 24px;
            font-weight: bold;
            margin-top: 20px;
            letter-spacing: 2px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo">
        </div>
        <div class="content">
            <p>Hi,</p>
            <p>Someone tried to sign up for an Instagram account with <strong>${email}</strong>. If it was you, enter this confirmation code in the app:</p>
            <div class="otp">${otpCode}</div>
        </div>
        <div class="footer">
            <p>&copy; Instagram. Meta Platforms, Inc., 1601 Willow Road, Menlo Park, CA 94025</p>
        </div>
    </div>
</body>
</html>
      `;
}

function RESET_HTML(link) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 60px;
            background-color: #f6f6f6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            max-width: 100px;
        }
        .content {
            text-align: center;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #888888;
        }
        a.button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
        a.button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo">
        </div>
        <div class="content">
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${link}" class="button">Reset Password</a>
        </div>
        <div class="footer">
            <p>&copy; Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
}

module.exports = { generateOTP, OTP_HTML, RESET_HTML };
