# BigCommerce API Notes

These are notes that I have recorded while completing the steps in this page: https://developer.bigcommerce.com/docs/storefront/headless/channels.

## Create the channel

This step: https://developer.bigcommerce.com/docs/storefront/headless/channels#create-the-channel

* Go to https://developer.bigcommerce.com/docs/rest-management/channels#create-a-channel
* The right column shows an example of how to create an eBay channel. If you click the "cURL" tab then you will see `[store_hash]` route param and a `{{token}}` value (for the `X-Auth-Token` header). Neither of those is defined. So where do you get those values? Follow these steps:
    * Click the "Try it" button in the top right corner (to the right of the "Create a Channel" header).
    * You will see some instructions that say "Try out our APIs with your Store API credentials. Create them inside your Control Panel: Settings › API Accounts". 
    * Click the "Settings › API Accounts" link to be taken to your BigCommerce control panel where you can login and create a store-level API account.
        * Or you can log into your control panel, go to "Settings", scroll down to the "API" section (at the bottom), and click "Store-level API accounts".
    * Click the "Create API account" button.
    * Name your API account something like "Create a Channel".
    * Scroll down to the "Channel settings" scope and set it to "modify".
    * Click the "Save" button.
    * When you create an API account, you will automatically download a .txt file with the following data:
        * ACCESS TOKEN: snjiuwf33is8vx8exi32xfrh2jr629j
        * CLIENT NAME: Headless Storefront API
        * CLIENT ID: gl1e1cllahsq3itxykh3ytsopopelgg
        * CLIENT SECRET: 26c960a652bee278e9af1e79c9b3849c64454bafda016d25aa4a8929263bf89b
        * NAME: Headless Storefront API
        * API PATH: https://api.bigcommerce.com/stores/se4wyyruqj/v3/
    * You can get the `store_hash` value from the API PATH and the `{{token}}` value from the ACCESS TOKEN.
    * Back on the https://developer.bigcommerce.com/docs/rest-management/channels#create-a-channel page, scroll down to the "Body" heading and find the entries for "name", "platform", "type", and "status". 
        * These are the values that you need to pass in the curl command that you will send to create a custom storefront. 
        * You can read the documentation for each of those entries and you can also click the "valid combination" link to be taken to the https://developer.bigcommerce.com/docs/rest-management/channels page, where you can find out more about the data that needs to be passed to the BigCommerce API to create a custom storefront. 
        * This is the request that I sent to create a custom storefront under the Channels section of my BigCommerce control panel:
        ```
        curl --request POST \
          --url 'https://api.bigcommerce.com/stores/[store_hash]/v3/channels' \
          --header 'Accept: application/json' \
          --header 'Content-Type: application/json' \
          --header 'X-Auth-Token: {{token}}' \
          --data '{"name":"THEGA - Custom Storefront","platform":"custom","type":"storefront","status":"prelaunch"}'
        ```
        * The Channel ID is returned in the response, but you can also find the Channel ID in the storefront URL in the control panel under the Channels section. The Channel ID is the 7-digit number at the end of the subdomain.
        * NOTE: The "status" is initially set to "prelaunch", but you can change it to "active" from the control panel.


**NOTE: It looks like I can complete the rest of the steps in the control panel after I have created a channel for my custom storefront.**


## Add the headless site URL

This step: https://developer.bigcommerce.com/docs/storefront/headless/channels#add-the-headless-site-url

* Follow the instructions above, but go to https://developer.bigcommerce.com/docs/rest-management/channels/site#create-a-channel-site.
* Name your API account something like "Create a Channel Site".
* Find the "Sites & routes" scope and set it to "modify".
```
curl --request POST \
  --url 'https://api.bigcommerce.com/stores/[store_hash]/v3/channels/[channel_id]/site' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Token: {{token}}' \
  --data '{"url":"https://thegasport.com/","channel_id":[channel_id]}'
```

## Add a checkout URL

**NOTE: It looks like I can complete the rest of the steps in the control panel after I have created a channel for my custom storefront.**

This step: https://developer.bigcommerce.com/docs/storefront/headless/channels#add-a-checkout-url

I think the checkout URL is set to this right now: https://thega.mybigcommerce.com
But I want to change it to this: https://checkout.thegasport.com

* 
