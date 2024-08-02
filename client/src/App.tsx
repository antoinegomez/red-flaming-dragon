import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { List } from "./List"
import { Details } from "~/Details"
import { Create } from "~/Create"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <header className="w-full">
          <nav>
            <ul className="flex flex-row gap-4 border-b p-4 bg-teal-400">
              <li>
                <Link className="font-bold hover:text-slate-100" to="/">
                  Tracking list
                </Link>
              </li>
              <li className="font-bold hover:text-slate-100">
                <Link to="/create">New entry</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="w-full flex flex-col flex-1 items-center p-4">
          <Routes>
            <Route path="/create" element={<Create />} />
            <Route path="/show/:name/:gender" element={<Details />} />
            <Route path="*" element={<List />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
