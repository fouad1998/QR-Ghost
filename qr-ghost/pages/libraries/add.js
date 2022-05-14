import AddEntity from "../../app/addEntity"
import Page from "../../app/page"

const items = [
  { type: "text", id: "username", label: "Username" },
  { type: "text", id: "email", label: "Email" },
  { type: "text", id: "firstname", label: "Firstname" },
  { type: "text", id: "lastname", label: "Lastname" },
  { type: "password", id: "password", label: "Password" },
  {
    type: "file",
    id: "profile",
    label: "Profile picture",
  },
]

const AddLibraries = () => {
  return (
    <Page title="Libraries">
      <AddEntity
        items={items}
        endpoint={"http://localhost:3000/libraries/add"}
        redirection="/libraries"
      />
    </Page>
  )
}

AddLibraries.getInitialProps = async (ctx) => {
  return {}
}

export default AddLibraries
