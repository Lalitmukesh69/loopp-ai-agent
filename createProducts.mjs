import { DodoPayments } from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'ON20AV80SSROc6Sk.GWPS_yy9UqrhUX9iDbhiVeA1k38FQNA8YHnBtmhMJmgldZzu',
  environment: 'test_mode'
});

async function main() {
  try {
    const basic = await client.products.create({
      name: 'Loop Basic',
      description: 'Basic plan for Loop users',
      tax_category: 'digital_products',
      price: {
        currency: 'USD',
        discount: 0,
        payment_frequency_count: 1,
        payment_frequency_interval: 'Month',
        price: 1900,
        purchasing_power_parity: false,
        subscription_period_count: 1,
        subscription_period_interval: 'Month',
        type: 'recurring_price'
      }
    });
    console.log('Basic Product ID:', basic.product_id);

    const pro = await client.products.create({
      name: 'Loop Pro',
      description: 'Pro plan for Loop users',
      tax_category: 'digital_products',
      price: {
        currency: 'USD',
        discount: 0,
        payment_frequency_count: 1,
        payment_frequency_interval: 'Month',
        price: 4900,
        purchasing_power_parity: false,
        subscription_period_count: 1,
        subscription_period_interval: 'Month',
        type: 'recurring_price'
      }
    });
    console.log('Pro Product ID:', pro.product_id);
  } catch (error) {
    console.error('Error creating products:', error);
  }
}

main();
