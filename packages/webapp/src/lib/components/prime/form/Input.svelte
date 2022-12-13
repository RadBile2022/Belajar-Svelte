<script>
  import Input from "@deboxsoft/svelte-form/InputField.svelte";
  import { generateId } from "@deboxsoft/module-client";
  import { clsx } from "@deboxsoft/svelte-core";

  export let label = undefined;
  export let id = generateId({ size: 5, prefix: "input" });
  export let inline = false;
  export let containerClass = clsx("flex", inline ? "flex flex-1 items-baseline gap-2" : "flex-col");
  export let labelClass = "mb-1 mx-2";
  export let type = "text";
</script>

<div class={containerClass}>
  {#if label}
    <label for={id} class={labelClass}>{label}</label>
  {/if}
  <Input
    {id}
    {type}
    class="text-fg border-base border-base appearance-none rounded-md border py-1 px-3 align-middle text-sm placeholder-neutral-200 transition-colors focus:outline-none"
    {...$$restProps}
  >
    <slot />
  </Input>
</div>
