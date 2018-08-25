# gatsby-source-woocommerce

Source plugin for [Gatsby](https://www.gatsbyjs.org/). Pulls in data from protected routes via the [WooCommerce REST API](http://woocommerce.github.io/woocommerce-rest-api-docs/) with credentials.

## Install

`npm install --save gatsby-source-woocommerce`

## How to Use

```javascript
// In gatsby-config.js
plugins:[
  {       
    resolve: "gatsby-source-woocommerce",
    options: {
	   // Base URL of Wordpress site
      api: 'wordpress.domain',
      // true or false if using https or nah
      https: false,
      api_keys: {
        consumer_key: <key>,
        consumer_secret: <secret>,
      }
    }
  }
]
```

## Currently Supported Fields

- Products
- Customers
- Orders
- Reports
- Coupons
