import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { useRootStore } from './store/RootStore';

function App() {
  const rootStore = useRootStore();

  const errorHandler = (fn: () => any) => {
    return () => {
      try {
        fn();
      } catch(err){
        rootStore.errorsStore.report(err, "Successfully catched error");
      }
    }
  }

  const asyncErrorHandler = (fn: () => Promise<any>) => {
    
    return async () => {
      try {
        await fn();
      } catch(err) {
        rootStore.errorsStore.report(err, "Successfully catched error");
      }
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => rootStore.throwError()}>
          showError()
        </button>
      </div>
      <div>
        <button onClick={errorHandler(() => rootStore.throwError())}>
          showErrorWithErrorHandler()
        </button>
      </div>
      <div>
        <button onClick={() => rootStore.throwAsyncError()}>
          throwAsyncError()
        </button>
      </div>
      <div>
        <button onClick={asyncErrorHandler(() => rootStore.throwAsyncError())}>
          throwAsyncErrorWithErrorHandler()
        </button>
      </div>
      <div>
        <button onClick={() => rootStore.throwAsyncError2()}>
          throwAsyncError2()
        </button>
      </div>
      <div>
        <button onClick={asyncErrorHandler(() => rootStore.throwAsyncError2())}>
          throwAsyncError2WithErrorHandler()
        </button>
      </div>
    </div>
  )
}

export default observer(App);
