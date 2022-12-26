// BackEnd -> API -> Fetch -> JSON
// JSON.parse -> javascript type -> render ra giao dien HTML
//

// Cách sử dụng Fetch

// var postApi = 'https://jsonplaceholder.typicode.com/posts';

// fetch(postApi) // return vê 1 promise
//     .then (function (response) {
//         return response.json(); // trả lại 1 promise
//             // JSON.parse: JSON -> javascript type
//     })
//     .then (function (pots) {
//         // console.log(pots)
//         var html = pots.map(pot => 
//             {
//                 return `<li>
//                     <h3>${pot.title}</h3>
//                     <p>${pot.body}</p>
//                 </li>`
//             })
//         var list = document.getElementById('comment-block');

//         // console.log(html);
//         // pots.forEach(pot => 
//         //     {
//         //         html += `<li>${pot.title}</li>`
            
//         // });
//         list.innerHTML = html;
//     });


var coursesApi = 'http://localhost:3000/couser'
var listCoursers = document.querySelector('#list-cousers');

function start(){
    // getCourser((courses) => {   // getCourser(renderCourses)
    //     renderCourses(courses);
        
    // });
    getCourser(renderCourses);
    handleCreateForm();
}
start();

function getCourser (callback){//callback la 1 function
    fetch(coursesApi)
        .then(response => {return response.json()}) // chuyen tu json -> type

        // .then ();//callback la 1 function
        .then((data) => {//then duoc truyen 1 tham so la callback function
                callback(data);
                // console.log(data);
        })
}
//-----------------------------------------------------
function createCourse(data, callback){
    var obj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(coursesApi, obj)
        .then((response) => {
            return response.json();
        })
        .then(() => {
            callback();
        })
}

//Ham delete
function handleDeleteCourse(courseID){
    var obj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(coursesApi + '/' + courseID, obj)
        .then((response) => {
            return response.json();
        })
        .then(() => {
            var courseItem = document.querySelector('.item-list-' + courseID);
            if(courseItem){
                courseItem.remove();
            }
        })
}
//-------------------------------------------------------------
function renderCourses(courses){
    var html = courses.map((course) => {
        return `<li class = "item-id-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick = "handleDeleteCourse(${course.id})">Xoa</button>
        </li>`
    });
    listCoursers.innerHTML = html.join('');
}

//Ham su ly form
function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = () => {
        var name = document.querySelector('input[name="name"]').value;
        // console.log(name);
        var description = document.querySelector('input[name="description"]').value;
        // console.log(description);
        var FormData = {
            name: name,
            description: description, 
        }
        createCourse(FormData, () => {
            getCourser(renderCourses);
        });
        // day data vao cuoi mang de render ra man hinh
    }
}

