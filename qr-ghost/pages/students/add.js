import AddEntity from "../../app/addEntity"
import Page from "../../app/page"

const items = [
  { type: "text", id: "username", label: "Username" },
  { type: "text", id: "email", label: "Email" },
  { type: "text", id: "firstname", label: "Firstname" },
  { type: "text", id: "lastname", label: "Lastname" },
  { type: "password", id: "password", label: "Password" },
  {
    type: "select",
    id: "promotion",
    label: "Promotion",
    options: new Array(new Date().getFullYear() - 1975)
      .fill(0)
      .map((_, index) => ({
        label: `IGE ${index + 1}`,
        val: `IGE ${index + 1}`,
      })),
  },
  {
    type: "select",
    id: "level",
    label: "Level",
    options: [
      { val: "1", label: "First year" },
      { val: "2", label: "Second year" },
      { val: "3", label: "Third year" },
      { val: "4", label: "Fourth year" },
      { val: "5", label: "Fifth year" },
    ],
  },
  {
    type: "file",
    id: "profile",
    label: "Profile picture",
  },
]

const AddStudent = () => {
  return (
    <Page title="Student">
      <AddEntity
        items={items}
        endpoint={"http://localhost:3000/students/add"}
        redirection="/students"
      />
    </Page>
  )
}

AddStudent.getInitialProps = async (ctx) => {
  return {}
}


export default AddStudent
