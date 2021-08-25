
const div_pages = document.getElementById("pages")
const page_link_label = "Go to page"
insert_cards()

function insert_cards() {
    for (const page of pages) {
        div_pages.appendChild(generate_card(page))
    }
}


function generate_card(page) {

    // create tags
    const card = document.createElement("div")
    const img = document.createElement("img")
    const body = document.createElement("div")
    const title = document.createElement("h5")
    const description = document.createElement("p")
    const page_link = document.createElement("a")

    // add attributes
    card.setAttribute("class", "card")
    card.setAttribute("style", "width: 18rem;")
    img.setAttribute("src", page.img_src)
    img.setAttribute("class", "card-img-top")
    img.setAttribute("alt", page.alt_img)
    body.setAttribute("class", "card-body")
    title.setAttribute("class", "card-title")
    description.setAttribute("class", "card-text")
    page_link.setAttribute("href", page.link_to_page)
    page_link.setAttribute("class", "btn btn-primary")

    // insert inner html
    title.innerHTML = page.title
    description.innerHTML = page.description
    page_link.innerHTML = page_link_label

    // append children
    body.appendChild(title)
    body.appendChild(description)
    body.appendChild(page_link)
    card.appendChild(img)
    card.appendChild(body)

    return card
}


