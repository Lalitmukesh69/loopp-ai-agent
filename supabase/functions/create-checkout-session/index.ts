import { DodoPayments } from "npm:dodopayments"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 })
  }

  try {
    const { productId, email, returnUrl } = await req.json()

    if (!productId) {
      throw new Error('productId is required')
    }

    const DODO_API_KEY = Deno.env.get('DODO_PAYMENTS_API_KEY') || 'ON20AV80SSROc6Sk.GWPS_yy9UqrhUX9iDbhiVeA1k38FQNA8YHnBtmhMJmgldZzu'
    
    const client = new DodoPayments({
      bearerToken: DODO_API_KEY,
      environment: 'test_mode'
    })

    const customerParams = email ? { customer: { email } } : {}

    const session = await client.checkoutSessions.create({
      product_cart: [{
        product_id: productId,
        quantity: 1
      }],
      ...customerParams,
      return_url: returnUrl || 'http://localhost:8080/settings?tab=billing'
    })

    return new Response(
      JSON.stringify({ url: session.checkout_url }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 400 
      },
    )
  }
})
