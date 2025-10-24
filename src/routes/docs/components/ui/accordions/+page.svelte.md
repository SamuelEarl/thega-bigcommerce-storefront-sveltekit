<script lang="ts">
  import { AccordionGroup, Accordion, TabsContainer, TabBar, Tab, TabPanel } from "$lib/client/components";
</script>


# Accordion

---

## Example Usage

<AccordionGroup>
  <Accordion btnText="Accordion 1">
    <p>Accordion content</p>
  </Accordion>

  <Accordion btnText="Accordion 2">
    <p>Accordion content</p>
  </Accordion>

  <Accordion btnText="Accordion 3">
    <p>Accordion content</p>
  </Accordion>
</AccordionGroup>

<br>

```svelte
<script>
  import { Accordion } from "$lib/client/components";
</script>

<AccordionGroup>
  <Accordion btnText="Accordion 1">
    <p>Accordion content</p>
  </Accordion>

  <Accordion btnText="Accordion 2">
    <p>Accordion content</p>
  </Accordion>

  <Accordion btnText="Accordion 3">
    <p>Accordion content</p>
  </Accordion>
</AccordionGroup>
```

<hr>

Setting `groupBorder={true}` on the `<AccordionGroup>` adds a border around a group of accordion menus to give the group a unified appearance. And you can set the `panelBorders` prop to `false` to remove the panel borders for the accordions.

<AccordionGroup
  panelBorders={false}
  groupBorder={true} 
  groupPadding="15px"
>
  <Accordion id="123" btnText="Accordion 1" open={true}>
    <p>This accordion panel is open by default</p>
  </Accordion>

  <Accordion btnText="Accordion 2">
    <p>Accordion content</p>
  </Accordion>

  <Accordion btnText="Accordion 3">
    <p>Accordion content</p>
  </Accordion>
</AccordionGroup>

<br>

```svelte
<script>
  import { AccordionGroup, Accordion } from "$lib/client/components";
</script>

<AccordionGroup
  panelBorders={false}
  groupBorder={true} 
  groupPadding="15px"
>
  <Accordion id="123" btnText="Accordion 1" open={true}>
    <p>This accordion panel is open by default</p>
  </Accordion>

  <Accordion btnText="Accordion 2">
    <p>Accordion content</p>
  </Accordion>

  <Accordion btnText="Accordion 3">
    <p>Accordion content</p>
  </Accordion>
</AccordionGroup>
```

<br>

Note that you can set the `groupPadding` prop to zero, like this `groupPadding=0` to have the accordions stretch to the edges of their parent element or you can set it to something like `groupPadding="25px"` to give it some padding between the accordions and the `groupBorder` or parent element.

<br>

## Props

<TabsContainer>
  <TabBar>
    <Tab>AccordionGroup</Tab>
    <Tab>Accordion</Tab>
  </TabBar>

  <TabPanel>
    <h2>AccordionGroup</h2>

    <!-- See the comment in the Tabs component props for an explanation of these empty divs. -->
    <!-- <div></div> -->

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `groupBorder`<br>*(optional)* | `boolean` | `true`, `false` | `true` | Add a border around a group of accordion menus to give the group a unified appearance. |
    | `groupPadding`<br>*(optional)* | `string` | Any CSS padding value | | The value that is passed to this prop will be applied as the padding between the `groupBorder` and the accordions. |
    | `btnColors` | See <a href="/docs#colors" class="table-link">colors</a>. | | | These styles only apply to the accordion buttons. |
    | `btnSizes` | See <a href="/docs#sizes" class="table-link">sizes</a>. | | | These styles only apply to the accordion buttons. |
    | `spaceBetweenAccordions`<br>*(optional)* | `string` | Any CSS margin value | `var(--size-4)` | The value that is passed to this prop will be applied as the margin below each of the accordion buttons. |
    | `panelBorders` | `boolean` | `true`, `false` | `false` | Pass `true` to put a border around each accordion panel in the group. |
    | `panelBgColors` | `string` | Any CSS color style | `transparent` | Pass any CSS color style to this prop, including `transparent`, to change the background color for all the accordion panels in the AccordionGroup. |

    </div>
  </TabPanel>

  <TabPanel>
    <h2>Accordion</h2>
    
    <!-- <div></div> -->

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `btnText` | `string` | Any string | NA | This prop will provide the button text for the `<Accordion>` component's button. |
    | `open`<br>*(optional)* | `boolean` | `true`, `false` | `false` | This prop will cause the `<Accordion>` component's panel to either be open or closed by default. |
    | `panelBorder` | `boolean` | `true`, `false` | `false` | Pass `true` to put a border around an individual accordion panel. NOTE: The default value is equal to the value that is passed to the `panelBorders` prop in the `<AccordionGroup />` component. |
    | `panelBgColor` | `string` | Any CSS color style | `transparent` | Pass any CSS color style to this prop, including `transparent`, to change the background color for an individual accordion panel. |

    </div>
  </TabPanel>
</TabsContainer>

<br><br>

## Snippets

<TabsContainer>
  <TabBar>
    <Tab>AccordionGroup</Tab>
    <Tab>Accordion</Tab>
  </TabBar>

  <TabPanel>
    <h2>AccordionGroup</h2>

    <!-- See the comment in the Tabs component props for an explanation of these empty divs. -->
    <!-- <div></div> -->

    <div class="responsive-table">

    | Snippet name | Default value | Description |
    | ------------ | ------------- | ----------- |
    | `children` | NA | You can nest as many `<Accordion>` components as you want in between the opening `<AccordionGroup>` and closing `</AccordionGroup>` tags. |

    </div>
  </TabPanel>

  <TabPanel>
    <h2>Accordion</h2>
    
    <!-- <div></div> -->

    <div class="responsive-table">

    | Snippet name | Default value | Description |
    | ------------ | ------------- | ----------- |
    | `children` | NA | The elements you nest in between the opening `<Accordion>` and closing `</Accordion>` tags will appear as the `<Accordion>` component's panel content. You can nest any elements you want in between the opening `<Accordion>` and closing `</Accordion>` tags. |

    </div>
  </TabPanel>
</TabsContainer>
