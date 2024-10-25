const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const fs = require('fs');


const app = express();
app.use(express.json());

// Simulate fetching lead data
app.get('/fetch-leads', async (req, res) => {
  try {
    // Use dummy data or a mock API (e.g., from Mockaroo or JSONPlaceholder)
    const leadData = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.status(200).json(leadData.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lead data' });
  }
});

// Simulate fetching campaign data
app.get('/fetch-campaigns', async (req, res) => {
  try {
    const campaignData = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.status(200).json(campaignData.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign data' });
  }
});



mongoose.connect('mongodb://localhost:27017/ezymetrics', { useNewUrlParser: true, useUnifiedTopology: true });

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
});

const campaignSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: Number,
});

const Lead = mongoose.model('Lead', leadSchema);
const Campaign = mongoose.model('Campaign', campaignSchema);

// ETL Process: Extract, Transform, and Load
app.get('/process-leads', async (req, res) => {
  try {
    const leads = await axios.get('https://jsonplaceholder.typicode.com/users');
    const transformedLeads = leads.data.map(lead => ({
      name: lead.name,
      email: lead.email,
      company: lead.company.name
    }));

    // Load into database
    await Lead.insertMany(transformedLeads);
    res.status(200).send('Leads processed and stored');
  } catch (error) {
    res.status(500).json({ message: 'Error processing leads' });
  }
});


app.get('/generate-report', async (req, res) => {
  const leads = await Lead.find();  // Get stored data from MongoDB

  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream('report.pdf');
  doc.pipe(writeStream);

  doc.text('EzyMetrics Report', { align: 'center' });
  leads.forEach(lead => {
    doc.text(`Name: ${lead.name}, Email: ${lead.email}, Company: ${lead.company}`);
  });

  doc.end();
  writeStream.on('finish', () => {
    res.download('report.pdf');
  });
});



// Configure email service (e.g., using Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Send alert based on a condition
app.get('/send-alert', async (req, res) => {
  try {
    const leads = await Lead.find();
    
    // Example condition: If leads are less than a threshold, send an alert
    if (leads.length < 10) {
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient@example.com',
        subject: 'Low Leads Alert',
        text: 'The number of leads is below the expected threshold!',
      };
      
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Alert sent' });
    } else {
      res.status(200).json({ message: 'All good, no alerts needed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error sending alert' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

