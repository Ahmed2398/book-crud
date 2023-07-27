// select elements To Add New Bookmarks (Name and Url)
var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkURLInput = document.getElementById('bookmarkURL');
var submitBtn = document.getElementById("submitBtn");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");

var updateBtn = document.getElementById("updateBtn");
var bookMarks = [];

if(localStorage.getItem('books') != null){
    bookMarks = JSON.parse( localStorage.getItem('books') );
    displayNewBooks(bookMarks);

}


function addNewBook() {
    var bookName = bookmarkNameInput.value;
    var bookURL = bookmarkURLInput.value;

    // Regular expression for URL validation
    var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (bookName === '' || !urlRegex.test(bookURL)) {
        // Show error message if the URL is not valid
        document.querySelector('.box-info').classList.remove('d-none');
    } else {
        var book = {
            name: bookName,
            url: bookURL
        };
        bookMarks.push(book);
        localStorage.setItem("books", JSON.stringify(bookMarks));
        displayNewBooks(bookMarks);
        clearForm();
    }
}

// function setFormUpdate(i) {
//     bookmarkNameInput.value = bookMarks[i].name;
//     bookmarkURLInput.value = bookMarks[i].url;
//     submitBtn.classList.replace('d-block', 'd-none');
//     updateBtn.classList.replace('d-none', 'd-block');
//
//     return bookMarks;
//
// }



function setFormUpdate(i) {
    bookmarkNameInput.value = bookMarks[i].name;
    bookmarkURLInput.value = bookMarks[i].url;
    submitBtn.classList.replace('d-block', 'd-none');
    updateBtn.classList.replace('d-none', 'd-block');
    updateBtn.setAttribute('data-index', i);
}

function updateBook(i) {
    bookMarks[i].name = bookmarkNameInput.value;
    bookMarks[i].url = bookmarkURLInput.value;
    localStorage.setItem("books", JSON.stringify(bookMarks));
    displayNewBooks(bookMarks);
    clearForm();
    submitBtn.classList.replace('d-none', 'd-block');
    updateBtn.classList.replace('d-block', 'd-none');
}
updateBtn.addEventListener('click', function () {
    var i = updateBtn.getAttribute('data-index');
    updateBook(i);
});
function clearForm(){
    bookmarkNameInput.value = "";
    bookmarkURLInput.value = "";
}


function displayNewBooks(arr) {
    var cartona = ``;

    for (var i = 0; i < arr.length; i++){
     cartona +=   `
     <tr>
                <td>${arr[i].name}</td>
                <td>${arr[i].url}</td>
                <td>
                  <button onclick="window.open('${arr[i].url}', '_blank')" class="btn btn-visit" >
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button onclick="setFormUpdate(${i})" class="btn btn-edit" >
                    <i class="fa-solid fa-pen pe-2"></i>Edit
                  </button>
                </td>
                <td>
                  <button onclick="deleteBook(${i})" class="btn btn-delete pe-2" >
                    <i class="fas fa-trash-alt"></i>
                    Delete
                  </button>
                </td>
            </tr>
`
    }

    document.getElementById('tableBody').innerHTML = cartona;
}

function  deleteBook(bookIndex){
    bookMarks.splice(bookIndex, 1);
    localStorage.setItem("books", JSON.stringify(bookMarks));
    displayNewBooks(bookMarks);
}

//Close Modal Function

function closeModal() {
    boxModal.classList.add("d-none");
}


closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeModal();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
        closeModal();
    }
});
