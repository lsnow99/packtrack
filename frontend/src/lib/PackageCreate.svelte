<script lang="ts">
  export let trackingNumber: string | undefined = undefined;
</script>

<div>
  <input
    type="text"
    bind:value={trackingNumber}
    placeholder="Tracking number"
  /><button disabled={!trackingNumber} on:click>Submit</button>
</div>
