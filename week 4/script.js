// Get elements from HTML

const studentForm =
    document.getElementById("studentForm");

const studentName =
    document.getElementById("studentName");

const studentEmail =
    document.getElementById("studentEmail");

const studentCourse =
    document.getElementById("studentCourse");

const studentPhone =
    document.getElementById("studentPhone");

const studentTableBody =
    document.getElementById("studentTableBody");

const searchInput =
    document.getElementById("searchInput");

const studentCount =
    document.getElementById("studentCount");

const emptyMessage =
    document.getElementById("emptyMessage");

const formTitle =
    document.getElementById("formTitle");

const submitButton =
    document.getElementById("submitButton");

const cancelButton =
    document.getElementById("cancelButton");


// Get students from localStorage

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// Variable for editing

let editIndex = -1;


// Display students when page loads

displayStudents(students);


// Add or Update Student

studentForm.addEventListener("submit", function(event) {

    // Stop page refresh

    event.preventDefault();


    // Get values

    const name =
        studentName.value.trim();

    const email =
        studentEmail.value.trim();

    const course =
        studentCourse.value;

    const phone =
        studentPhone.value.trim();


    // Create student object

    const student = {

        name: name,

        email: email,

        course: course,

        phone: phone

    };


    // Check if editing

    if (editIndex === -1) {

        // Add new student

        students.push(student);

    } else {

        // Update existing student

        students[editIndex] = student;

        editIndex = -1;

        formTitle.textContent =
            "Add New Student";

        submitButton.textContent =
            "Add Student";

        cancelButton.style.display =
            "none";
    }


    // Save to localStorage

    saveStudents();


    // Display students

    displayStudents(students);


    // Clear form

    studentForm.reset();

});


// Display Students

function displayStudents(studentList) {

    // Clear table

    studentTableBody.innerHTML = "";


    // Show empty message

    if (studentList.length === 0) {

        emptyMessage.style.display =
            "block";

    } else {

        emptyMessage.style.display =
            "none";
    }


    // Create table rows

    studentList.forEach(function(student, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>${student.course}</td>

            <td>${student.phone}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">
                    Delete
                </button>

            </td>

        `;


        studentTableBody.appendChild(row);

    });


    // Update student count

    studentCount.textContent =
        `Students: ${studentList.length}`;
}


// Save students to localStorage

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// Delete Student

function deleteStudent(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (confirmDelete) {

        students.splice(index, 1);

        saveStudents();

        displayStudents(students);

    }
}


// Edit Student

function editStudent(index) {

    const student =
        students[index];


    // Put data into form

    studentName.value =
        student.name;

    studentEmail.value =
        student.email;

    studentCourse.value =
        student.course;

    studentPhone.value =
        student.phone;


    // Store editing index

    editIndex = index;


    // Change form title

    formTitle.textContent =
        "Edit Student";


    // Change button

    submitButton.textContent =
        "Update Student";


    // Show cancel button

    cancelButton.style.display =
        "inline-block";


    // Scroll to form

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// Cancel Edit

function cancelEdit() {

    editIndex = -1;


    studentForm.reset();


    formTitle.textContent =
        "Add New Student";


    submitButton.textContent =
        "Add Student";


    cancelButton.style.display =
        "none";

}


// Search Students

searchInput.addEventListener(
    "input",
    function() {

        const searchText =
            searchInput.value.toLowerCase();


        const filteredStudents =
            students.filter(function(student) {

                return (

                    student.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    student.email
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    student.course
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    student.phone
                        .includes(searchText)

                );

            });


        displayStudents(filteredStudents);

    }
);