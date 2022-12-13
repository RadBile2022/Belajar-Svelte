<script context="module">
  import { Container, getLogger } from "@deboxsoft/module-core";
  import { CONFIG_KEY, getConfig } from "@deboxsoft/module-core/libs/config";
  import { createJwtStore } from "@deboxsoft/svelte-core";
  import { get } from "svelte/store";
  import { createFetchApi, FETCH_API_DEFAULT_KEY } from "@deboxsoft/module-client";
  import { AuthenticationError } from "@deboxsoft/users-api";
  import { createAccessControlPermissionProvider, createUsersRest } from "@deboxsoft/users-client";
  import { createAuthenticationContext } from "@deboxsoft/users-svelte";

  let bootLoader = true;
  /**
   * @type {RoutifyLoad}
   */
  export const load = async ({ route }) => {
    if (bootLoader) {
      let authResult;
      const logger = getLogger();
      const config = route.router.rootNode.meta;
      Container.set(CONFIG_KEY, config);

      const { authService, groupService, userService } = createUsersRest(config);
      createAccessControlPermissionProvider(config);
      const authenticationContext = createAuthenticationContext({
        typeStore: "cookie"
      });
      const authExpiredErrorHandler = async (error) => {
        const dataError = await error.response.json();
        if (dataError?.instanceOf === "AuthenticationError") {
          const authError = new AuthenticationError(dataError);
          const logger = getLogger();
          authenticationContext.setAuthenticate({
            meta: dataError.meta,
            authenticated: false
          });
          return authError;
        }
        return error;
      };
      try {
        const jwtStore = createJwtStore();
        const _token = get(jwtStore);
        let headerJwt;
        if (_token) {
          headerJwt = `Bearer ${_token}`;
        }
        const fetchApi = createFetchApi({
          ...config,
          key: FETCH_API_DEFAULT_KEY,
          prefixUrl: config.apiPath,
          // https://stackoverflow.com/questions/56965476/cors-cookie-not-set-on-cross-domains-using-fetch-set-credentials-include-an
          credentials: "include",
          headers: {
            Authorization: headerJwt
          },
          hooks: {
            beforeError: [authExpiredErrorHandler.bind({ authenticationContext })]
          }
        });
        groupService.setFetchApi(fetchApi);
        userService.setFetchApi(fetchApi);
        authService.setFetchApi(fetchApi);
        authResult = await authenticationContext.authenticate();
      } catch (e) {
        logger.debug("auth: unauthenticated", e);
      } finally {
        const { authenticationStore } = createAuthenticationContext({
          typeStore: "cookie",
          initial: authResult
        });
        bootLoader = false;
      }
    }
  };
</script>

<script>
  import { afterUrlChange, beforeUrlChange, isActive } from "@roxi/routify";
  import { onMount } from "svelte";
  import { createUIContext } from "@deboxsoft/svelte-core";
  import TopLoader from "@deboxsoft/svelte-components/loaders/TopLoader.svelte";
  import Loader from "@deboxsoft/svelte-components/loaders/Loader.svelte";
  import Notifications from "@deboxsoft/svelte-components/toast/Notifications.svelte";
  import { authenticationLoader, usersModuleLoader } from "$lib/loaders/users-module";
  import "virtual:fonts.css";
  import "./style.css";

  const brandTitle = "LMS";

  const logger = getLogger();
  let authResult;

  const {
    loadUIStore,
    notifyContext,
    loadingStore,
    setCurrentPath,
    getCurrentPath,
    store: uiStore
  } = createUIContext({
    brandTitle,
    isActive
  });

  usersModuleLoader(getConfig());
  authenticationLoader(getConfig());
  $loadingStore = true;
  let ready,
    currentPath,
    loading,
    loadingRouter = false;
  onMount(() => {
    ready = true;
    $loadingStore = false;
    loadUIStore();
    currentPath = getCurrentPath();
  });

  $: loading = loadingRouter || $loadingStore;
  $: $beforeUrlChange(() => (loadingRouter = true));
  $: $afterUrlChange(() => (loadingRouter = false));
</script>

{#if !ready}
  <Loader isPageBody />
{:else}
  <TopLoader {loading} />
  <Notifications {notifyContext} />
  <slot />
{/if}

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: theme("backgroundColor.canvas.DEFAULT");
    color: theme("textColor.fg.DEFAULT");
  }
</style>
