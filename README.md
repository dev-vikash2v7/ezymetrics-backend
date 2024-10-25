# EzyMetrics Backend

This backend application for EzyMetrics focuses on integrating CRM and marketing data, processing it, and generating reports with alert notifications. Built with **Node.js** and **Express**, it connects to MongoDB, fetches and stores data, performs ETL (Extract, Transform, Load) operations, and supports PDF/CSV report generation and email alerts.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Report Generation](#report-generation)
  - [Email Alerts](#email-alerts)
- [Configuration](#configuration)
- [License](#license)

---

## Requirements
- **Node.js** (v14+)
- **MongoDB** (for data storage)
- Dummy data available from [JSONPlaceholder](https://jsonplaceholder.typicode.com/) or similar mock APIs.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ezymetrics-backend.git
   cd ezymetrics-backend

2. Install dependencies:

npm install


3. Set up MongoDB:

Ensure MongoDB is installed and running locally, or configure a MongoDB Atlas instance.
Configure environment variables for email settings (see Configuration).

4. Start the server:

npm start
By default, the server runs on http://localhost:3000.


# API Endpoints


- Fetch Leads

Endpoint: GET /fetch-leads
Response: JSON list of dummy lead data.
curl http://localhost:3000/fetch-leads


- Fetch Campaigns

Endpoint: GET /fetch-campaigns
Response: JSON list of dummy campaign data.
curl http://localhost:3000/fetch-campaigns


- Process Leads (ETL Operation)

Endpoint: GET /process-leads
Response: Success message upon completion.
curl http://localhost:3000/process-leads


- Report Generation

Endpoint: GET /generate-report
Description: Generates a PDF report of stored lead data and downloads it.
Response: Downloadable PDF file.
curl -O http://localhost:3000/generate-report

- Email Alerts

Endpoint: GET /send-alert
Description: Checks lead count in the database. If below a threshold, sends an email alert.
Response: JSON message indicating if an alert was sent or not.
curl http://localhost:3000/send-alert


Configuration
To enable email alerts, create a .env file in the root directory with the following variables:

EMAIL_SERVICE=gmail         # Or any other email service
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
ALERT_RECIPIENT=recipient@example.com
Replace your-email@gmail.com and your-email-password with valid email credentials.
Adjust ALERT_RECIPIENT to the email address where alerts should be sent.