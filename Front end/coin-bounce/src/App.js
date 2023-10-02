import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import styles from "./App.module.css";
function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <div className={styles.main}>
                  <Home />
                </div>
              }
            />
            <Route
              path="crypto"
              exact
              element={<div className={styles.main}>Crypto page</div>}
            />
            <Route
              path="blogs"
              exact
              element={<div className={styles.main}>Blogs Page</div>}
            />
            <Route
              path="submit"
              exact
              element={<div className={styles.main}>Submit</div>}
            />
            <Route
              path="sign-up"
              exact
              element={<div className={styles.main}>Sign up page </div>}
            />
            <Route
              path="log-in"
              exact
              element={<div className={styles.main}>login page</div>}
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;