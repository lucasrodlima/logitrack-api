export class DockUnavailableError extends Error {
    constructor() {
        super("Dock is not available for check-in.");
    }
}
