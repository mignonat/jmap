import { Vue, Component, Prop } from "vue-property-decorator"

@Component({})
export default class SizeableComponent extends Vue {
    @Prop({ type: String, default: 'medium' })
    size: string

    get sizeCssClass(): string {
        switch (this.size) {
            case 'small': return 'small'
            case 'big': return 'big'
            default: return 'medium'
        }
    }
}