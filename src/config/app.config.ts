interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Customer Support'],
  customerRoles: ['Student'],
  tenantRoles: ['Customer Support'],
  tenantName: 'Organization',
  applicationName: 'NEET PYQ',
  addOns: ['notifications', 'file'],
};
