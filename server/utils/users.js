[{
    id: 'fsdfdsfds77schsdhcs',
    name: 'Pera',
    room: 'Some room'
}]

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }
}

module.exports = {Users};