/**
 * All jmap view mode available
 */
export enum AppViewMode {
    PREVIEW = "PREVIEW",
    FULL = "FULL"
}

/**
 * All right that can be attached to a user
 */
export enum UserRight {
    ADMIN = "ADMIN",
    VIEW = "VIEW"
}

/**
 * List of parameters required or not in order to start properly the app
 */
export interface AppStartupOptions {
    viewMode: AppViewMode
    userRights: UserRight[]
}

/**
 * A project map projection
 */
export interface MapProjection {
    name: string
    description?: string
}

export interface ActionItem {
    name: string
    icon: string
    description: string
    action?: string
    children?: ActionItem[]
}

/**
 * A project Layer
 */
export interface MapLayer {
    name: string
    description?: string
}