<script lang="ts">
  import PackageCreate from '@/lib/PackageCreate.svelte';
  import { trpc } from "@/api"
  import type { Shipment } from "@backend/server"
    import { onMount } from 'svelte';

  let trackingNumber: string | undefined = ""
  let shipments: Shipment[] = []

  const loadPackages = async() => {
    shipments = await trpc.allPackages.query()
  }

  const packageCreate = async() => {
    if (!trackingNumber) {
      return
    }
    void await trpc.packageCreate.mutate(trackingNumber)
    loadPackages()
  }

  onMount(loadPackages)
</script>

<main>
  <div>
    <PackageCreate bind:trackingNumber on:click={packageCreate} />
    {#each shipments as shipment}
      {JSON.stringify(shipment)}
    {/each}
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
