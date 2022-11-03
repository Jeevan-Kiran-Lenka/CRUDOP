import { cleanup, render, screen } from "@testing-library/react"
import Posts from "../Posts"

afterEach(() => {
  cleanup()
})

test("should render posts component", () => {
  const post = {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
  }
  render(<Posts post={post} />)
  const postsElement = screen.getByTestId("post-1")
  expect(postsElement).toBeInTheDocument()
})

// Check Endpoints
// Check getPost
// Check create post
