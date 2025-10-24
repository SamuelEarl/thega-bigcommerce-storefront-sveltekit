<!-- 
  Refer to the `generate-css-icons.js` script file in the root directory for instructions on how to use this component with CSS icons from Iconify.
-->

<script lang="ts">
  interface Props {
    icon: string;
  }

  let {
    icon,
    ...restProps
  }: Props = $props();

  // Split the `icon` string into the iconSet and iconName strings.
  const [iconSet, iconName] = icon.split(":"); 
</script>

<span class={`icon--${iconSet} icon--${iconSet}--${iconName}`} {...restProps}></span>
