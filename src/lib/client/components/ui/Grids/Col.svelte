<script lang="ts">
  import { getContext } from "svelte";
  import { GRID_KEY } from "./Grid.svelte";
  import type { Snippet } from "svelte";
  
  interface Props {
    // Number of columns for each breakpoint.
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
    children?: Snippet
  }

  let {
    xs = undefined,
    sm = undefined,
    md = undefined,
    lg = undefined,
    xl = undefined,
    xxl = undefined,
    children
  }: Props = $props();

  let {
    gap,
    equalColWidths,
  } = getContext(GRID_KEY);

  const breakpointNames = ["xs", "sm", "md", "lg", "xl", "xxl"];

  // Create the set of classes that the column <div> element will have.
  let columnClasses = $derived([xs, sm, md, lg, xl, xxl]
    .map((numberOfColumns, i) => {
      let breakpoint = breakpointNames[i];

      if (numberOfColumns !== undefined) {
        return `fp-${breakpoint}-${numberOfColumns}`;
      }
    })
    // Remove falsy values from the array.
    .filter(Boolean)
    // Join the classes into a single string separated by a space.
    .join(" ")
  );
</script>

<div 
  class={`fp-flex-col ${columnClasses}`}
  class:fp-equal-col-widths={equalColWidths}
  style={`padding: ${gap.r / 2}px ${gap.c / 2}px;`}
>
  {@render children?.()}
</div>

<style>
  .fp-equal-col-widths {
    flex: 1;
  }

  .fp-flex-col {

    @media (--xs-up) {
      &.fp-xs-0 {
        display: none;
      }

      &.fp-xs-1 {
        display: block;
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-xs-2 {
        display: block;
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-xs-3 {
        display: block;
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-xs-4 {
        display: block;
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-xs-5 {
        display: block;
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-xs-6 {
        display: block;
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-xs-7 {
        display: block;
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-xs-8 {
        display: block;
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-xs-9 {
        display: block;
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-xs-10 {
        display: block;
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-xs-11 {
        display: block;
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-xs-12 {
        display: block;
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--sm-up) {
      &.fp-sm-0 {
        display: none;
      }

      &.fp-sm-1 {
        display: block;
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-sm-2 {
        display: block;
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-sm-3 {
        display: block;
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-sm-4 {
        display: block;
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-sm-5 {
        display: block;
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-sm-6 {
        display: block;
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-sm-7 {
        display: block;
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-sm-8 {
        display: block;
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-sm-9 {
        display: block;
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-sm-10 {
        display: block;
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-sm-11 {
        display: block;
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-sm-12 {
        display: block;
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--md-up) {
      &.fp-md-0 {
        display: none;
      }

      &.fp-md-1 {
        display: block;
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-md-2 {
        display: block;
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-md-3 {
        display: block;
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-md-4 {
        display: block;
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-md-5 {
        display: block;
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-md-6 {
        display: block;
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-md-7 {
        display: block;
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-md-8 {
        display: block;
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-md-9 {
        display: block;
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-md-10 {
        display: block;
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-md-11 {
        display: block;
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-md-12 {
        display: block;
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--lg-up) {
      &.fp-lg-0 {
        display: none;
      }

      &.fp-lg-1 {
        display: block;
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-lg-2 {
        display: block;
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-lg-3 {
        display: block;
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-lg-4 {
        display: block;
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-lg-5 {
        display: block;
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-lg-6 {
        display: block;
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-lg-7 {
        display: block;
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-lg-8 {
        display: block;
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-lg-9 {
        display: block;
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-lg-10 {
        display: block;
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-lg-11 {
        display: block;
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-lg-12 {
        display: block;
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--xl-up) {
      &.fp-xl-0 {
        display: none;
      }

      &.fp-xl-1 {
        display: block;
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-xl-2 {
        display: block;
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-xl-3 {
        display: block;
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-xl-4 {
        display: block;
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-xl-5 {
        display: block;
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-xl-6 {
        display: block;
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-xl-7 {
        display: block;
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-xl-8 {
        display: block;
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-xl-9 {
        display: block;
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-xl-10 {
        display: block;
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-xl-11 {
        display: block;
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-xl-12 {
        display: block;
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--xxl-up) {
      &.fp-xxl-0 {
        display: none;
      }

      &.fp-xxl-1 {
        display: block;
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-xxl-2 {
        display: block;
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-xxl-3 {
        display: block;
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-xxl-4 {
        display: block;
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-xxl-5 {
        display: block;
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-xxl-6 {
        display: block;
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-xxl-7 {
        display: block;
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-xxl-8 {
        display: block;
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-xxl-9 {
        display: block;
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-xxl-10 {
        display: block;
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-xxl-11 {
        display: block;
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-xxl-12 {
        display: block;
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }
  }
</style>
