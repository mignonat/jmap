export interface MapProjection {
    name: string
}

export interface MapLayerLayer {
    name: string,
    projection: MapProjection
}

export interface RootState {
    isLoading: boolean
    layers: MapLayerLayer[]
}