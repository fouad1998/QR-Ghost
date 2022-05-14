import AddEntity from "../../app/addEntity"
import Page from "../../app/page"

const items = [
  { type: "text", id: "title", label: "Title" },
  { type: "text", id: "description", label: "Description" },
  {
    type: "file",
    id: "cover",
    label: "Book cover",
  },
]

const AddBook = () => {
  return (
    <Page title="Books">
      <AddEntity
        items={items}
        endpoint={"http://localhost:3000/books/add"}
        redirection="/books"
      />
    </Page>
  )
}

AddBook.getInitialProps = async (ctx) => {
  return {}
}

export default AddBook
