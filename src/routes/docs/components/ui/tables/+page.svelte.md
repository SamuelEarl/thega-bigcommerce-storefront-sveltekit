<script lang="ts">
  import { Table } from "$lib/client/components";
</script>

# Tables

This `<Table>` component is responsive by default. HTML table elements are not responsive in the same way that other elements are responsive. The width of a table will shrink to fit the width of the screen as much as possible, but the width can only shrink to a certain point. After that a horizontal scrollbar will be applied to the bottom of the table, which will allow you to scroll the table left to right to view the entire table.

---

## Example Usage

<br>

<Table
  header={[
    [
      {
        data: "This Header Spans The Width of The Entire Table",
        colspan: 4, 
        textAlign: "center", 
        fontSize: "24px", 
        background: "var(--dark-red)", 
        color: "var(--white)",
      },
    ],
    [
      "Examples",
      'String Data Cell',
      "String Data Cell w/ Backticks",
      "Object Data Cell",
    ],
  ]}
  body={[
    [
      "Some examples of data cells", 
      "Display inline computer code with <code>&lt;code&gt;</code> tags:<br><code>Col 2 data</code>",
      `If you wrap the cell data in backticks, then you can use multi-line text and 
      HTML tags that require multi-line text (e.g. <code>&lt;pre&gt;</code> tags):<br>
<pre>
function sum(num1, num2) {
  return num1 + num2;
}
const result = sum(5, 7);
</pre>`,
      {
        data: `If you use an object to define the cell data, 
        then you can also wrap the value of the <code>data</code> 
        attribute in backticks. However, you can also use the 
        <code>fitContent</code> attribute to make the cell width
        fit the width of the content.<br>
<pre>
function sum(num1, num2) {
  return num1 + num2;
}
const result = sum(5, 7);
</pre>`,
        fitContent: "widestElement",
      }
    ],
    [
      "Span multiple columns with the <code>colspan</code> attribute",
      { 
        data: `As you can see, this column spans multiple columns, 
        which is something that you cannot do with Markdown tables.`,
        colspan: 3,
      }
    ],
  ]}
  border={false}
  lastRowBottomBorder={true} 
/>

<br><br><br>

```svelte
<script lang="ts">
  import { Table } from "$lib/client/components";
</script>

<Table
  header={[
    [
      {
        data: "This Header Spans The Width of The Entire Table",
        colspan: 4, 
        textAlign: "center", 
        fontSize: "24px", 
        background: "var(--dark-red)", 
        color: "var(--white)",
      },
    ],
    [
      "Examples",
      'String Data Cell',
      "String Data Cell w/ Backticks",
      "Object Data Cell",
    ],
  ]}
  body={[
    [
      "Some examples of data cells", 
      "Display inline computer code with <code>&lt;code&gt;</code> tags:<br><code>Col 2 data</code>",
      `If you wrap the cell data in backticks, then you can use multi-line text and 
      HTML tags that require multi-line text (e.g. <code>&lt;pre&gt;</code> tags):<br>
<pre>
function sum(num1, num2) {
  return num1 + num2;
}
const result = sum(5, 7);
</pre>`,
      {
        data: `If you use an object to define the cell data, 
        then you can also wrap the value of the <code>data</code> 
        attribute in backticks. However, you can also use the 
        <code>fitContent</code> attribute to make the cell width
        fit the width of the content.<br>
<pre>
function sum(num1, num2) {
  return num1 + num2;
}
const result = sum(5, 7);
</pre>`,
        fitContent: "widestElement",
      }
    ],
    [
      "Span multiple columns with the <code>colspan</code> attribute",
      { 
        data: `As you can see, this column spans multiple columns, 
        which is something that you cannot do with Markdown tables.`,
        colspan: 3,
      }
    ],
  ]}
  border={false}
  lastRowBottomBorder={true} 
/>
```

<br>

---

## Props

<Table
  header={[
    [
      "Prop name",
      "Type", 
      "Possible values", 
      "Default value", 
      "Description"
    ],
  ]}
  body={[
    [
      "<code>header</code>",
      "An array of arrays",
      "Each item in a nested array should be either a <code>string</code> or an <code>object</code>",
      "No default value",
      "The <code>header</code> prop takes an array of arrays. Each nested array will be a row in the table <code>header</code>. Each item in a nested array should either be a <code>string</code> or an <code>object</code> and each of those items will be displayed as a <code>&lt;th&gt;</code> cell within the <code>header</code> row.<br><br>If you simply want to pass text data to a <code>&lt;th&gt;</code> element, then pass a <code>string</code>. If you want to pass text data and attributes to a <code>&lt;th&gt;</code> element (e.g. <code>colspan</code>, <code>textAlign</code>, <code>fontSize</code>, <code>background</code>, <code>color</code>, <code>fitContent</code>), then pass an <code>object</code> with the properties that you want to apply to the cell."
    ],
    [
      "<code>body</code>",
      "An array of arrays",
      "Each item in a nested array should be either a <code>string</code> or an <code>object</code>",
      "No default value",
      "The <code>body</code> prop takes an array of arrays. Each nested array will be a row in the table <code>body</code>. Each item in a nested array should either be a <code>string</code> or an <code>object</code> and each of those items will be displayed as a <code>&lt;td&gt;</code> cell within the <code>body</code> row.<br><br>Refer to the description for the <code>header</code> prop for details on passing data and attributes to table cells."
    ],
    [
      "<code>border</code>",
      "<code>boolean</code>",
      "<code>true</code>, <code>false</code>",
      "<code>true</code>",
      "Add a border around the table."
    ],
    [
      "<code>lastRowBottomBorder</code>",
      "<code>boolean</code>",
      "<code>true</code>, <code>false</code>",
      "<code>false</code>",
      "Display the bottom border on the last row. If you have a border around the table, then you may not want to show the last row's bottom border."
    ],
  ]}
/>

<br><br>

## Cell Attributes

If you want to add styles to a cell, then pass an object as the item in a nested array for the corresponding cell. For example:

```typescript
body={[
  [
    {
      data: "The cell data goes here",
      colspan: 2, 
      textAlign: "center", 
      fontSize: "24px", 
      background: "var(--neutral-11)", 
      color: "var(--white)",
      fitContent: "allContent",
    },
  ],
]}
```

<br>

<Table
  header={[
    [
      "Attribute name",
      "Type",
      "Possible values",
      "Default value",
      "Description",
    ],
  ]}
  body={[
    [
      "<code>data</code>",
      "<code>string</code>",
      "Any string",
      "N/A",
      "The cell data.",
    ],
    [
      "<code>colspan</code>",
      "<code>number</code>",
      "Any number",
      "N/A",
      "The number of columns to span.",
    ],
    [
      "<code>textAlign</code>",
      "<code>string</code>",
      '<code>"left"</code>, <code>"right"</code>, <code>"center"</code>',
      '<code>"left"</code>',
      "Align the cell data.",
    ],
    [
      "<code>fontSize</code>",
      "<code>string</code>",
      "Any CSS measurement",
      "N/A",
      "Change the font size of the cell data.",
    ],
    [
      "<code>background</code>",
      "<code>string</code>",
      "Any CSS background style",
      "N/A",
      "Change the background of the cell.",
    ],
    [
      "<code>color</code>",
      "<code>string</code>",
      "Any CSS color",
      "N/A",
      "Change the font color of the cell data.",
    ],
    [
      "<code>fitContent</code>",
      "<code>string</code>",
      '<code>undefined</code>, <code>"allContent"</code>, <code>"widestElement"</code>',
      '<code>undefined</code>',
      '<code>undefined</code>: The width and text wrapping will have the default behavior (i.e. the browser will determine how wide the cell/column should be in relation to the other cells/columns in the table).<br><br><code>"allContent"</code>: The cell width will fit all the content and the text will not wrap on white spaces (i.e. the text will continue on the same line until a <code>&lt;br&gt;</code> tag is encountered).<br><br><code>"widestElement"</code>: The cell width will fit the widest element in the cell (e.g. an image, a <code>&lt;pre&gt;</code> code example). Any text in the cell will wrap to fit the width of the widest element in the cell.',
    ],
  ]}
/>

<br>
