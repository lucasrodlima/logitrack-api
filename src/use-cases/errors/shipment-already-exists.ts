export class ShipmentAlreadyExistsError extends Error {
    constructor() {
        super("Tracking code already exists.");
    }
}
