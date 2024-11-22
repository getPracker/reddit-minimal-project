import Subreddits from './features/Subreddits/Subreddits';
import './App.css';
import Home from './features/Home/Home';
import Header from './features/Header/Header';
function App() {
  return (
    <>
      <Header/>
      <main>
        <Home/>
      </main>
      <aside>
        <Subreddits/>
      </aside>
    </>
  );
}

export default App;
