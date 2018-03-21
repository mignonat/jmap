import { Vue, Component, Prop } from "vue-property-decorator"

@Component({})
/**
 * Manage a simple state for a component
 * Ex : a checkbox state checked/unchecked
 */
export default class ToggableComponent extends Vue {
    @Prop({ type: Boolean })
    public initialState: boolean

    @Prop({ type: Boolean, default: false })
    public emitEvent: boolean

    public isOn: boolean = this.initialState === undefined ? false : this.initialState

    get toggableCssClass(): string {
        return this.isOn ? "toggle-on" : "toggle-off"
    }

    public toggle(): boolean {
        this.isOn = ! this.isOn
        if (this.emitEvent) {
            this.$emit("toggle", this.isOn)
        }
        return this.isOn
    }
}
