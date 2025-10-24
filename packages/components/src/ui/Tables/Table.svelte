<script lang="ts">
interface Cell {
  colspan?: number;
  textAlign?: string;
  fontSize?: string;
  background?: string;
  color?: string;
  fitContent?: "allContent" | "widestElement";
  wrapText?: boolean;
  data: string;
}

interface Props {
  id?: string;
  classes?: string;
  header: string[][] | Cell[][]; // An array of arrays where each nested array contains string or Cell elements.
  body: string[][] | Cell[][]; // An array of arrays where each nested array contains string or Cell elements.
  border: boolean;
  lastRowBottomBorder: boolean;
}

let {
  id = "",
  classes = "",
  header = [],
  body,
  border = true,
  lastRowBottomBorder = false,
  ...restProps
}: Props = $props();
</script>

<div
  class="fp-responsive-table"
  class:table-border={border}
>
  <table
    {id}
    class={`fp-table ${classes}`}
  >
    {#if header.length}
      <thead>
        {#each header as row}
          <tr>
            {#each row as cell}
              {#if typeof(cell) === "object"}
                <!-- Populate the object element. -->
                <th
                  colspan={cell.colspan} 
                  style={`
                    text-align: ${cell.textAlign};
                    font-size: ${cell.fontSize};
                    background: ${cell.background};
                    color: ${cell.color};
                    ${cell.fitContent ? "width: 1px;" : ""};
                  `}
                >
                  {@html cell.data}
                </th>
              {:else}
                <!-- Populate the string element. -->
                <th>{@html cell}</th>
              {/if}
            {/each}
          </tr>
        {/each}
      </thead>
    {/if}
    <tbody class:hide-last-row-bottom-border={!lastRowBottomBorder}>
      {#each body as row}
        <tr>
          {#each row as cell}
            {#if typeof(cell) === "object"}
              <!-- Populate the object element. -->
              <td
                colspan={cell.colspan} 
                style={`
                  text-align: ${cell.textAlign};
                  font-size: ${cell.fontSize};
                  background: ${cell.background};
                  color: ${cell.color};
                  ${(cell.fitContent === "allContent") ? ("width: 1px; white-space: nowrap;") : ((cell.fitContent === "widestElement") ? ("width: 1px;") : (""))};
                `}
              >
                {@html cell.data}
              </td>
            {:else}
              <!-- Populate the string element. -->
              <td>{@html cell}</td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  @media (--xs-up) {
    .fp-responsive-table {
      overflow-x: auto;

      &.table-border {
        border: var(--border);
        border-radius: var(--radius);
        padding: 10px;
      }

      & .fp-table {
        width: 100%;
        border-collapse: collapse;
      
        & tr {
          border-bottom: 1px var(--border-style) var(--border-color);

          & th, & td {
            padding: 10px 25px;
            text-align: left;
            vertical-align: top;
          }

          & th {
            font-weight: bold;
          }
        }

        /* & tbody tr:last-child {
          border-bottom: none;
        } */

        & .hide-last-row-bottom-border tr:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
