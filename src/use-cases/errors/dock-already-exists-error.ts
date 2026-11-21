export class DockAlreadyExistsError extends Error {
    constructor() {
        super("Dock code already exists.");
    }
}
