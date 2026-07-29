const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const threats = [
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

app.get("/api/threats", (req, res) => {

    res.status(200).json({
        statusCode: 200,
        message: "Threats retrieved successfully",
        data: threats
    });

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});