<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    text: string;
    align?: string;
    children?: Snippet;
  }

  let {
    text,
    align = "left",
    children,
    ...restProps
  }: Props = $props();
</script>

<label class={align} {...restProps}>
  {text}
  {@render children?.()}
</label>

<style>
  label {
    display: block;
    /* font-size: 0.85rem; */

    &.left {
      text-align: left;
    }

    &.right {
      text-align: right;
    }
  }
</style>
