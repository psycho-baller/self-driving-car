<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'sveltestrap';

  import { get } from 'svelte/store';
  import { raceMode } from '../store';
  let isOpen = false;
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
  />
</svelte:head>

<Dropdown setActiveFromChild {isOpen} toggle={() => (isOpen = !isOpen)}>
  <DropdownToggle caret size="sm">{get(raceMode)} Mode</DropdownToggle>
  <DropdownMenu dark>
    <DropdownItem header>Choose Mode</DropdownItem>
    <DropdownItem on:click={() => raceMode.update(() => true)} active={get(raceMode) === true}
      >Racing Mode</DropdownItem
    >
    <DropdownItem on:click={() => raceMode.update(() => false)} active={get(raceMode) === false}
      >Learning Mode</DropdownItem
    >
    <!-- <DropdownItem disabled>Action (disabled)</DropdownItem>
    <DropdownItem divider />
    <DropdownItem>Foo Action</DropdownItem>
    <DropdownItem>Bar Action</DropdownItem>
    <DropdownItem>Quo Action</DropdownItem> -->
  </DropdownMenu>
</Dropdown>
