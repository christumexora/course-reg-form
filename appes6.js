class Book {
  constructor(courseCode, courseTitle, facilitator) {
    this.courseCode = courseCode;
    this.courseTitle = courseTitle;
    this.facilitator = facilitator;
  }
}

class UI {
  addBookToList(book) {
    const bookList = document.getElementById("book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.courseCode}</td>
    <td>${book.courseTitle}</td>
    <td>${book.facilitator}</td>
    <td><a href="#" class="delete">X<a></td>
    `;
    bookList.appendChild(row);
  }

  showAlert(message, className) {
    //CREATE DIV
    const div = document.createElement("div");
    //ADD CLASSES
    div.className = `alert ${className}`;
    //ADD TEXT
    div.appendChild(document.createTextNode(message));
    //Get Parent
    const container = document.querySelector(".container");
    //Get Form
    const form = document.querySelector("#book-form");
    //Insert Alert
    container.insertBefore(div, form);
    //Set Timeout
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("course-code").value = " ";
    document.getElementById("course-title").value = " ";
    document.getElementById("facilitator").value = " ";
  }
}

//ADD EVENTLISTENER
document.getElementById("book-form").addEventListener("submit", function (e) {
  const courseCode = document.getElementById("course-code").value;
  const courseTitle = document.getElementById("course-title").value;
  const facilitator = document.getElementById("facilitator").value;

  //INSTANTIATE THE BOOK CONSTRUCTOR
  const book = new Book(courseCode, courseTitle, facilitator);

  //INSTANTIATE THE UI CONSTRUCTOR
  const ui = new UI(book);

  //VALIDATE
  if (courseCode === " " || courseTitle === " " || facilitator === " ") {
    //ERROR
    ui.showAlert("Please fill in all the fields", "error");
  } else {
    //ADD BOOKLIST
    ui.addBookToList(book);

    //SUCCESS
    ui.showAlert("Course Added", "success");

    //CLEAR FIELD
    ui.clearFields();
  }

  e.preventDefault();
});

//EVENT LISTENER FOR DELETE
document.getElementById("book-list").addEventListener("click", function (e) {
  //Instantiate UI
  const ui = new UI();
  //Delete Book
  ui.deleteBook(e.target);
  //Show Alert
  ui.showAlert("Course removed", "success");
  e.preventDefault();
});
