
import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';


export class ErrorsStore {

    private unhandledErrors: unknown[] = [];

    isUnhandled(err: unknown){
        const unreportedIndex = this.unhandledErrors.indexOf(err);
        return unreportedIndex >= 0;
    }

    markHandled(err: unknown){
        const unreportedIndex = this.unhandledErrors.indexOf(err);
        if (unreportedIndex >= 0){
            this.unhandledErrors.splice(unreportedIndex, 1);
        }
    }

    report(err: unknown, errorDescription?: string){
        this.markHandled(err);

        toast.error(errorDescription ?? `Unexpected error occurred: ${err instanceof Error ? err.message : err}`);
        console.error(err);
    }

    clear(){
        this.unhandledErrors = [];
    }

    /**
     * Adds an error to the list of the unhandled one. If `autoReportIn` elapsed the
     * automatic handling will report it to the user
     * @param err The error to report.
     * @param autoReportIn How long to wait before reporting the error to the user if it's not marked as handled. Expressed in milliseconds.
     */
    addError(err: unknown, autoReportIn = 100){
        this.unhandledErrors.push(err);
        setTimeout(() => {
            if (this.isUnhandled(err))
                this.report(err);
        }, autoReportIn);
    }

    constructor(){
        makeAutoObservable(this);
    }
}