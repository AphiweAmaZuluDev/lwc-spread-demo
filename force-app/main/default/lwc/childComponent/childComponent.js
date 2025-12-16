import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api productsFound = false
    @api productList

    get hasProduct() {
        return this.productsFound == "true" ? true : false
    }
}