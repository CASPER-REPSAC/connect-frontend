import './App.scss';

// import Pages
import ActivityDetailPage from './pages/ActivityDetailPage';
import ActivityChapterPage from './pages/ActivityChapterPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import ActivityPage from './pages/ActivityPage';
import MainPage from './pages/MainPage';
import TagPage from './pages/TagPage';
import UserPage from './pages/UserPage';

// import Basic Components
import MainContainer from './containers/MainContainer';
import Nav from './components/navigation/Nav';
import Sidebar from './components/navigation/Sidebar';

function App() {
  return (
    <div className="app-container">
      <div className="app-box">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="nav-main-container">
          <Nav />
          <MainContainer
            ActivityDetailPage={ActivityDetailPage}
            ActivityChapterPage={ActivityChapterPage}
            LoginPage={LoginPage}
            RegisterPage={RegisterPage}
            WritePage={WritePage}
            ActivityPage={ActivityPage}
            MainPage={MainPage}
            TagPage={TagPage}
            UserPage={UserPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
