export enum AppViewMode {
    PREVIEW = "PREVIEW",
    FULL = "FULL"
}
export enum AppUserRight {
    ADMIN = "ADMIN",
    VIEW = "VIEW"
}
export interface AppOptions {
    viewMode: AppViewMode,
    userRights: AppUserRight[]
}