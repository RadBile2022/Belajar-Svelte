import { ServerApiConfig } from "@deboxsoft/module-core";
import { createAccessControlPermissionProvider, createUsersRest } from "@deboxsoft/users-client";
import { createAuthenticationContext } from "@deboxsoft/users-svelte";

/**
 *
 * @param opts {import("@deboxsoft/users-client").UsersModuleRestOptions}
 */
export const usersModuleLoader = (opts: ServerApiConfig) => {
  createUsersRest(opts);
};

export const authenticationLoader = (opts: ServerApiConfig) => {
  createAccessControlPermissionProvider(opts);
  createAuthenticationContext({
    typeStore: "cookie"
  });
};
