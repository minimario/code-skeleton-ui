var app = new Vue({
    el: '#app',
    data: {
        items: [],
        submitted: false,
        prompts: [
            "I want a company management app where I can track my employees, their schedules, and their compensation."
            // , "I want a pet store app tracking customers. The pet store app should also keep the store's inventory of pets and allow customers to buy and sell pets."
            , "I want a restaurant management app tracking customers, their reservations, their orders, and menu items."
            , "I want a hotel app tracking guests, their reservations. The hotel app should also track which guests occupy which rooms."
            // , "I want a dating app where students can indicate other students they are interested in, and the dating app will match them."
            , "I want a library app to track books. The customers can borrow books and return books from the library."
            , "I want a concert management app that lists concerts, their dates, and their locations. The customers can also buy tickets to concerts."
            // , "I want a classroom management app that tracks students, the assignments they've submitted, and the grades they've earned on those assignments."
            // , "I want an academic conference management system where I can track papers, their authors, and their reviews."
        ],
        selectedPrompt: null,
    },
    created: function () {
        fetch("https://skeleton-server.herokuapp.com");

        index = Math.floor(Math.random() * this.prompts.length);
        this.selectedPrompt = this.prompts[index];
        this.addTable();
    },
    methods: {
        addField(index) {
            this.items[index].fields.push({
                fieldName: "",
                fieldType: "",
            });
        },
        saveField(index, item, fieldName, fieldType) {
            this.items[index].fields[item].fieldName = fieldName,
                this.items[index].fields[item].fieldType = fieldType
        },
        deleteField(index, fieldIndex) {
            this.items[index].fields.splice(fieldIndex, 1);
        },
        addMethod(index) {
            this.items[index].methods.push({
                methodName: "",
            });
        },
        deleteMethod(index, methodIndex) {
            this.items[index].methods.splice(methodIndex, 1);
        },
        addTable() {
            this.submitted = false;
            this.items.push({
                tableName: "",
                fields: [{
                    fieldName: "",
                    fieldType: "",
                }],
                methods: [{
                    methodName: "",
                }],
                edit: true,
            });
        },
        deleteTable(index) {
            this.items.splice(index, 1)
        },
        editTable(index) {
            this.items[index].edit = true;
        },
        saveTable(index) {
            this.items[index].edit = false;
        },
        editAll() {
            for (var index = 0; index < this.items.length; index++) {
                this.items[index].edit = true;
            }
        },
        saveAll() {
            for (var index = 0; index < this.items.length; index++) {
                this.items[index].edit = false;
            }
        },
        submitAll() {
            let data = {
                prompt: this.selectedPrompt,
                submission: JSON.stringify(this.items)
            };

            fetch("https://skeleton-server.herokuapp.com/submit", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: JSON.stringify(data)
            }).then(res => {
                console.log("Request complete! response:", res);
            });

            this.items = [];
            this.addTable();
            this.submitted = true;

            prompt = this.selectedPrompt;
            while (prompt == this.selectedPrompt) {
                prompt = this.prompts[Math.floor(Math.random() * this.prompts.length)];
            }
            this.selectedPrompt = prompt;
        },
    }
})
