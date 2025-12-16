import { LightningElement, api } from 'lwc';

export default class GrandchildComponent extends LightningElement {
    @api productName
    @api productId
    @api productRating
}