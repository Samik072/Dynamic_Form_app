import React from "react";
import DynamicForm from "./components/DynamicForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <DynamicForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
