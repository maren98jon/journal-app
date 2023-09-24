import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers")


describe('Pruebas en auth thunks', () => { 
    
    const dispatch = jest.fn();

    beforeEach( ()=> jest.clearAllMocks() );

    test('Debe invocar el checkingCredentials', async() => { 
        await checkingAuthentication()( dispatch );
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() )
     });

     test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => { 
        
        const loginData = {ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

        // Thunk
        await startGoogleSignIn()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

      });

     test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => { 
        
        const loginData = {ok: false, errorMessage: 'Un error en google' };
        await signInWithGoogle.mockResolvedValue( loginData );

        // Thunk
        await startGoogleSignIn()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

      });

     test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => { 
        
        const loginData = {ok: true, ...demoUser };
        const formData = {email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        // Thunk
        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

      });

     test('startLoginWithEmailPassword debe de llamar checkingCredentials y logout - Error', async() => { 
        
        const loginData = {ok: false, errorMessage: 'Un error en login con pass' };
        const formData = {email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        // Thunk
        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );

      });

     test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => { 
        
        const loginData = {ok: true, ...demoUser };
        const formData = {email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        // Thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( 
                {
                    uid: loginData.uid, 
                    displayName: loginData.displayName, 
                    email: loginData.email, 
                    photoURL: loginData.photoURL
                } 
            ) 
        );

      });

     test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y logout - Error', async() => { 
        
        const loginData = {ok: false, errorMessage: 'Error al crear el usuario' };
        const formData = {email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        // Thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( {errorMessage: loginData.errorMessage} ) );

      });

     test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {

        // Thunk
        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

      });

 });