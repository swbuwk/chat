module.exports = class UserDto {
    name;
    email;
    id;
    isActivated;
    isOnline;

    constructor(model) {
        this.name = model.name
        this.email = model.email
        this.id = model.id
        this.isActivated = model.is_activated
        this.isOnline = model.isonline
    }
}