export class UserDto {
    /** @type {string} */
    id;
    /** @type {string} */
    email;
    /** @type {boolean} */
    isActivated;

    /**
     * @param UserModel
     */
    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}
