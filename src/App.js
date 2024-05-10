// App.js
import { useState, useEffect } from "react"
import Loading from "./Loading"
import Profile from "./Profile"

function App() {
  const [items, setItems] = useState([])
  const [users] = useState("feranmi-idowu")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [filterCriteria, setFilterCriteria] = useState("")
  const perPage = 4 // Number of items per page

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch(`https://api.github.com/users/${users}/repos?page=${currentPage}&per_page=${perPage}&sort=updated`)
      const data = await res.json()
      setItems(data)
    }

    fetchRepos()
  }, [currentPage, users, perPage])

  const filteredItems = items.filter(item => {
    return item.name.toLowerCase().includes(searchInput.toLowerCase()) && 
           (!filterCriteria || item.language === filterCriteria)
  })

  return (
    <>
      {!items ? <Loading /> : (
        <section className="pt-10 pb-20">
          <h1 className="text-2xl font-bold text-green-400">
            Welcome to {users}'s GitHub repository
          </h1>
          <div className="mt-5 flex justify-center">
            <input
              type="text"
              placeholder="Search repository..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border border-gray-300 px-3 py-1 rounded-l focus:outline-none"
            />
            <select
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
              className="border border-gray-300 px-3 py-1 rounded-r focus:outline-none"
            >
              <option value="">Filter by Language</option>
              <option value="C">C</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Shell">Shell</option>

            </select>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-col-3 mt-5">
            {filteredItems.map((item) => (
              <Profile key={item.id} {...item} />
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={filteredItems.length < perPage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            >
              Next
            </button>
          </div>
        </section>
      )}
    </>
  )
}

export default App
