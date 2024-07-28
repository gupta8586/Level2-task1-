const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/jobboard', { useNewUrlParser: true, useUnifiedTopology: true });

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  postedDate: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);

app.post('/api/jobs', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).send(job);
});

app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.send(jobs);
});

const applicationSchema = new mongoose.Schema({
  jobId: String,
  name: String,
  email: String,
  resume: String, // URL or base64 string for simplicity
  appliedDate: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', applicationSchema);

app.post('/api/applications', async (req, res) => {
  const application = new Application(req.body);
  await application.save();
  res.status(201).send(application);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
