import { journalSlice, savingNewNote } from "../../../src/store/journal"
import { initialState } from "../../fixtures/journalFixtures"


describe('Pruebas en el journal slice', () => {

    test('Debe devolver el estado inicial y llamarse journal', () => { 
        const state = journalSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(journalSlice.name).toBe("journal");
     });

    test('Debe cambiar el saving a true', () => { 
        const state = journalSlice.reducer(initialState, savingNewNote());
        expect(state.isSaving).toBeTruthy();
     });



 })