import httpContext from 'express-http-context';
import { AccessDeniedError } from './errors';

export const loggedInUser = () => ({
  loggedInUser: httpContext.get('loggedInUser'),

  get() {
    return { ...this.loggedInUser };
  },

  name(): string {
    return this.loggedInUser.name;
  },

  getId(): string {
    return this.loggedInUser.userId;
  },

  isCustomer(): boolean {
    return this.loggedInUser.roles.some((role: string) => role === 'customer');
  },

  isAgent(): boolean {
    return this.loggedInUser.roles.some((role: string) => role === 'agent');
  },

  authorizeRole(roleToCheck: string): boolean {
    const hasRole = this.loggedInUser.roles.some((role: string) => role === roleToCheck);

    if (!hasRole) {
      throw new AccessDeniedError(
        'Access Denied. User does not have access to perform this action',
      );
    }

    return hasRole;
  },

  hasRole(roleToCheck: string): boolean {
    return this.loggedInUser.roles.some((role: string) => role === roleToCheck);
  },

  hasAnyRole(rolesToCheck: string[]): boolean {
    const hasAnyRole = this.loggedInUser.roles.some((role: string) =>
      rolesToCheck.some((roleToCheck) => roleToCheck === role),
    );

    if (!hasAnyRole) {
      throw new AccessDeniedError(
        `Access Denied. You need to have any of this roles (${rolesToCheck.join(
          ',',
        )}) to perform this action.`,
      );
    }

    return true;
  },

  hasAllRoles(rolesToCheck: string[]): boolean {
    const seenRoles = this.loggedInUser.roles.filter((role: string) =>
      rolesToCheck.some((roleToCheck) => roleToCheck === role),
    );
    const hasAllRoles = seenRoles.length === rolesToCheck.length;

    if (!hasAllRoles) {
      throw new AccessDeniedError(
        `Access Denied. User does not have all roles : ${rolesToCheck.join(',')}`,
      );
    }

    return true;
  },
});
