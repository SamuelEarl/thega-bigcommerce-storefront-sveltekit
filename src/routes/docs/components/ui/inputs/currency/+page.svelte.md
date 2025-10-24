<script lang="ts">
  import { CurrencyInput, formatIntegerToCurrency } from "$lib/client/components";

  let locale = "en-US";
  let currency = "USD";
  let amount = $state(12345);
  let amount1 = $state(0);
  let amount2 = $state(0);
  let total = $derived(amount1 + amount2);

  function handleChange(event) {
    console.log("handleChange Event:", event);
  }

  function handleInput(event) {
    console.log("handleInput Event:", event);
  }

  function handleBlur(event) {
    console.log("handleBlur Event:", event);
  }
</script>


# Currency Input

---

## Example Usage

<div style="margin-bottom:20px">
  <CurrencyInput
    bind:value={amount}
    valAlign="right"
    locale={locale}
    currency={currency}
    padding="var(--size-2)"
    fontSize="var(--size-base)"
    placeholder="Type right here"
    disabled={false}
  />
</div>

```svelte
<script>
  import { CurrencyInput } from "$lib/client/components";

  let amount = $state(12345);
</script>

<div style="margin-bottom:20px">
  <CurrencyInput
    bind:value={amount}
    valAlign="right"
    locale={locale}
    currency={currency}
    padding="var(--size-2)"
    fontSize="var(--size-base)"
    placeholder="Type right here"
    disabled={false}
  />
</div>
```

<hr>

## Return Value Demo

<div id="return-value-demo">
  <div id="currency">
    <div id="curr-title">Currency Input Components</div>
    <div id="curr1">
      <CurrencyInput
        bind:value={amount1}
        locale={locale}
        currency={currency}
        placeholder="Type right here"
        disabled={false}
      />
    </div>
    <div id="curr-plus">+</div>
    <div id="curr2">
      <CurrencyInput
        bind:value={amount2}
        locale={locale}
        currency={currency}
        placeholder="Type right here"
        disabled={false}
      />
    </div>
    <div id="curr-total">{formatIntegerToCurrency(total)}</div>
  </div>

  <div id="return-value">
    <div id="rv-title">Return Value</div>
    <div id="rv1">{amount1}</div>
    <div id="rv-plus">+</div>
    <div id="rv2">{amount2}</div>
    <div id="rv-total">{total}</div>
  </div>
</div>

<br>

*NOTE: The **Return Value** example above shows the value that is returned from this component. This is the value that you would use to run calculations or that you would send to the backend for processing or to store in a database. This value is an integer (as opposed to a float) and it is a `number` data type (as opposed to a `string`). Performing calculations with integers instead of floats prevents the precision errors that occur with floats.*

---

## Event Forwarding Example

* `oninput` fires when a user enters a value into the input field.
* `onchange` fires when a user changes the value in the input field and then the input field loses focus.
* `onblur` fires when the input field loses focus (e.g. when a user clicks outside of the input field or presses "Enter" or "Esc").

You can open your browser console and see how the `change`, `input`, and `blur` events work in this component when you enter data into the following input field:

<div>
  <CurrencyInput 
    onchange={handleChange}
    oninput={handleInput}
    onblur={handleBlur} 
  />
</div>

<br>

```svelte
<script lang="ts">
  function handleChange(event) {
    console.log("handleChange Event:", event);
  }

  function handleInput(event) {
    console.log("handleInput Event:", event);
  }

  function handleBlur(event) {
    console.log("handleBlur Event:", event);
  }
</script>

<CurrencyInput 
  onchange={handleChange}
  oninput={handleInput}
  onblur={handleBlur} 
/>
```

---

## Props

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `bind:value` | `number` (an integer) | any integer | `0` | The `value` prop needs to be an integer that is expressed in cents. This component will convert the `value` prop to a decimal. So, for example, if you want to load this component with a preset value, then that value needs to be expressed in cents (i.e. `543.21 * 100 = 54321`) rather than as a decimal value of dollars and cents.<br><br>The value returned from this component is an integer (as opposed to a float), which represents the cents for the amount. This approach appears to be what many other companies do to avoid precision errors when performing calculations.<br><br>This component's `value` prop needs to be bound to a variable that has a `number` data type and that is an integer.<br><br>It is important to understand that the data type of `value` is `number` (not `string`). In other words, the variable that is bound to the `value` prop is a `number` and it is simply formatted as a `string` using the [Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) before it is displayed in the browser.<br><br>That also means that when you store the value that is bound to the `value` prop (e.g. in a database), the data type of that value will be `number` (specifically an integer) rather than a `string`.  JavaScript's `number` data type automatically removes any insignificant trailing zeros after the decimal point. So if you are trying to store a number like `10.0`, `10.00`, `10.50`, or `10.550`, JavaScript will remove the insignificant zeros from the end of those numbers and return `10`, `10`, `10.5`, and `10.55`, respectively. Since this component returns integer values, this problem, as well as precision errors that occur with floating point values, are avoided. |
| `valAlign` | `string` | `left`, `right` | `right` | This prop will align the value in the input field either to left or the right side of the input field. |
| `locale` | `string` | Any locale identifier string. See [Intl.Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) for more details. | `en-US` | This prop is the locale identifier string that will format the currency value to the correct format. |
| `currency` | `string` | Any acceptable currency string. See [Intl.NumberFormat() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) for more details. | `USD` | This prop is the currency to use in currency formatting. |
| `colors` | See <a href="/docs#colors" class="table-link">colors</a>. ||||
| `sizes` | See <a href="/docs#sizes" class="table-link">sizes</a>. ||||
| `placeholder` (optional) | `string` | Any string | NA | This prop will act as the placeholder when the input field is empty. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the input field. |

<br>
<br>
<br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `oninput` | This component forwards the `input` event, so you can call an event handler when a user enters a value into the input field. |
| `onchange` | This component forwards the `change` event, so you can call an event handler when a user changes the value in the input field and then the input field loses focus. |
| `onblur` | This component forwards the `blur` event, so you can call an event handler when a user clicks outside of the input field or presses "Enter" or "Esc". Technically this component dispatches a custom `onblur` event by executing an `onblur` callback prop rather than forwarding the `onblur` DOM event. This is because the `onblur` DOM event is used internally in this component so it cannot be forwarded. However, the custom `onblur` event works the same as a forwarded `onblur` event. See the examples above for details. |


<style>
  #return-value-demo {
    display: flex;

    & #currency {
      margin-right: 150px;

      & #curr-total {
        padding-right: 11px;
      }
    }

    & #rv1, & #rv2 {
      padding-bottom: 11px;
    }

    & #currency, & #return-value {
      display: grid;
      align-items: end;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr 1fr;

      & #curr-title, & #rv-title {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        text-align: center;
        margin-bottom: 20px;
        font-weight: bold;
      }
      & #curr1, & #rv1 {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        text-align: right;
        margin-bottom: 5px;
      }
      & #curr-plus, & #rv-plus {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
        padding-right: 25px;
        padding-bottom: 11px;
      }
      & #curr2, & #rv2 {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
        text-align: right;
      }
      & #curr-total, & #rv-total {
        grid-column: 1 / 3;
        grid-row: 4 / 5;
        width: 100%;
        text-align: right;
        padding-top: 10px;
        border-top: var(--border);
        margin-top: 10px;
      }
    }
  }
</style>
