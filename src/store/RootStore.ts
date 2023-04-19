import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { ErrorsStore } from "./ErrorsStore";
import { createContext, useContext } from "react";

export class RootStore {

    errorsStore = new ErrorsStore();

    throwError(){
        try {
            throw new Error("Error Thrown from throwError");
        }
        catch(err){
            this.errorsStore.addError(err);
            throw err;
        }
    }

    async throwAsyncError(){
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            throw new Error("Error Thrown from throwError");
        }
        catch(err){
            this.errorsStore.addError(err);
            throw err;
        }
    }

    async throwAsyncError2(){
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            runInAction(() => {
                throw new Error("Error Thrown from throwError");
            });
        }
        catch(err){
            this.errorsStore.addError(err);
            throw err;
        }
    }


    constructor(){
        makeAutoObservable(this);
    }

}


export const RootStoreContext = createContext<RootStore>(undefined as any);
export const useRootStore = () => {
    return useContext(RootStoreContext);
}