import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CreatePost } from './pages/CreatePost';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="edit/:id" element={<CreatePost />} />
      </Route>
    </Routes>
  );
}

export default App;
