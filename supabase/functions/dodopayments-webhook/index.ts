import { DodoPayments } from "npm:dodopayments"
import { createClient } from "npm:@supabase/supabase-js"

Deno.serve(async (req) => {
  try {
    const DODO_WEBHOOK_SECRET = Deno.env.get('DODO_PAYMENTS_WEBHOOK_KEY') || 'whsec_test_secret'
    
    // Webhooks must be POST requests
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    // Get signature headers
    const signature = req.headers.get('webhook-signature')
    const webhookId = req.headers.get('webhook-id')
    const timestamp = req.headers.get('webhook-timestamp')

    if (!signature || !webhookId || !timestamp) {
      return new Response('Missing signature headers', { status: 400 })
    }

    const payload = await req.text()

    const dodo = new DodoPayments({
      bearerToken: Deno.env.get('DODO_PAYMENTS_API_KEY') || 'test',
      environment: 'test_mode'
    })

    // Verify and unwrap the webhook payload securely
    const event = dodo.webhooks.unwrap(payload, {
      headers: {
        'webhook-id': webhookId,
        'webhook-timestamp': timestamp,
        'webhook-signature': signature
      },
      key: DODO_WEBHOOK_SECRET
    })

    console.log('Successfully verified webhook:', event.type)

    // Handle different event types
    if (event.type === 'payment.succeeded') {
      const paymentData = event.data;
      console.log('Payment succeeded for customer:', paymentData.customer);
      
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
      const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
      
      if (supabaseUrl && supabaseServiceRoleKey) {
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
        const email = paymentData.customer.email;
        
        // Find user by email
        const { data: profiles, error: profileError } = await supabaseAdmin
          .from('profiles')
          .select('user_id')
          .eq('email', email)
          .limit(1);
          
        if (profiles && profiles.length > 0) {
          const userId = profiles[0].user_id;
          
          // Determine the plan based on product_id if available, otherwise default to 'pro'
          // Basic IDs: pdt_0Ne4ASd09ENvPyjiE0rgm, pdt_0Ne4ASfuiMtIlD1jjIfhH
          // Pro IDs: pdt_0Ne4ASj0aTLDvBsmnSNJI, pdt_0Ne4ASlalRUH5FcYxD1TX
          let plan = 'pro';
          if (paymentData.product_id === 'pdt_0Ne4ASd09ENvPyjiE0rgm' || paymentData.product_id === 'pdt_0Ne4ASfuiMtIlD1jjIfhH') {
            plan = 'basic';
          }
          
          // Update auth user metadata
          const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
            user_metadata: { plan: plan }
          });
          
          if (updateError) {
            console.error('Error updating user metadata:', updateError);
          } else {
            console.log('Successfully updated user plan to:', plan);
          }
        } else {
          console.error('Could not find profile for email:', email);
        }
      }
    }

    // Acknowledge receipt
    return new Response(JSON.stringify({ received: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('Webhook processing failed:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
})
