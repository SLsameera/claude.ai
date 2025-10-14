import React, { useEffect, useState } from 'react'
import axios from 'axios'

type RequestItem = { id: string; title: string; description?: string; status: string }

export default function App() {
  const [list, setList] = useState<RequestItem[]>([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  async function fetchList(){
    const res = await axios.get('http://localhost:4000/api/v1/requests')
    setList(res.data)
  }

  useEffect(()=>{ fetchList() }, [])

  async function create(){
    const res = await axios.post('http://localhost:4000/api/v1/requests', { title, description: desc })
    setList(prev => [res.data, ...prev])
    setTitle('')
    setDesc('')
  }

  return (
    <div className="container">
      <h1>eCity Era — Requests</h1>
      <div className="form">
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <button onClick={create}>Create</button>
      </div>
      <ul>
        {list.map(r => (
          <li key={r.id}><strong>{r.title}</strong> — {r.status}<div>{r.description}</div></li>
        ))}
      </ul>
    </div>
  )
}
