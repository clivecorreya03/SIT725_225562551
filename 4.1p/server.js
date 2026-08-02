const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB schema
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Project = mongoose.model("Project", ProjectSchema);

// Original cybersecurity data
const cardList = [
  {
    title: "Phishing Attack",
    image: "/images/phishing.png",
    link: "About Phishing",
    description:
      "Phishing attacks attempt to steal usernames, passwords, banking details and other sensitive information."
  },
  {
    title: "Ransomware",
    image: "/images/ransomware.jpeg",
    link: "About Ransomware",
    description:
      "Ransomware encrypts files and demands payment from victims before access is restored."
  },
  {
    title: "Malware",
    image: "/images/malware.jpeg",
    link: "About Malware",
    description:
      "Malware is malicious software designed to damage, disrupt or gain unauthorised access to computer systems."
  }
];

// API route
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find({});

    res.status(200).json({
      statusCode: 200,
      data: projects,
      message: "Success"
    });
  } catch (error) {
    console.error("Database retrieval error:", error);

    res.status(500).json({
      statusCode: 500,
      data: [],
      message: "Unable to retrieve projects"
    });
  }
});

// Start MongoDB first, insert records, then start server
async function startServer() {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/myprojectDB"
    );

    console.log("Connected to MongoDB!");

    // Delete existing records and insert fresh records
    await Project.deleteMany({});
    await Project.insertMany(cardList);

    console.log("Cybersecurity cards inserted into MongoDB!");

    app.listen(port, () => {
      console.log(`App running at http://localhost:${port}`);
      console.log(
        `API running at http://localhost:${port}/api/projects`
      );
    });
  } catch (error) {
    console.error("Startup error:", error.message);
  }
}

startServer();