var coursesApi = 'http://localhost:3000/couser'
var listCoursers = document.querySelector('#list-cousers');

function start(e) {
    getCoursers((data) => {
        render(data);
    })
    handleCreateForm();
}
start();
// ham getcoursers: lay du lieu tu api

function getCoursers(callback) {
    fetch (coursesApi)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback (data);
        })
}



// ham deleteCourse: xoa course va xu li render ra nhung course sau khi xoa
function deleteCourse(id){
    var options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(coursesApi +'/'+id, options)
        .then((response) => {
            return response.json();
        })
        .then(() => {
            var itemCourse = document.querySelector('.item-id-'+id);
            if(itemCourse) {
                itemCourse.remove();
            }
        }) //
}

// ham render(): hien thi data ra html
function render (courses){
    var htmls = courses.map((course) => {
        return `<li class="item-id-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="deleteCourse(${course.id})">Xoa</button>
            <button onclick = "handleUpdateCourse(${course.id})">Sua</button>
        </li>`
    })
    listCoursers.innerHTML = htmls.join('');
}

// ham create course: tao 1 course
function createCourse(obj) {
    var options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }
    fetch(coursesApi, options)
        .then((response) => {
            // return response.json;
            console.log(response.json);
        })
        // .then((data) => { //(callback)
        //     callback(data);
        // })
        .catch((error) => {
            console.log(error);
        });

    
}

// ham xu li hien thi course sau khi them
function handleCreateForm() {
    var btn = document.querySelector('.create')
    btn.addEventListener('click',(e) => {
        e.preventDefault();
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var obj = {
            name: name, 
            description: description,
        }
        console.log(obj);
        setTimeout(() => {
            createCourse(obj)
        }, 2000);

    })
}
// ham UpdateCourse: sua lai thong tin course
function updateCourse(data, callback) {
    var options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(coursesApi + '/' + data.id, options)
        .then(response => response.json())
        .then(() => {
            var name = document.querySelector('.item-id-'+data.id + 'h4')
            var description = document.querySelector('.item-id-'+data.id + 'p')
            name.innerHTML = data;
            description.innerHTML = data.description;
            // console.log(name, description);
        })
}

function handleUpdateCourse(id){
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
    var obj = {
        id: id,
        name: name,
        description: description,
    }
    setTimeout(() => {updateCourse(obj)}, 1000)
}