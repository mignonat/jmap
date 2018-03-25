/**
 * All jmap view mode available
 */
export enum IAppViewMode {
    PREVIEW = "PREVIEW",
    FULL = "FULL",
}

/**
 * All right that can be attached to a user
 */
export enum IUserRight {
    ADMIN = "ADMIN",
    VIEW = "VIEW",
}

/**
 * List of parameters required or not in order to start properly the app
 */
export interface IAppStartupOptions {
    viewMode: IAppViewMode
    userRights: IUserRight[],
    autoStartApp?: boolean
}

/**
 * A project map projection
 */
export interface IMapProjection {
    name: string
    description?: string
}

export interface IActionItem {
    name: string
    icon: string
    description: string
    action?: string
    children?: IActionItem[]
}

/**
 * A project Layer
 */
export interface IMapLayer {
    name: string
    description?: string
    isSelected: boolean
}
