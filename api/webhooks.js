module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawPayload = Buffer.isBuffer(req.body)
      ? req.body
      : Buffer.from(JSON.stringify(req.body));

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
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
