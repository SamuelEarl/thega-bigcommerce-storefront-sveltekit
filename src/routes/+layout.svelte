<script lang="ts">
  import { beforeNavigate, goto } from "$app/navigation";
	import type { Snippet } from "svelte";
	import { Toast } from "$lib/client/components";
	import "$lib/client/assets/styles/main.css";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  // # State Management for User Permissions
  // * TODO: I don't think I need to worry about checking the user's authentication status in the client side because that is already handled on the server with each page request. However, I will need to have access to the user's permissions array in the client side to show or hide different features in the UI. I think I would call the `/auth/get-current-user` API endpoint from the `+layout.svelte` file and store that information in a store with context (see the following notes). The Kinde SvelteKit SDK used the `+layout.server.ts` file to check for authentication and then do some other stuff, so I think the `+layout.svelte` file would make sense to handle some of this auth stuff.
  // * I also need to be able to update a user's permissions when they subscribe to new features or cancel their subscription. (See this file: src/routes/(private)/iam/update-permissions/+server.ts) I think that would be done using the same techniques (e.g. load function plus pass data to components or use the $page.data store) and I would need to set a new cookie with those permissions.

  // TODO: IMPLEMENT ROUTE GUARDS HERE WITH KINDE. There is also a beforeNavigate method in the "src/routes/(private)/+layout.svelte" file, so I need to figure out which location makes the most sense for this method. Since I am trying to protect private routes it might make more sense to have a route guard in the private layout file.
  beforeNavigate(({ to }) => {
    console.log("NAVIGATING TO ROUTE:", to);
    if (to?.route.id?.startsWith("/(private)")) {
      console.log("TODO: DO I NEED TO IMPLEMENT ROUTE GUARDS?");
      // Check if user is authenticated.
      // If the user is NOT authenticated, then redirect them to the home page.
      // goto("/");
    }
  });
</script>

<svelte:head>
	<title>THEGA | THE GAME IS LIFE</title>
</svelte:head>

<Toast />

{@render children?.()}
