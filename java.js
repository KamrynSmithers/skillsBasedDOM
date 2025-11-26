let postButton = document.getElementById("newButton")
let deleteButton = document.getElementById("deleteButton")
let editButton = document.getElementById("editButton")
let postTitle = document.getElementById("postTitle")
let postList = document.getElementById ("postList")
let listedItems = document.getElementById ("listedItems")
const productList = document.getElementById('product-list')
const addProductButton = document.getElementById('add-product')
//let posts = []
let posts = JSON.parse(localStorage.getItem('posts')) || []
let postIdCounter = posts.length ? posts[posts.length - 1].id + 1 : 0 //REFRENCE

loadPost()



//ADD
addProductButton.addEventListener('click', () => {
const newProduct = document.createElement('li')
const newId = postIdCounter++
newProduct.dataset.id = newId

let textInput = document.getElementById("postTitle").value
let fileInput = document.getElementById("postContent").files[0]

let fileName = fileInput ? fileInput.name : "No File"

newProduct.innerHTML = textInput + " - " + fileName + ' <button class="deleteButton">Delete</button>' + ' <button class="editButton">Edit</button>'
listedItems.appendChild(newProduct)

//Object
const postInfo = {
        id: newId,
        title: textInput,
        fileName: fileName,
        time: Date.now()
    }
    
    posts.push(postInfo)
    savePosts()
})

productList.addEventListener('click', (event) => {
if (event.target.classList.contains('add-to-cart')) {
const postId = event.target.closest('li').dataset.id
console.log(`Added post ${postId} to forum.`)

}
})

//REMOVE 
listedItems.addEventListener('click', (event) => {
if (event.target.classList.contains('deleteButton')) {
const item = event.target.closest('li')
item.remove()
}})

//EDIT
listedItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('editButton')) {
        let li = event.target.closest('li')
        let id = li.dataset.id
        let post = posts.find(p => p.id == id)
        const editPost = prompt("Edit post:", post.title)

        if (editPost !== null && editPost.trim() !== "") {
            post.title = editPost
            li.childNodes[0].textContent = editPost + " - " + post.fileName + " "
            savePosts()
    }}
})


//SUBMIT
form.addEventListener ("submit", (event) => {
   event.preventDefault ()
})

// SAVE - Having trouble with the render part
function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts))
}
savePosts()

function loadPost () {
    listedItems.innerHTML=""
    posts.forEach (post => {
        let li = document.createElement("li")
        li.dataset.id = post.id
        li.innerHTML = `${post.title} - ${post.fileName} - RELOADED POST`
        listedItems.appendChild(li)
    })
} 
