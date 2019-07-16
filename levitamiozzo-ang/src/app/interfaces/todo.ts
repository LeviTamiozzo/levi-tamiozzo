export class Todo {
    _id: string;
    user: string;
    todos: any[];

    constructor() {
        this._id = "";
        this.user = "";
        this.todos = [];
    };
}
