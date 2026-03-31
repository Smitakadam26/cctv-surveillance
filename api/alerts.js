let alerts = []; // temporary storage

export default function handler(req, res) {
  // ✅ POST → receive alert
  if (req.method === "POST") {
    const alert = req.body;

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

  // ✅ GET → return all alerts
  if (req.method === "GET") {
    return res.status(200).json(alerts);
  }

  // ❌ Other methods
  return res.status(405).json({
    message: "Method not allowed"
  });
}