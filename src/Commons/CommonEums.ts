
export enum UserType {
    BillingAdmin = 'billingAdmin',
    SuperAdmin = 'superAdmin',
    Associate = 'associate'
}

export enum BillingAccountPlan {
    BillingAdmin = 'trail',
    Basic = 'basic',
    SuperAdmin = 'plus',
    Associate = 'premium'
}

export enum payerType {
    Federal = 'federal',
    Business = 'commercial',
    MCO    = 'individual'
}

export enum ProviderAccountType {
    Group = 'group',
    Individual = 'individual',
    GroupWithoutAssociateProviders = 'groupWithoutAssociateProviders',
}

export enum loginMethod {
  email = 'email',
  google = 'google',
  microsoft = 'microsoft'
}

export enum userAccessLevel {
    readonly = 'readonly',
    readwrite = 'readwrite',
    admin = 'readWriteDelete'
}