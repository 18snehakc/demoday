const express = require("express");

const app = express();

app.use(express.json());

let complaints = [];



app.get("/", (req, res) => {
    res.send("PGMate Complaint Management System");
});



app.post("/complaints", (req, res) => {

    let complaint = req.body;

    if (!complaint.name || !complaint.room ||
        !complaint.category || !complaint.description) {

        return res.status(400).send("Please fill all fields");
    }

    complaint.id = complaints.length + 1;
    complaint.status = "Pending";

    complaints.push(complaint);

    res.json(complaint);
});



app.get("/complaints", (req, res) => {

    res.json(complaints);

});



app.get("/complaints/:id", (req, res) => {

    let id = Number(req.params.id);

    let complaint = complaints.find(c => c.id === id);

    if (!complaint) {
        return res.status(404).send("Complaint not found");
    }

    res.json(complaint);
});



app.put("/complaints/:id", (req, res) => {

    let id = Number(req.params.id);

    let complaint = complaints.find(c => c.id === id);

    if (!complaint) {
        return res.status(404).send("Complaint not found");
    }

    if (req.body.name) {
        complaint.name = req.body.name;
    }

    if (req.body.room) {
        complaint.room = req.body.room;
    }

    if (req.body.category) {
        complaint.category = req.body.category;
    }

    if (req.body.description) {
        complaint.description = req.body.description;
    }

    if (req.body.status) {
        complaint.status = req.body.status;
    }

    res.json(complaint);
});



app.delete("/complaints/:id", (req, res) => {

    let id = Number(req.params.id);

    let index = complaints.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).send("Complaint not found");
    }

    complaints.splice(index, 1);

    res.send("Complaint deleted successfully");
});



app.listen(4000, () => {

    console.log("Server running at http://localhost:4000");

});