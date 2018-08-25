# TBC

```javascript
plugins:[
  {
    resolve: "gatsby-source-woocommerce",
    options: {
      // just this not http or /wp-json blah blah
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
