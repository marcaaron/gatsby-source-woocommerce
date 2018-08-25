# TBC

```
plugins:[
  {
    resolve: "gatsby-source-woocommerce",
    options: {
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
