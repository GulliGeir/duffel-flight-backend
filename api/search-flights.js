import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { origin, destination, departure_date } = req.body;

  try {
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
}
