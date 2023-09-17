<script>
  export let ordered;
  export let start;
</script>

{#if ordered}
  <ol {start}><slot /></ol>
{:else}
  <ul><slot /></ul>
{/if}

<style>
  ul,
  ol {
    margin-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }
</style>
