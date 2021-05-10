import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Welcome to Blu Note </h1>
      </header>
      <div id="mainContainer">
        <side>
          <div className="buttonPanel">
            <button>Add Note </button>
            <button>Delete Note</button>
          </div>
          <div id="noteList">
          </div>
        </side>
        <main>
          <h2> Note title / summary </h2>
          <p> Main Note content </p>
          <div className="buttonPanel">
            <button> Save Note </button>
            <button> Delete Note </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
