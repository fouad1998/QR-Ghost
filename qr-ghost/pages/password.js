import { useContext } from "react"
import AddEntity from "../app/addEntity"
import Page from "../app/page"

const items = [
  { type: "password", id: "oldp", label: "Old password" },
  { type: "password", id: "newp", label: "New password" },
]

const Passowrd = () => {
  return (
    <Page title="Password">
      <AddEntity
        items={items}
        onDone={() => {}}
        endpoint={"http://localhost:3000/me/password"}
        buttonText="Save"
      />
    </Page>
  )
}

Passowrd.getInitialProps = async (ctx) => {
  return {}
}

export default Passowrd
