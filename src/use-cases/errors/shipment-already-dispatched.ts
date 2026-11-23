export class ShipmentAlreadyDispatchedError extends Error {
    constructor() {
        super("Shipment has already been dispatched.");
    }
}
