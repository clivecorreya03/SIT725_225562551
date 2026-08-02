const mongoose = require("mongoose");
const Threat = require("./models/Threat");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/sit725CybersecurityDB";

const sampleThreats = [
  {
    threatName: "Phishing Attack",
    threatCategory: "Social Engineering",
    severityLevel: "High",
    preventionMethod:
      "Verify sender addresses, avoid suspicious links and enable multi-factor authentication.",
    imagePath: "images/phishing.jpg",
    learnMoreLink:
      "https://www.cyber.gov.au/threats/types-threats/phishing"
  },
  {
    threatName: "Ransomware",
    threatCategory: "Malware",
    severityLevel: "Critical",
    preventionMethod:
      "Maintain offline backups, install security updates and avoid downloading unknown attachments.",
    imagePath: "images/ransomware.jpg",
    learnMoreLink:
      "https://www.cyber.gov.au/threats/types-threats/ransomware"
  },
  {
    threatName: "SQL Injection",
    threatCategory: "Web Attack",
    severityLevel: "High",
    preventionMethod:
      "Use parameterised queries, validate user input and restrict database account permissions.",
    imagePath: "images/malware.jpg",
    learnMoreLink:
      "https://owasp.org/www-community/attacks/SQL_Injection"
  },
  {
    threatName: "Credential Stuffing",
    threatCategory: "Credential Attack",
    severityLevel: "Medium",
    preventionMethod:
      "Use unique passwords, enable multi-factor authentication and monitor unusual login attempts.",
    imagePath: "images/cybersecurity.jpg",
    learnMoreLink:
      "https://owasp.org/www-community/attacks/Credential_stuffing"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB for database seeding");

    // Clear previous records so duplicate cards are not created.
    await Threat.deleteMany({});
    console.log("Previous cybersecurity records removed");

    const insertedThreats = await Threat.insertMany(sampleThreats);

    console.log(`${insertedThreats.length} cybersecurity records inserted`);

    insertedThreats.forEach((threat) => {
      console.log(`- ${threat.threatName}`);
    });
  } catch (error) {
    console.error("Database seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

seedDatabase();