import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'ON20AV80SSROc6Sk.GWPS_yy9UqrhUX9iDbhiVeA1k38FQNA8YHnBtmhMJmgldZzu',
  environment: 'test_mode',
});

async function main() {
  try {
    const basicMonthly = await client.products.create({
      name: 'Basic Plan (Monthly)',
      description: '1 user included, 130+ languages, 30 days history',
      tax_category: 'saas',
      price: {
        type: 'recurring_price',
        currency: 'USD',
        discount: 0,
        payment_frequency_count: 1,
        payment_frequency_interval: 'Month',
        price: 1900,
        purchasing_power_parity: false,
        subscription_period_count: 1,
        subscription_period_interval: 'Month'
      }
    });

    const basicYearly = await client.products.create({
      name: 'Basic Plan (Yearly)',
      description: '1 user included, 130+ languages, 30 days history',
      tax_category: 'saas',
      price: {
        type: 'recurring_price',
        currency: 'USD',
        discount: 0,
        payment_frequency_count: 1,
        payment_frequency_interval: 'Year',
        price: 18000,
        purchasing_power_parity: false,
        subscription_period_count: 1,
        subscription_period_interval: 'Year'
      }
    });

    const proMonthly = await client.products.create({
      name: 'Pro Plan (Monthly)',
      description: 'Up to 5 users, unlimited history, custom layouts',
      tax_category: 'saas',
      price: {
        type: 'recurring_price',
        currency: 'USD',
        discount: 0,
        payment_frequency_count: 1,
        payment_frequency_interval: 'Month',
        price: 4900,
        purchasing_power_parity: false,
        subscription_period_count: 1,
        subscription_period_interval: 'Month'
      }
    });

    const proYearly = await client.products.create({
      name: 'Pro Plan (Yearly)',
      description: 'Up to 5 users, unlimited history, custom layouts',
      tax_category: 'saas',
      price: {
        type: 'recurring_price',
        currency: 'USD',
        discount: 0,
        payment_frequency_count: 1,
        payment_frequency_interval: 'Year',
        price: 46800,
        purchasing_power_parity: false,
        subscription_period_count: 1,
        subscription_period_interval: 'Year'
      }
    });

    console.log('Basic Monthly:', basicMonthly.product_id);
    console.log('Basic Yearly:', basicYearly.product_id);
    console.log('Pro Monthly:', proMonthly.product_id);
    console.log('Pro Yearly:', proYearly.product_id);
  } catch (err) {
    console.error('Error creating products:', err);
  }
}

main();
