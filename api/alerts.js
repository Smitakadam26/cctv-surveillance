let alerts = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    let alert = req.body;

    // ✅ FIX: convert string → object
    if (typeof alert === "string") {
      alert = JSON.parse(alert);
    }

    const newAlert = {
      id: Date.now(),
      ...alert,
    };

    alerts.unshift(newAlert);

    console.log("NEW ALERT:", newAlert);

    return res.status(201).json({
      message: "Alert stored successfully",
      data: newAlert
    });
  }

  if (req.method === "GET") {
    return res.status(200).json(alerts);
  }

  return res.status(405).json({ message: "Method not allowed" });
}