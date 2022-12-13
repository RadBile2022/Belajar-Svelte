<script>
  import { Input, Form } from "$lib/components/prime/index.ts";
  import { createFormContext } from "@deboxsoft/svelte-form";

  const formContext = createFormContext({});
  function loginHandler() {}
</script>

<Form class="space-y-4" on:submit={loginHandler}>
  <Input name="username" label="Username" placeholder="Username *" />
  <Input name="password" type="password" label="Password" placeholder="Password *" />
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <input
        id="remember_me"
        name="remember_me"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label for="remember_me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
    </div>

    <div class="text-sm">
      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
    </div>
  </div>

  <div>
    <button
      type="submit"
      class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Sign in
    </button>
  </div>
</Form>
