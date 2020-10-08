const STRIPE_CONFIG = require("./config/stripe")

const stripe = require('stripe')(STRIPE_CONFIG.API_KEY)

exports.stripe_create_customer = async (customer_email) => {
    const customer = await stripe.customers.create({
        description: 'create payment_test',
        email: customer_email,
    });
    const id = customer.id
    const num = "4242424242424242"
    const month = "12"
    const year = "2025"
    const cvc = "123"
    const token = await stripe.tokens.create({
        card: {
            "number": num,
            "exp_month": month,
            "exp_year": year,
            "cvc": cvc
        },
    });
    const params = {
        source: token.id
    };
    stripe.customers.createSource(id, params, function (err, card) {
        stripe.subscriptions.create({
                customer: id,
                plan: 'price_1HZzrRCIse1vd8STWKSr2cjm',
            }).then(data => {
                console.log(data)
                return data
            })
            .catch(err => console.log(err))
    })
}