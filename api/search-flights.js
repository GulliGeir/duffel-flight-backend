import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { origin, destination, departure_date } = req.body;

  const response = await fetch('https://api.duffel.com/air/offer_requests', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer duffel_test_4S3f1DRv9V2ouqVN86bYmiHGfyBFO8V8enkZS-RbCfh',
      'Duffel-Version': 'v1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      slices: [{ origin, destination, departure_date }],
      passengers: [{ type: 'adult' }],
      cabin_class: 'economy',
    }),
  });

  const offers = await response.json();
  res.status(200).json(offers);
}
