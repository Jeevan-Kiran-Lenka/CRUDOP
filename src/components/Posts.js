import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setEdit, updatePost } from "../redux/features/PostSlice"
import { deletePost, getPost } from "./../redux/features/PostSlice"
import Spinner from "./Spinner"
const Posts = () => {
  const [id, setId] = useState("")
  const [textBody, setTextBody] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])
  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.app,
  }))

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts")
      const postsData = await response.json()
      setPosts(postsData)
    }
    fetchPosts()
  }, [posts])

  const allPosts = posts.map((post) => {
    return (
      <div className="card mt-4" key={post.id}>
        <div className="card-body">
          <span>
            <h5 className="card-title">
              {post.id}.{post.title} <br />{" "}
            </h5>
          </span>
          <span>
            <p className="card-text">{post.body}</p>
            <br /> <br />
          </span>
        </div>
      </div>
    )
  })

  useEffect(() => {
    if (body) {
      setTextBody(body)
    }
  }, [body])
  //function
  const handleFetchData = (e) => {
    e.preventDefault()
    if (!id) {
      window.alert("Please Provide Post ID")
    } else {
      dispatch(getPost({ id }))
      // console.log(getPost(id))
      setId("")
    }
  }
  //delete handler
  const handleDelete = ({ id }) => {
    dispatch(deletePost({ id: post[0].id }))
    window.location.reload()
    window.alert("Post Deleted !")
  }

  return (
    <>
      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <h2 className="row mt-4 d-flex align-items-center justify-content-center">
          Dashboard
        </h2>
        <div className="col-md-8">
          <form action="">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Search By ID:
              </label>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <button
              onClick={handleFetchData}
              type="submit"
              className="btn btn-primary"
            >
              Fetch Post
            </button>
            <button
              onClick={() => navigate("/createpost")}
              type="button"
              className="btn btn-warning ms-4"
            >
              create post
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {post.length > 0 && (
              <>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <textarea
                          className="form-control"
                          value={textBody}
                          onChange={(e) => setTextBody(e.target.value)}
                          id="floatingTextarea"
                        />
                        <div className="d-flex align-items-end justify-content-end">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              dispatch(
                                updatePost({
                                  id: post[0].id,
                                  title: post[0].title,
                                  body: textBody,
                                })
                              )
                              dispatch(setEdit({ edit: false, body: "" }))
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger ms-4"
                            onClick={() =>
                              dispatch(setEdit({ edit: false, body: "" }))
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="card-text">{post[0].body}</p>
                      </>
                    )}
                    {!edit && (
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-4"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <br />
      <div>
        <h2 className="row mt-4 d-flex align-items-center justify-content-center">
          All Posts
        </h2>
        {/* {console.log(getPostAll)} */}
        {/* {console.log(getPostAll)} */}
        {allPosts}
      </div>
    </>
  )
}

export default Posts
