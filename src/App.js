import './App.scss';

// import Pages
import ActivityDetailPage from './pages/ActivityDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import ActivityPage from './pages/ActivityPage';
import MainPage from './pages/MainPage';

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
            LoginPage={LoginPage}
            RegisterPage={RegisterPage}
            WritePage={WritePage}
            ActivityPage={ActivityPage}
            MainPage={MainPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
