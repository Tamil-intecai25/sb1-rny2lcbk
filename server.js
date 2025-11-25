const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/webhooks/juspay', express.raw({ type: '*/*' }), (req, res) => {
  const rawPayload = req.body;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📥 Juspay Webhook Received');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⏰ Timestamp:', new Date().toISOString());
  console.log('\n📦 Raw Payload:');
  console.log(rawPayload.toString());

  let parsedPayload = null;
  try {
    parsedPayload = JSON.parse(rawPayload.toString());
    console.log('\n✅ Parsed JSON:');
    console.log(JSON.stringify(parsedPayload, null, 2));
  } catch (error) {
    console.log('\n⚠️  Could not parse as JSON:', error.message);
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  res.status(200).json({ received: true });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log('🚀 Juspay Webhook Server Started');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📡 Listening on port ${PORT}`);
  console.log(`🔗 Webhook endpoint: http://localhost:${PORT}/webhooks/juspay`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});
